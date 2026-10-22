"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const VIDEO_SRC = "/hero_background_video_reversed.webm";

// Add a first-frame image in /public if you want a fallback poster.
const POSTER_SRC: string | undefined = undefined;

const END_GUARD = 0.001;
const MIN_DELTA = 1 / 48;
const SEEK_EPSILON = 0.04;

const clamp01 = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

const getNativeProgress = () => {
  const limit = document.documentElement.scrollHeight - window.innerHeight;
  return limit > 0 ? clamp01(window.scrollY / limit) : 0;
};

export function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

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
    let seekInFlight = false;

    const isDisabled = () => mobileQuery.matches || reducedMotionQuery.matches;

    const sync = () => {
      if (!ready || failed || seekInFlight || video.seeking) return;

      const duration = video.duration;

      if (!Number.isFinite(duration) || duration <= 0) return;

      const target = Math.min(
        Math.max(0, duration - END_GUARD),
        Math.max(0, progress * duration),
      );

      if (Math.abs(video.currentTime - target) < MIN_DELTA) return;

      seekInFlight = true;

      try {
        video.currentTime = target;
      } catch {
        seekInFlight = false;
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

      if (ready) update();
    };

    const handleSeeked = () => {
      seekInFlight = false;

      if (!ready || failed) return;

      const duration = video.duration;

      if (!Number.isFinite(duration) || duration <= 0) return;

      const target = Math.min(
        Math.max(0, duration - END_GUARD),
        Math.max(0, progress * duration),
      );

      if (
        Number.isFinite(video.currentTime) &&
        Math.abs(video.currentTime - target) >= SEEK_EPSILON
      ) {
        sync();
      }
    };

    const handleError = () => {
      failed = true;
      ready = false;
      seekInFlight = false;
      video.dataset.error = "true";
    };

    const attach = () => {
      if (isDisabled() || attached || failed) return;

      attached = true;
      delete video.dataset.error;

      video.preload = "auto";
      video.src = VIDEO_SRC;
      video.load();

      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        handleMetadata();
      }
    };

    const detach = () => {
      if (!attached) return;

      attached = false;
      ready = false;
      seekInFlight = false;

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

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;

    resizeObserver?.observe(document.documentElement);

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("durationchange", handleMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);

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
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);

      detach();
    };
  }, [lenis]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-50"
    >
      {/*
        Orientation is pure CSS, driven by the document direction on <html>:
        LTR locales (en, de, it, es) are mirrored with scaleX(-1); RTL (fa)
        resets to scale-x-100. Only the <video> is transformed, not the
        wrapper or the overlay. No React state, so there is no hydration
        mismatch, and switching locales updates it as soon as <html dir>
        changes.
      */}
      <video
        ref={videoRef}
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="none"
        poster={POSTER_SRC}
        tabIndex={-1}
        className="absolute inset-0 size-full -scale-x-100 object-cover rtl:scale-x-100"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.31),rgba(255,255,255,0.42),rgba(255,255,255,0.56))]" />
    </div>
  );
}
