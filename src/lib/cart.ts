export function countCartItems(items: { count: number }[]) {
  return items.reduce((total, item) => total + item.count, 0);
}
