#!/bin/bash
# Deploy IFDA frontend to Hostinger VPS from your Mac.
# Usage: ./deploy.sh              (uses Hostinger VPS below)
#        ./deploy.sh user@host    (override with another host)

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Default: your Hostinger VPS (override by passing user@host as first argument)
REMOTE="${1:-root@72.61.251.100}"
SERVICE_NAME="${IFDA_SERVICE_NAME:-ifda-server}"
STRICT_HEALTH_CHECK="${IFDA_STRICT_HEALTH_CHECK:-false}"

# Reuse a single SSH connection so password is asked once.
CONTROL_PATH="$(mktemp -u /tmp/ifda-deploy-ssh-XXXXXX.sock)"
SSH_OPTS="-o ControlMaster=auto -o ControlPersist=10m -o ControlPath=$CONTROL_PATH"

# Close master connection on exit.
cleanup() {
  ssh $SSH_OPTS -O exit "$REMOTE" >/dev/null 2>&1 || true
  rm -f "$CONTROL_PATH" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# Open master connection (prompts once for SSH password if needed).
echo "Opening SSH session to $REMOTE (you may be prompted once)..."
ssh $SSH_OPTS -fN "$REMOTE"

REMOTE_USER="${REMOTE%@*}"
if [ "$REMOTE_USER" = "$REMOTE" ]; then
  REMOTE_USER=""
fi

if [ "$REMOTE_USER" = "root" ]; then
  SUDO=""
else
  SUDO="sudo "
fi

echo "Building frontend..."
npm run build

echo "Uploading dist/ to $REMOTE:/var/www/ifda/"
rsync -avz --delete -e "ssh $SSH_OPTS" dist/ "$REMOTE:/var/www/ifda/"

echo "Uploading backend to $REMOTE:/var/www/ifda-server/ (excluding .env)"
rsync -avz --delete \
	--exclude node_modules \
	--exclude .env \
	--exclude uploads \
	-e "ssh $SSH_OPTS" \
	server/ "$REMOTE:/var/www/ifda-server/"

echo "Configuring backend and restarting service..."
ssh $SSH_OPTS "$REMOTE" "${SUDO}mkdir -p /var/www/ifda-server/uploads && ${SUDO}chown -R www-data:www-data /var/www/ifda-server/uploads && ${SUDO}chmod -R 755 /var/www/ifda-server/uploads && cd /var/www/ifda-server && npm install --omit=dev --no-audit --no-fund && if command -v systemctl >/dev/null 2>&1 && systemctl list-units --full -all | grep -Fq '${SERVICE_NAME}.service'; then ${SUDO}systemctl restart ${SERVICE_NAME} && ${SUDO}systemctl --no-pager --full status ${SERVICE_NAME} | head -n 25; elif command -v pm2 >/dev/null 2>&1 && pm2 list | grep -Fq '${SERVICE_NAME}'; then pm2 restart ${SERVICE_NAME}; else echo 'Warning: no process manager entry found for ${SERVICE_NAME}. Restart manually.'; fi"

echo "Running backend health check..."
ssh $SSH_OPTS "$REMOTE" SERVICE_NAME="$SERVICE_NAME" SUDO_PREFIX="$SUDO" STRICT_HEALTH_CHECK="$STRICT_HEALTH_CHECK" 'bash -s' <<'EOF'
set +e

run_with_optional_sudo() {
	if [ -n "$SUDO_PREFIX" ]; then
		sudo "$@"
	else
		"$@"
	fi
}

if ! command -v curl >/dev/null 2>&1; then
	echo 'curl not found; skipped health check'
	exit 0
fi

PORTS=""
if [ -f /var/www/ifda-server/.env ]; then
	ENV_PORT=$(grep -E '^PORT=' /var/www/ifda-server/.env | tail -n1 | cut -d= -f2 | tr -d ' "\r')
	if [ -n "$ENV_PORT" ]; then
		PORTS="$ENV_PORT"
	fi
fi

if [ -z "$PORTS" ]; then
	PORTS='5000 5001'
fi

SUCCESS=0
for attempt in $(seq 1 25); do
	for p in $PORTS; do
		if curl -fsS "http://127.0.0.1:$p/api/health" >/dev/null 2>&1; then
			echo "Backend health OK on port $p (attempt $attempt)"
			SUCCESS=1
			break
		fi
	done
	if [ $SUCCESS -eq 1 ]; then
		break
	fi
	sleep 1
done

if [ $SUCCESS -ne 1 ]; then
	echo 'Warning: backend health check failed after restart.'
	if command -v systemctl >/dev/null 2>&1 && systemctl list-units --full -all | grep -Fq "${SERVICE_NAME}.service"; then
		run_with_optional_sudo systemctl --no-pager --full status "$SERVICE_NAME" | head -n 40
		run_with_optional_sudo journalctl -u "$SERVICE_NAME" -n 60 --no-pager
	fi
	if [ "$STRICT_HEALTH_CHECK" = 'true' ]; then
		exit 1
	fi
fi

exit 0
EOF

echo "Done. Site should be live."
