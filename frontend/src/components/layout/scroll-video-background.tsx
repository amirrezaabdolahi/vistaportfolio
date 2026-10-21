"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const VIDEO_SRC = "/hero_background_video_optimized.webm";
// Optional: first-frame JPG/WebP in /public so the background is never blank
// while metadata loads or if decoding fails.
const POSTER_SRC: string | undefined = undefined;

// Seeking to exactly `duration` can render a blank frame in some browsers.
const END_GUARD = 0.001;
// Ignore seeks smaller than ~1 frame at 48fps (no visible change).
const MIN_DELTA = 1 / 48;

const clamp01 = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

const getNativeProgress = () => {
  const limit = document.documentElement.scrollHeight - window.innerHeight;
  return limit > 0 ? clamp01(window.scrollY / limit) : 0;
};

export function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Lenis already smooths the scroll position (lerp), so the video simply
  // follows it 1:1. No extra smoothing, no rAF loop of our own.
  const lenis = useLenis();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const readProgress = () =>
      lenis ? clamp01(lenis.progress) : getNativeProgress();

    let progress = readProgress();
    let ready = false;
    let failed = false;
    let attached = false;

    const isDisabled = () => mobileQuery.matches || reducedMotionQuery.matches;

    // Event-driven scrubbing:
    //  - each Lenis scroll tick seeks immediately if the decoder is idle;
    //  - while a seek is in flight we only remember the latest progress;
    //  - `seeked` then jumps straight to the newest target (no stale queue).
    const sync = () => {
      if (!ready || failed || video.seeking) {
        return;
      }

      const duration = video.duration;

      if (!Number.isFinite(duration) || duration <= 0) {
        return;
      }

      const target = Math.min(
        Math.max(0, duration - END_GUARD),
        Math.max(0, progress * duration),
      );

      if (Math.abs(video.currentTime - target) < MIN_DELTA) {
        return;
      }

      try {
        video.currentTime = target;
      } catch {
        // Seek rejected while media is changing; the next event retries.
      }
    };

    const update = () => {
      progress = readProgress();
      sync();
    };

    const handleMetadata = () => {
      ready =
        video.readyState >= HTMLMediaElement.HAVE_METADATA &&
        Number.isFinite(video.duration) &&
        video.duration > 0;

      if (ready) {
        update();
      }
    };

    const handleError = () => {
      // Don't retry a failed asset; poster / static background stays visible.
      failed = true;
      ready = false;
      video.dataset.error = "true";
    };

    const attach = () => {
      if (isDisabled() || attached || failed) {
        return;
      }

      attached = true;
      video.preload = "auto";
      video.src = VIDEO_SRC;
      video.load();

      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        handleMetadata();
      }
    };

    const detach = () => {
      if (!attached) {
        return;
      }

      attached = false;
      ready = false;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const handleEnvironmentChange = () => {
      if (isDisabled()) {
        detach();
      } else {
        attach();
      }
    };

    // Page height can change (fonts, images, locale switch, RTL). Re-read
    // progress so the video never stays stuck at a stale timestamp.
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    resizeObserver?.observe(document.documentElement);

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("durationchange", handleMetadata);
    video.addEventListener("seeked", sync);
    video.addEventListener("error", handleError);

    // Lenis emits "scroll" every animation frame while it is easing, so the
    // video tracks the smoothed position. Fall back to native scroll if the
    // Lenis instance is not available yet.
    if (lenis) {
      lenis.on("scroll", update);
    } else {
      window.addEventListener("scroll", update, { passive: true });
    }

    mobileQuery.addEventListener("change", handleEnvironmentChange);
    reducedMotionQuery.addEventListener("change", handleEnvironmentChange);

    handleEnvironmentChange();

    return () => {
      if (lenis) {
        lenis.off("scroll", update);
      } else {
        window.removeEventListener("scroll", update);
      }

      resizeObserver?.disconnect();
      mobileQuery.removeEventListener("change", handleEnvironmentChange);
      reducedMotionQuery.removeEventListener("change", handleEnvironmentChange);
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("durationchange", handleMetadata);
      video.removeEventListener("seeked", sync);
      video.removeEventListener("error", handleError);
      detach();
    };
  }, [lenis]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-50"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="none"
        poster={POSTER_SRC}
        tabIndex={-1}
        className="absolute inset-0 size-full object-cover"
      />

      {/* One overlay instead of two stacked layers (same visual result). */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.31),rgba(255,255,255,0.42),rgba(255,255,255,0.56))]" />
    </div>
  );
}
