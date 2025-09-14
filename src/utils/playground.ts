/**
 * Opens a query in the BeamLynx playground
 * @param query The query string to open in the playground
 */
export const openInPlayground = (query: string): void => {
  const url = `https://playground.beamlynx.com?query=${encodeURIComponent(query)}`;
  window.open(url, '_blank');
};

/**
 * Default example query for the playground
 */
export const DEFAULT_EXAMPLE_QUERY = `customers | select: first_name, last_name, | public.orders .customer_id | public.order_items .order_id | public.products .product_id :parent | select: name, price | limit: 10`; 