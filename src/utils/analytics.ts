import posthog from 'posthog-js';

const apiKey = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

export function initAnalytics() {
  if (!apiKey) return;

  posthog.init(apiKey, {
    api_host: apiHost,
    // We call posthog.capture('$pageview', ...) ourselves on route change,
    // since PostHog's automatic pageview capture only fires once on initial load
    // and doesn't know about client-side (SPA) navigation.
    capture_pageview: false,
  });
}

export function trackPageview(path: string) {
  if (!apiKey) return;

  posthog.capture('$pageview', { $current_url: window.location.origin + path });
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!apiKey) return;

  posthog.capture(name, properties);
}
