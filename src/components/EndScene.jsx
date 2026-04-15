import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function EndScene({
  srcPortrait,
  srcLandscape,
  clickUrl = "",
  muted = true,
  playsInline = true,
  autoPlay = true,
  loop = true,
}) {
  const targetAspectRatio = 16 / 9;
  const extremeRatioThreshold = 1.8;

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [containerSize, setContainerSize] = useState({
    widthPct: 100,
    heightPct: 100,
  });

  const isMraid = useMemo(() => {
    const mraid = typeof window !== "undefined" ? window.mraid : undefined;
    return !!(mraid && typeof mraid.open === "function");
  }, []);

  const handleClickAction = useCallback(() => {
    const mraid = window.mraid || {};
    if (mraid.open && typeof mraid.open === "function") {
      if (clickUrl) mraid.open(clickUrl);
      else mraid.open();
      return;
    }

    if (clickUrl) window.open(clickUrl, "_blank", "noopener,noreferrer");
    else window.open();
  }, [clickUrl]);

  const computeLayout = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;

    const src = isPortrait ? srcPortrait : srcLandscape;
    const normalizedRatio = width > height ? width / height : height / width;

    let widthPct = 100;
    let heightPct = 100;

    if (normalizedRatio > extremeRatioThreshold) {
      if (isPortrait) {
        const targetHeight = width * targetAspectRatio;
        heightPct = (targetHeight / height) * 100;
      } else {
        const targetWidth = height * targetAspectRatio;
        widthPct = (targetWidth / width) * 100;
      }
    }

    setContainerSize((prev) => {
      if (prev.widthPct === widthPct && prev.heightPct === heightPct)
        return prev;
      return { widthPct, heightPct };
    });

    const video = videoRef.current;
    if (!video) return;

    const current = video.currentSrc || video.src || "";
    const isAlready = current.includes(src);

    if (!isAlready) {
      video.src = src;
      video.load();
    }
  }, [srcPortrait, srcLandscape]);

  const rafIdRef = useRef(0);
  const scheduleOrientationUpdate = useCallback(() => {
    if (rafIdRef.current) return;

    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = 0;
      computeLayout();
    });
  }, [computeLayout]);

  const syncWindowActivityState = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const isActive = document.visibilityState === "visible";

    if (isActive) {
      scheduleOrientationUpdate();
      if (autoPlay) video.play().catch(() => {});
    } else {
      video.pause();
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    }
  }, [scheduleOrientationUpdate, autoPlay]);

  useEffect(() => {
    const attach = () => {
      window.addEventListener("resize", scheduleOrientationUpdate, {
        passive: true,
      });
      window.addEventListener("orientationchange", scheduleOrientationUpdate, {
        passive: true,
      });
      window.addEventListener("pointerdown", handleClickAction);
      document.addEventListener("visibilitychange", syncWindowActivityState);
      window.addEventListener("focus", syncWindowActivityState);
      window.addEventListener("blur", syncWindowActivityState);
      window.addEventListener("pagehide", syncWindowActivityState);
    };

    const detach = () => {
      window.removeEventListener("resize", scheduleOrientationUpdate);
      window.removeEventListener(
        "orientationchange",
        scheduleOrientationUpdate,
      );
      window.removeEventListener("pointerdown", handleClickAction);
      document.removeEventListener("visibilitychange", syncWindowActivityState);
      window.removeEventListener("focus", syncWindowActivityState);
      window.removeEventListener("blur", syncWindowActivityState);
      window.removeEventListener("pagehide", syncWindowActivityState);

      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };

    attach();
    syncWindowActivityState();

    return detach;
  }, [handleClickAction, scheduleOrientationUpdate, syncWindowActivityState]);

  useEffect(() => {
    computeLayout();
  }, [computeLayout]);

  const containerStyle = {
    width: `${containerSize.widthPct}%`,
    height: `${containerSize.heightPct}%`,
  };

  return (
    <div
      ref={containerRef}
      id="video-container"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
        ...containerStyle,
      }}
    >
      <video
        ref={videoRef}
        id="sip-video"
        muted={muted}
        playsInline={playsInline}
        autoPlay={autoPlay}
        loop={loop}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
