import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;
const SLOT_ID = import.meta.env.VITE_ADSENSE_SLOT_ID as string | undefined;
const SCRIPT_ID = "adsbygoogle-script";

function loadScript(clientId: string) {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  document.head.appendChild(script);
}

// ponytail: one fixed responsive slot shape — add a `format` prop the day a
// second placement ships, not before. Consent is handled by Google's own
// Funding Choices CMP (configured in the AdSense dashboard, injected by
// adsbygoogle.js itself) — this component doesn't gate on it. Renders
// nothing if unconfigured (see docs/ads.html — VITE_ADSENSE_CLIENT_ID /
// VITE_ADSENSE_SLOT_ID).
export function AdSlot() {
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT_ID || !SLOT_ID) return;
    loadScript(CLIENT_ID);
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // script blocked or not ready yet — ad just won't render this pass
    }
  }, []);

  if (!CLIENT_ID || !SLOT_ID) return null;

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client={CLIENT_ID}
      data-ad-slot={SLOT_ID}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
