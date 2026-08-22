import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isSubscribed, subscribeToNewsletter } from "../utils/newsletter";

const DISMISSED_KEY = "beamlynx_newsletter_dismissed";
const SHOW_DELAY_MS = 8000;

function isDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Storage may be unavailable -- worst case it can show again next visit.
  }
}

const NewsletterPopup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const footerSeenRef = useRef(false);

  // The footer has its own copy of this same form -- once it's on screen,
  // showing the popup too would just be the same ask twice. Hide it (and
  // don't bother showing it later) once that happens.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        footerSeenRef.current = true;
        setVisible(false);
        observer.disconnect();
      }
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSubscribed() || isDismissed()) return;
    const timer = setTimeout(() => {
      if (!footerSeenRef.current) setVisible(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    rememberDismissed();
    setVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    if (!email) return;

    subscribeToNewsletter(email);
    setSubscribed(true);
    setTimeout(() => setVisible(false), 2500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          role="complementary"
          aria-label="Newsletter signup"
          className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-xs rounded-lg border p-4 shadow-lg"
          style={{ backgroundColor: "var(--bp-panel)", borderColor: "var(--bp-border-soft)" }}
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2 right-2 rounded p-1 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bp-trace)]"
            style={{ color: "var(--bp-text-faint)" }}
          >
            ✕
          </button>

          <span className="bp-eyebrow">Follow updates</span>

          {subscribed ? (
            <p className="mt-2 text-sm" style={{ color: "var(--bp-text)" }}>
              Subscribed — you'll hear from us when there's something new.
            </p>
          ) : (
            <>
              <p className="mt-2 mb-3 text-sm pr-4" style={{ color: "var(--bp-text-dim)" }}>
                New releases and posts. No spam.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 rounded-md px-3 py-1.5 text-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-trace)]"
                  style={{
                    backgroundColor: "var(--bp-panel-raised)",
                    border: "1px solid var(--bp-border)",
                    color: "var(--bp-text)",
                  }}
                />
                <button type="submit" className="bp-btn bp-btn-primary shrink-0 !px-3 !py-1.5 text-sm">
                  Subscribe
                </button>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
