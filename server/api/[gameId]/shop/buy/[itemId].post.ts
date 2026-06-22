export default defineEventHandler(async (event) => {
  const gameId = getRouterParam(event, 'gameId');
  const itemId = getRouterParam(event, 'itemId');
  if (!gameId || !itemId) {
    throw createError({
      statusCode: 400,
      message: 'Game ID and item ID are required',
    });
  }
  return buyShopItem(gameId, itemId);
});
