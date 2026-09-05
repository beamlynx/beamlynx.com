import { trackEvent } from './analytics';

/**
 * The hosted playground is shut down. Clicking "Playground" anywhere on the
 * site now tracks the attempt and opens the download page (in a new tab, same
 * as the playground itself used to open) instead of the playground.
 * @param expression The expression the visitor wanted to try (kept as analytics context)
 * @param source Where the click happened, e.g. "navbar_desktop", "home_hero", "docs_example"
 */
export const openInPlayground = (expression: string, source: string): void => {
  trackEvent('playground_clicked', { source, expression });
  window.open('/download?playground=disabled', '_blank');
};

/**
 * Default example query for the playground
 */
export const DEFAULT_EXAMPLE_QUERY = `customers | select: first_name, last_name, | public.orders .customer_id | public.order_items .order_id | public.products .product_id :parent | select: name, price | limit: 10`;
