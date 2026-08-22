import { useRef, useState } from "react";
import { NEWSLETTER_RELAY_IFRAME_NAME, isSubscribed, subscribeToNewsletter } from "../utils/newsletter";

const NewsletterSignup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [subscribed, setSubscribed] = useState(isSubscribed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    if (!email) return;

    subscribeToNewsletter(email);
    setSubscribed(true);
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="bp-eyebrow">Follow updates</span>

      {subscribed ? (
        <p className="mt-1 text-sm" style={{ color: "var(--bp-text)" }}>
          Subscribed — you'll hear from us when there's something new.
        </p>
      ) : (
        <>
          <p className="mt-1 mb-3 text-sm" style={{ color: "var(--bp-text-dim)" }}>
            New releases and posts. No spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col sm:flex-row gap-3">
            <input
              ref={emailRef}
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-md px-3.5 py-2 text-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-trace)]"
              style={{
                backgroundColor: "var(--bp-panel-raised)",
                border: "1px solid var(--bp-border)",
                color: "var(--bp-text)",
              }}
            />
            <button type="submit" className="bp-btn bp-btn-primary justify-center">
              Subscribe
            </button>
          </form>
        </>
      )}

      {/* Substack's response renders in here, invisibly -- we never read it. */}
      <iframe name={NEWSLETTER_RELAY_IFRAME_NAME} title="" style={{ display: "none" }} />
    </div>
  );
};

export default NewsletterSignup;
