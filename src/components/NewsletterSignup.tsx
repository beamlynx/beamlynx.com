import { useRef, useState } from "react";
import { identifyPerson, trackEvent } from "../utils/analytics";

const SUBSTACK_ENDPOINT = "https://beamlynx.substack.com/api/v1/free?nojs=true";
const RELAY_IFRAME_NAME = "substack-relay";

const NewsletterSignup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    if (!email) return;

    identifyPerson(email);
    trackEvent("newsletter_subscribed");

    // Substack has no public API for adding a subscriber from our own form,
    // so this posts straight to the same endpoint its own embed widget uses.
    // A throwaway <form> targeting the hidden iframe below -- rather than
    // fetch() -- since a form POST isn't subject to CORS (only reading a
    // cross-origin fetch response is), and it doesn't depend on our visible
    // form still being mounted by the time the browser sends it.
    const relay = document.createElement("form");
    relay.action = SUBSTACK_ENDPOINT;
    relay.method = "POST";
    relay.target = RELAY_IFRAME_NAME;
    const field = document.createElement("input");
    field.type = "hidden";
    field.name = "email";
    field.value = email;
    relay.appendChild(field);
    document.body.appendChild(relay);
    relay.submit();
    relay.remove();

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
            New releases and posts, straight to your inbox. No spam, unsubscribe anytime.
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
      <iframe name={RELAY_IFRAME_NAME} title="" style={{ display: "none" }} />
    </div>
  );
};

export default NewsletterSignup;
