import posthog from 'posthog-js';

const apiKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

// Never send local dev traffic into the production PostHog project.
const isLocalhost =
  typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

const analyticsEnabled = !!apiKey && !isLocalhost;

export function initAnalytics() {
  if (!analyticsEnabled) return;

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
}

export function trackPageview(path: string) {
  if (!analyticsEnabled) return;

  posthog.capture('$pageview', { $current_url: window.location.origin + path });
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled) return;

  posthog.capture(name, properties);
}

// Attaches a real identity to this visitor's existing anonymous PostHog
// history (past pageviews, download clicks, etc. all merge into this person)
// -- call once we actually know who they are, e.g. a newsletter signup.
export function identifyPerson(email: string) {
  if (!analyticsEnabled) return;

  posthog.identify(email, { email });
}
