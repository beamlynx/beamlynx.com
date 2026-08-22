import { identifyPerson, trackEvent } from "./analytics";

const SUBSTACK_ENDPOINT = "https://beamlynx.substack.com/api/v1/free?nojs=true";
export const NEWSLETTER_RELAY_IFRAME_NAME = "substack-relay";

const SUBSCRIBED_KEY = "beamlynx_newsletter_subscribed";

export function isSubscribed(): boolean {
  try {
    return localStorage.getItem(SUBSCRIBED_KEY) === "1";
  } catch {
    return false;
  }
}

export function subscribeToNewsletter(email: string) {
  identifyPerson(email);
  trackEvent("newsletter_subscribed");

  // Substack has no public API for adding a subscriber from our own form, so
  // this posts straight to the same endpoint its own embed widget uses. A
  // throwaway <form> targeting the shared hidden iframe (rendered once, in
  // Footer) -- rather than fetch() -- since a form POST isn't subject to
  // CORS (only reading a cross-origin fetch response is), and it doesn't
  // depend on our visible form still being mounted by the time the browser
  // sends it.
  const relay = document.createElement("form");
  relay.action = SUBSTACK_ENDPOINT;
  relay.method = "POST";
  relay.target = NEWSLETTER_RELAY_IFRAME_NAME;
  const field = document.createElement("input");
  field.type = "hidden";
  field.name = "email";
  field.value = email;
  relay.appendChild(field);
  document.body.appendChild(relay);
  relay.submit();
  relay.remove();

  try {
    localStorage.setItem(SUBSCRIBED_KEY, "1");
  } catch {
    // Storage may be unavailable (private browsing, disabled cookies) -- the
    // subscription still went through, we just won't remember it next visit.
  }
}
