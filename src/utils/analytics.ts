import type { PostHog } from 'posthog-js';

const apiKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

// Never send local dev traffic into the production PostHog project.
const isLocalhost =
  typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

const analyticsEnabled = !!apiKey && !isLocalhost;

// PostHog is a large library, so it is not part of the first download. It is
// fetched once the page has rendered. Calls made before then wait in this
// queue, in order, and run as soon as PostHog is ready.
type Call = (posthog: PostHog) => void;
let posthogInstance: PostHog | null = null;
let queue: Call[] | null = [];

function withPosthog(call: Call) {
  if (!analyticsEnabled) return;
  if (posthogInstance) call(posthogInstance);
  else queue?.push(call);
}

let loading: Promise<void> | null = null;

// Safe to call any number of times: PostHog is fetched once.
function loadPosthog(): Promise<void> {
  if (!loading) loading = fetchAndInit();
  return loading;
}

async function fetchAndInit() {
  try {
    const { default: posthog } = await import('posthog-js');
    posthog.init(apiKey, {
      api_host: apiHost,
      // We call posthog.capture('$pageview', ...) ourselves on route change,
      // since PostHog's automatic pageview capture only fires once on initial load
      // and doesn't know about client-side (SPA) navigation.
      capture_pageview: false,
      // capture_pageleave defaults to 'if_capture_pageview', so with automatic
      // pageview capture off above, $pageleave would silently never fire too.
      capture_pageleave: true,
    });
    posthogInstance = posthog;
    const pending = queue ?? [];
    queue = null;
    pending.forEach((call) => call(posthog));
  } catch {
    // Analytics must never break the site. If PostHog can't load (an ad
    // blocker, a network error), drop what was queued and stop queueing.
    queue = null;
  }
}

export function initAnalytics() {
  if (!analyticsEnabled) return;

  // After the first paint, without waiting for every font and lazy chunk.
  const start = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => void loadPosthog(), { timeout: 2000 });
    else setTimeout(() => void loadPosthog(), 1);
  };
  // A tab opened in the background never paints, so don't wait for a frame
  // there, or its pageview is lost if it is closed unseen.
  if (document.visibilityState === 'hidden') start();
  else requestAnimationFrame(() => setTimeout(start, 0));
}

// Events that wait in the queue keep the time they happened, not the time
// PostHog finished loading.
function capture(name: string, properties?: Record<string, unknown>) {
  const timestamp = new Date();
  withPosthog((posthog) => {
    posthog.capture(name, properties, { timestamp });
  });
}

export function trackPageview(path: string) {
  capture('$pageview', { $current_url: window.location.origin + path });
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  capture(name, properties);
}

// Registered as a super property so every subsequent event (pageviews,
// downloads, playground clicks) carries the visitor's resolved locale,
// without threading it through every trackEvent call individually.
export function setAnalyticsLocale(locale: string) {
  withPosthog((posthog) => posthog.register({ locale }));
}

// Attaches a real identity to this visitor's existing anonymous PostHog
// history (past pageviews, download clicks, etc. all merge into this person)
// -- call once we actually know who they are, e.g. a newsletter signup.
export function identifyPerson(email: string) {
  // Identity is worth more than the first paint: start loading now, so a
  // visitor who closes the tab right away still gets linked.
  if (analyticsEnabled) void loadPosthog();
  withPosthog((posthog) => posthog.identify(email, { email }));
}

// Joins this browser's visits to a desktop app install, after the person
// signed in to the app (pages/SignedIn.tsx). The app has already joined the
// install to the person, so PostHog merges the visits into them. Only for a
// browser that isn't identified yet: PostHog won't merge two known people,
// and a newsletter signup's visits stay with that email.
export function linkDesktopInstall(installId: string) {
  if (analyticsEnabled) void loadPosthog();
  withPosthog((posthog) => {
    if (posthog.get_property('$user_state') === 'identified') return;
    posthog.identify(installId);
  });
}
