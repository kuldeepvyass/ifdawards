import { useEffect, useState } from "react";

const LINKEDIN_PUBLIC_PAGE = "https://www.linkedin.com/company/111540536/";
const LINKEDIN_ACTIVITY_PAGE = "https://www.linkedin.com/company/111540536/recent-activity/all/";
const ELFSIGHT_SCRIPT_ID = "elfsight-platform-script";
const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";
const DEFAULT_LINKEDIN_WIDGET_ID = "8f81bb9d-57e6-4d46-8a90-d9969f42ff5a";
const LINKEDIN_WIDGET_ID = import.meta.env.VITE_ELFSIGHT_LINKEDIN_APP_ID ?? DEFAULT_LINKEDIN_WIDGET_ID;

export function LinkedInFeed() {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!LINKEDIN_WIDGET_ID) {
      return;
    }

    const existingScript = document.getElementById(ELFSIGHT_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = ELFSIGHT_SCRIPT_ID;
    script.src = ELFSIGHT_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-18 px-4 bg-gradient-to-b from-white via-red-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto max-w-6xl rounded-3xl border border-red-100 bg-white p-6 md:p-10 shadow-[0_20px_60px_rgba(220,38,38,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="inline-flex items-center rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
                Official LinkedIn Posts
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Latest Posts From IFDA
              </h2>
            </div>
            <a
              href={LINKEDIN_ACTIVITY_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              View All Activity
            </a>
          </div>

          {LINKEDIN_WIDGET_ID ? (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-3 md:p-4 shadow-sm">
              {!scriptReady && (
                <p className="text-sm text-gray-500 px-2 py-2">Loading latest LinkedIn posts...</p>
              )}
              <div className={`elfsight-app-${LINKEDIN_WIDGET_ID}`} data-elfsight-app-lazy />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-red-200 bg-red-50/40 p-6 text-center">
              <p className="text-gray-900 font-semibold">LinkedIn auto-feed is not connected yet.</p>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to Elfsight, create a LinkedIn Feed widget, then add your widget ID to environment variable VITE_ELFSIGHT_LINKEDIN_APP_ID.
              </p>
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <a
                  href="https://elfsight.com/linkedin-feed-widget/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                >
                  Create LinkedIn Feed Widget
                </a>
                <a
                  href={LINKEDIN_PUBLIC_PAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-red-300 hover:text-red-700 transition-colors"
                >
                  Open LinkedIn Page
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
