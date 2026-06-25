export default defineEventHandler(async (event) => {
  const gameId = getRouterParam(event, 'gameId');
  if (!gameId) {
    throw createError({
      statusCode: 400,
      message: 'Game ID is required',
    });
  }
  const body = await readBody<AutoplayInputState>(event);
  return startAutoplay(gameId, body);
});
