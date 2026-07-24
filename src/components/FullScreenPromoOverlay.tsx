import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import apiClient from "../apiClient";

/**
 * Full-screen promo overlay — backend-controlled via the admin "Promotions"
 * module. Fetches every active campaign for this storefront (X-Store-Key,
 * already sent by apiClient on every request) on initial load, then shows
 * them one at a time in the order the API returned — each waits its own
 * `delay_ms` before appearing, optionally auto-closes after `duration_sec`,
 * and dismissing it (any path) immediately advances to the next queued one.
 * Dismissal is remembered per-campaign in localStorage (`dismissed_promo_{id}`)
 * so a new campaign (new id) always gets a fresh chance to show.
 */
type Promo = {
  id: number;
  title: string;
  subtitle: string | null;
  image: string | null;
  content_json: Record<string, unknown> | null;
  cta_label: string;
  cta_link: string;
  delay_ms: number;
  duration_sec: number | null;
};

const dismissedKey = (id: number) => `dismissed_promo_${id}`;

// content_json renders as a 2-col key:value grid when every value is a
// primitive (e.g. a pricing grid: {"Twin": 99, "Queen": 299}). Anything else
// (nested objects/arrays) is skipped rather than rendered oddly.
function isFlatGrid(json: Record<string, unknown> | null): json is Record<string, string | number> {
  if (!json) return false;
  return Object.values(json).every((v) => typeof v === "string" || typeof v === "number");
}

export default function FullScreenPromoOverlay() {
  const [queue, setQueue] = useState<Promo[]>([]);
  const [open, setOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const dismissingRef = useRef(false);
  const promo = queue[0] ?? null;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await apiClient.get("/promotions/active");
        const list: Promo[] = res.data?.data?.promotions ?? [];
        if (cancelled || !list.length) return;

        const fresh = list.filter((p) => {
          try {
            return localStorage.getItem(dismissedKey(p.id)) === null;
          } catch {
            return true; // localStorage can throw in private/locked-down contexts — fail open
          }
        });
        setQueue(fresh);
      } catch {
        // Promos failing to load should never break the storefront.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Whenever the front of the queue changes, wait that promo's own delay, then show it.
  useEffect(() => {
    if (!promo) {
      setOpen(false);
      return;
    }
    dismissingRef.current = false;
    const timer = setTimeout(() => setOpen(true), Math.max(0, promo.delay_ms));
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promo?.id]);

  function dismiss() {
    if (dismissingRef.current || !promo) return;
    dismissingRef.current = true;
    setOpen(false);
    try {
      localStorage.setItem(dismissedKey(promo.id), "1");
    } catch {
      // ignore — at worst it reappears next load in a restricted context
    }
    setQueue((q) => q.slice(1));
  }

  // Auto-close countdown, starts once the overlay is actually shown.
  useEffect(() => {
    if (!open || !promo?.duration_sec) {
      setSecondsLeft(null);
      return;
    }
    setSecondsLeft(promo.duration_sec);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s === null || s <= 1) {
          clearInterval(interval);
          dismiss();
          return null;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!promo) return null;

  const gridEntries = isFlatGrid(promo.content_json) ? Object.entries(promo.content_json) : [];
  const isExternalCta = /^https?:\/\//i.test(promo.cta_link);

  return (
    <Dialog open={open} onClose={dismiss} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 z-50 w-screen h-screen bg-black/75 backdrop-blur-md transition-opacity duration-200 ease-out data-closed:opacity-0 motion-reduce:transition-none"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 w-screen h-screen">
        <DialogPanel
          transition
          className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transform-none motion-reduce:transition-none sm:p-8"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {promo.image && (
            <img
              src={promo.image}
              alt=""
              className="-mx-6 -mt-6 mb-4 h-40 w-[calc(100%_+_3rem)] rounded-t-2xl object-cover sm:-mx-8 sm:-mt-8 sm:h-48 sm:w-[calc(100%_+_4rem)]"
            />
          )}

          <div className="text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {promo.title}
            </DialogTitle>
            {promo.subtitle && (
              // Pre-sanitized server-side (sanitize_ckeditor_html, whitelist-based)
              // before this ever reaches the client — safe to render as HTML.
              <div
                className="promo-subtitle mx-auto mt-2 max-w-sm text-sm text-gray-600 sm:text-base"
                dangerouslySetInnerHTML={{ __html: promo.subtitle }}
              />
            )}
          </div>

          {gridEntries.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {gridEntries.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-gray-200 p-4 text-center transition-colors hover:border-gray-400 hover:bg-gray-50"
                >
                  <div className="text-sm font-medium uppercase tracking-wide text-gray-600">{label}</div>
                  <div className="mt-1 text-3xl font-extrabold text-rose-600">
                    {typeof value === "number" ? (
                      <>
                        <span className="align-top text-lg">$</span>
                        {value}
                      </>
                    ) : (
                      value
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isExternalCta ? (
            <a
              href={promo.cta_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-6 block w-full rounded-md bg-gray-900 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {promo.cta_label}
            </a>
          ) : (
            <Link
              to={promo.cta_link}
              onClick={dismiss}
              className="mt-6 block w-full rounded-md bg-gray-900 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {promo.cta_label}
            </Link>
          )}

          <button type="button" onClick={dismiss} className="mt-3 block w-full rounded text-center text-sm text-gray-500 transition-colors hover:text-gray-700">
            {secondsLeft != null ? `No thanks — closing in ${secondsLeft}s` : "No thanks"}
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
