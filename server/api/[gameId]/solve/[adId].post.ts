export default defineEventHandler(async (event) => {
  const gameId = getRouterParam(event, 'gameId');
  const adId = getRouterParam(event, 'adId');
  if (!gameId || !adId) {
    throw createError({
      statusCode: 400,
      message: 'Game ID and ad ID are required',
    });
  }
  return solveMessage(gameId, adId);
});
