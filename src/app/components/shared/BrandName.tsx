type BrandTone = "default" | "onRed";

export function BrandName({
  tone = "default",
  className = "",
}: {
  tone?: BrandTone;
  className?: string;
}) {
  const toneClass =
    tone === "onRed"
      ? "text-red-200"
      : "text-red-600";

  return <span className={`${toneClass} font-semibold ${className}`.trim()}>iFDA</span>;
}

export function withBrandName(text: string, tone: BrandTone = "default") {
  const parts = text.split(/(iFDA|IFDA)/g);
  if (parts.length === 1) return text;

  return parts.map((part, idx) => {
    if (part === "iFDA" || part === "IFDA") {
      return <BrandName key={`brand-${idx}`} tone={tone} />;
    }
    return part;
  });
}

