import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PROMO_MODAL } from "../constants.ts";

/**
 * Entry promo pop-up — the "Mattress To Go Only" clearance campaign.
 * Shows ~1.2s after a visitor lands on the home page ("/"), once per browser
 * session (sessionStorage). Reuses Headless UI's Dialog, which provides the
 * backdrop click-to-close, Escape, focus trap, body-scroll-lock and dialog
 * ARIA semantics for free. Content is static (no fetch) → no layout shift.
 */
const SEEN_KEY = "m2g_promo_modal_seen";

export default function EntryPromoModal() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!PROMO_MODAL.enabled || pathname !== "/") return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) !== null;
    } catch {
      // sessionStorage can throw in private/locked-down contexts — fail open (show once).
    }
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Single dismissal path: closes the modal AND caps it for the session. Wired to
  // the backdrop/Escape (via onClose), the X, the "No thanks" link, and the CTA.
  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore — at worst the pop-up reappears next reload in a restricted context.
    }
  }

  return (
    <Dialog open={open} onClose={dismiss} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ease-out data-closed:opacity-0 motion-reduce:transition-none"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transform-none motion-reduce:transition-none sm:p-8"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {PROMO_MODAL.heading}
            </DialogTitle>
            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600 sm:text-base">
              {PROMO_MODAL.subheading}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {PROMO_MODAL.tiers.map((tier) => (
              <div
                key={tier.size}
                className="rounded-xl border border-gray-200 p-4 text-center transition-colors hover:border-copa-blue-300 hover:bg-copa-blue-50"
              >
                <div className="text-sm font-medium uppercase tracking-wide text-gray-600">
                  {tier.size}
                </div>
                <div className="mt-1 text-3xl font-extrabold text-rose-600">
                  <span className="align-top text-lg">$</span>
                  {tier.price}
                </div>
              </div>
            ))}
          </div>

          <Link
            to={PROMO_MODAL.ctaUrl}
            onClick={dismiss}
            className="mt-6 block w-full rounded-md bg-copa-blue-700 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-copa-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-600"
          >
            {PROMO_MODAL.ctaLabel}
          </Link>

          <button
            type="button"
            onClick={dismiss}
            className="mt-3 block w-full rounded text-center text-sm text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copa-blue-600"
          >
            No thanks
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
