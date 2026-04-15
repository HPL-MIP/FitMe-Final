import { useEffect, useRef } from "react";

// Shared AudioContext for iOS unlock
let audioCtx = null;
let unlocked = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function unlockAudioContext() {
  if (unlocked) return;
  const ctx = getAudioContext();

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  // Play a silent buffer to unlock Web Audio
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);

  unlocked = true;
}

// Attach unlock listeners once
if (typeof window !== "undefined") {
  const events = [
    "touchstart",
    "touchmove",
    "touchend",
    "pointerdown",
    "mousedown",
    "click",
  ];

  const handler = () => {
    unlockAudioContext();
    events.forEach((e) => document.removeEventListener(e, handler, true));
  };

  events.forEach((e) =>
    document.addEventListener(e, handler, {
      capture: true,
      passive: true,
    }),
  );
}

export const useSound = (src, volume = 0.5) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.preload = "auto";
    audio.load();

    const unlockAudioElement = () => {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});

      document.removeEventListener("touchstart", unlockAudioElement);
      document.removeEventListener("pointerdown", unlockAudioElement);
    };

    document.addEventListener("touchstart", unlockAudioElement, {
      once: true,
    });
    document.addEventListener("pointerdown", unlockAudioElement, {
      once: true,
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;

      document.removeEventListener("touchstart", unlockAudioElement);
      document.removeEventListener("pointerdown", unlockAudioElement);
    };
  }, [src, volume]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Ensure AudioContext is resumed on iOS
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    try {
      audio.currentTime = 0;
      const promise = audio.play();

      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } catch (e) {}
  };

  return play;
};
