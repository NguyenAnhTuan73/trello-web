export function capitalizeFirstLetter(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function fastSort<T, K extends keyof T>(
  list: T[],
  order: Array<T[K] & (string | number | symbol)>,
  key: K,
): Array<T | undefined> {
  const map = new Map<T[K] & (string | number | symbol), T>(
    list.map((item: T) => [
      item[key] as T[K] & (string | number | symbol),
      item,
    ]),
  );
  return order.map((id) => map.get(id));
}
