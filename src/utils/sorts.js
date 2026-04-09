// Sort functions
export function mapOrder(list, order, key) {
  if (!list || !order || !key) return [];
  const map = new Map(list?.map((item) => [item[key], item]));
  return order.map((_id) => map.get(_id));
}
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    Fe_PlaceholderCard: true,
  };
};
