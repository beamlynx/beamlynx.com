/**
 * Opens a query in the BeamLynx playground
 * @param expression The expression to open in the playground
 */
export const openInPlayground = (expression: string): void => {
  const data = { expression  };
  const url = `https://playground.beamlynx.com?data=${encodeURIComponent(JSON.stringify(data))}`;
  window.open(url, '_blank');
};

/**
 * Default example query for the playground
 */
export const DEFAULT_EXAMPLE_QUERY = `customers | select: first_name, last_name, | public.orders .customer_id | public.order_items .order_id | public.products .product_id :parent | select: name, price | limit: 10`; 