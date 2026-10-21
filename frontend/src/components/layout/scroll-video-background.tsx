"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";

const VIDEO_SRC = "/hero_background_video.webm";
const SEEK_EPSILON = 0.04;
const END_FRAME_GUARD = 0.05;

export function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frameRequest: number | null = null;
    let latestProgress = scrollYProgress.get();
    let metadataReady = false;
    let sourceAttached = false;
    let seekInFlight = false;

    const getTargetTime = () => {
      const lastSeekableTime = Math.max(0, video.duration - END_FRAME_GUARD);

      return Math.min(
        lastSeekableTime,
        Math.max(0, latestProgress * video.duration),
      );
    };

    const seekToScrollPosition = () => {
      frameRequest = null;

      if (
        !metadataReady ||
        video.readyState < HTMLMediaElement.HAVE_METADATA ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0 ||
        seekInFlight ||
        video.seeking
      ) {
        return;
      }

      const targetTime = getTargetTime();

      if (
        Number.isFinite(video.currentTime) &&
        Math.abs(video.currentTime - targetTime) < SEEK_EPSILON
      ) {
        return;
      }

      // Keep at most one seek in flight. Scroll updates only replace
      // latestProgress; after this seek completes, we jump to the newest target.
      seekInFlight = true;

      try {
        video.currentTime = targetTime;
      } catch {
        seekInFlight = false;
        // The next scroll update or media event can safely retry.
      }
    };

    const scheduleSeek = (progress: number) => {
      latestProgress = Math.min(1, Math.max(0, progress));

      if (frameRequest === null) {
        frameRequest = window.requestAnimationFrame(seekToScrollPosition);
      }
    };

    const handleSeeked = () => {
      seekInFlight = false;

      if (metadataReady) {
        const targetTime = getTargetTime();

        if (
          Number.isFinite(video.currentTime) &&
          Math.abs(video.currentTime - targetTime) >= SEEK_EPSILON
        ) {
          scheduleSeek(latestProgress);
        }
      }
    };

    const handleMetadata = () => {
      metadataReady =
        video.readyState >= HTMLMediaElement.HAVE_METADATA &&
        Number.isFinite(video.duration) &&
        video.duration > 0;

      if (metadataReady) {
        scheduleSeek(scrollYProgress.get());
      }
    };

    const handleMediaError = () => {
      video.dataset.error = "true";
      metadataReady = false;
      seekInFlight = false;
    };

    const attachSource = () => {
      if (
        reduceMotion ||
        mobileQuery.matches ||
        reducedMotionQuery.matches ||
        sourceAttached
      ) {
        return;
      }

      sourceAttached = true;
      delete video.dataset.error;
      video.preload = "auto";
      video.src = VIDEO_SRC;
      video.load();

      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        handleMetadata();
      }
    };

    const detachSource = () => {
      if (!sourceAttached) {
        return;
      }

      sourceAttached = false;
      metadataReady = false;
      seekInFlight = false;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const handleEnvironmentChange = () => {
      if (reduceMotion || mobileQuery.matches || reducedMotionQuery.matches) {
        detachSource();
      } else {
        attachSource();
      }
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("durationchange", handleMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleMediaError);

    const unsubscribeScroll = scrollYProgress.on("change", scheduleSeek);

    mobileQuery.addEventListener("change", handleEnvironmentChange);
    reducedMotionQuery.addEventListener("change", handleEnvironmentChange);

    handleEnvironmentChange();
    scheduleSeek(scrollYProgress.get());

    return () => {
      unsubscribeScroll();
      mobileQuery.removeEventListener("change", handleEnvironmentChange);
      reducedMotionQuery.removeEventListener("change", handleEnvironmentChange);
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("durationchange", handleMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleMediaError);

      if (frameRequest !== null) {
        window.cancelAnimationFrame(frameRequest);
      }

      detachSource();
    };
  }, [reduceMotion, scrollYProgress]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(15,23,42,0.07),transparent_48%)]" />

      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        tabIndex={-1}
        className="absolute inset-0 size-full object-cover"
      />

      <div className="absolute inset-0 bg-white/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/45 to-white/65" />
    </div>
  );
}
