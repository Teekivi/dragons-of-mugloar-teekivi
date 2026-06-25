export default defineWebSocketHandler({
  open(peer) {
    const gameId = getGameIdFromAutoplayUrl(peer.request.url);
    if (!gameId) {
      peer.close(1008, 'Game ID is required');
      return;
    }
    registerAutoplayPeer(gameId, peer);
  },
  close(peer) {
    const gameId = getGameIdFromAutoplayUrl(peer.request.url);
    if (gameId) {
      unregisterAutoplayPeer(gameId);
      stopAutoplay(gameId).catch((err) => {
        console.error(
          `Error closing autoplay WebSocket for game ${gameId}:`,
          err,
        );
      });
    }
  },
});
