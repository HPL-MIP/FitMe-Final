export const PlayableBridge = {
  ready() {
    window.gameReady?.();
    window.mraid?.signalReady?.();
  },

  end() {
    window.gameEnd?.();
  },

  click() {
    window.install?.();
    window.mraid?.open?.();
  },
};
