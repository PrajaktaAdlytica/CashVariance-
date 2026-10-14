"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
let allowed = false;
let attribution: Record<string, string> = {};
export function track(
  name: string,
  properties: Record<string, string | number | boolean> = {},
) {
  if (!allowed || typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  for (const key of ["utm_source", "utm_campaign"]) {
    const value = params.get(key);
    if (value && /^[a-z][a-z0-9_-]{0,63}$/i.test(value)) attribution[key] = value;
  }
  const keys = [
    "page",
    "selected_offer_id",
    "concept_id",
    "step",
    "price_variant_id",
    "hypothesis",
    "purpose",
  ];
  const safe = Object.fromEntries(
    Object.entries(properties).filter(([k]) => keys.includes(k)),
  );
  window.dispatchEvent(
    new CustomEvent("cashvariance:analytics", {
      detail: { name, properties: { ...safe, ...attribution } },
    }),
  );
}
export function RouteEvents() {
  const pathname = usePathname();
  useEffect(() => {
    track("landing_view", { page: pathname });
    if (pathname === "/demo" || pathname === "/demo/")
      track("demo_open", { page: pathname });
    if (pathname === "/pilot" || pathname === "/pilot/")
      track("price_view", {
        price_variant_id: "hypothesis-v1",
        hypothesis: true,
      });
  }, [pathname]);
  return null;
}
export function UsagePreferences() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <button
        className="footer-pref"
        onClick={() => {
          setEnabled(allowed);
          dialog.current?.showModal();
        }}
      >
        Usage preferences
      </button>
      <dialog className="preferences-dialog" ref={dialog}>
        <h2>Your preview preferences.</h2>
        <p>
          Optional interaction events stay in this browser tab. There is no
          external analytics collector. Events never include email addresses,
          form text or financial records.
        </p>
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />{" "}
          Allow browser-only usage events for this session
        </label>
        <p className="small-note">
          Off by default. This preference resets when the page reloads.
        </p>
        <div>
          <button onClick={() => dialog.current?.close()}>Cancel</button>
          <button
            onClick={() => {
              allowed = enabled;
              if (!enabled) attribution = {};
              if (enabled)
                track("consent_submit", { purpose: "browser-only-usage" });
              dialog.current?.close();
            }}
          >
            Save preference
          </button>
        </div>
      </dialog>
    </>
  );
}
