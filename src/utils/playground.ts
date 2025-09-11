/**
 * Opens a query in the BeamLynx playground
 * @param query The query string to open in the playground
 */
export const openInPlayground = (query: string): void => {
  const url = `https://playground.beamlynx.com?query=${encodeURIComponent(query)}`;
  window.open(url, '_blank');
}; 