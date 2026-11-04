"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";

type VideoProject = {
  id: string;
  previewSrc: string;
  originalSrc: string;
  posterSrc: string;
};

// Replace these clearly marked placeholder paths when the three vertical
// source videos, optimized 5-second previews, and poster images are supplied.
// Required paths are documented in public/videos/selected-works-2-assets.md.
const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: "01",
    previewSrc: "/projects/west-minster-preview.webm",
    originalSrc: "/projects/west-full.webm",
    posterSrc: "/projects/west-minster-preview-poster.png",
  },
  {
    id: "02",
    previewSrc: "/projects/ok2-preview.webm",
    originalSrc: "/projects/ok2-full.webm",
    posterSrc: "/projects/ok2-poster.png",
  },
  {
    id: "03",
    previewSrc: "/projects/ok22-preview.webm",
    originalSrc: "/projects/ok22-full.webm",
    posterSrc: "/projects/ok22-poster.png",
  },
];

const PREVIEW_DURATION = 5;

type PreviewCardProps = {
  project: VideoProject;
  label: string;
  reducedMotion: boolean;
  onOpen: (project: VideoProject, opener: HTMLButtonElement) => void;
};

function PreviewCard({
  project,
  label,
  reducedMotion,
  onOpen,
}: PreviewCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [previewBlocked, setPreviewBlocked] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const startPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || !isInView) return;

    if (!video.src) {
      video.src = project.previewSrc;
      video.load();
    }

    void video.play().then(
      () => setPreviewBlocked(false),
      () => setPreviewBlocked(true),
    );
  }, [isInView, project.previewSrc, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const card = video?.parentElement;
    if (!video || !card || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (!visible) {
          video.pause();
          video.currentTime = 0;
          return;
        }

        if (reducedMotion) return;

        if (!video.src) {
          video.src = project.previewSrc;
          video.load();
        }

        void video.play().then(
          () => setPreviewBlocked(false),
          () => setPreviewBlocked(true),
        );
      },
      { threshold: 0.35 },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [project.previewSrc, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView || reducedMotion) return;

    if (previewBlocked) return;
    startPreview();
  }, [isInView, previewBlocked, reducedMotion, startPreview]);

  const restartPreview = () => {
    const video = videoRef.current;
    if (!video || !isInView || reducedMotion) return;

    video.currentTime = 0;
    void video.play().catch(() => setPreviewBlocked(true));
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= PREVIEW_DURATION) {
      restartPreview();
    }
  };

  return (
    <article className="group min-w-0 w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[58vw] lg:w-auto lg:max-w-none lg:flex-1">
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-xl bg-neutral-100"
        onPointerEnter={() => {
          if (previewBlocked) startPreview();
        }}
        onFocus={() => {
          if (previewBlocked) startPreview();
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop={false}
          preload="none"
          poster={project.posterSrc}
          aria-hidden="true"
          onLoadedData={() => setPreviewLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={restartPreview}
          onError={() => setPreviewBlocked(true)}
          className="absolute inset-0 size-full object-cover"
        />

        {!previewLoaded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-neutral-200/30"
          />
        )}

        <button
          type="button"
          onClick={(event) => onOpen(project, event.currentTarget)}
          aria-label={label}
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white motion-reduce:transition-none"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-neutral-950 shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
            <Play aria-hidden="true" className="ms-0.5 size-5 fill-current" />
          </span>
        </button>

        {previewBlocked && (
          <span className="pointer-events-none absolute bottom-3 start-3 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white">
            {label}
          </span>
        )}
      </div>
    </article>
  );
}

export function SelectedWorks2() {
  const t = useTranslations("SelectedWorks2");
  const reducedMotion = useReducedMotion() ?? false;
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(
    null,
  );
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const openVideo = (project: VideoProject, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelectedProject(project);
  };

  const closeVideo = useCallback(() => {
    const video = modalVideoRef.current;
    video?.pause();
    if (video) {
      video.removeAttribute("src");
      video.load();
    }
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeVideo();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = modalVideoRef.current
        ?.closest('[role="dialog"]')
        ?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [closeVideo, selectedProject]);

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!selectedProject || !video) return;

    video.src = selectedProject.originalSrc;
    video.load();

    const playFullVideo = () => {
      void video.play().catch(() => {
        // Native controls remain available if browser playback is delayed/blocked.
      });
    };

    video.addEventListener("loadedmetadata", playFullVideo, { once: true });
    return () => {
      video.pause();
      video.removeEventListener("loadedmetadata", playFullVideo);
      video.removeAttribute("src");
      video.load();
    };
  }, [selectedProject]);

  return (
    <section
      aria-labelledby="selected-works-2-heading"
      className="bg-white/45 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>
            <h2
              id="selected-works-2-heading"
              className="max-w-2xl text-balance text-4xl font-medium leading-[1.12] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9 lg:justify-self-end lg:pb-1">
            {t("description")}
          </p>
        </div>

        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:gap-5 sm:px-8 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 xl:gap-7">
          {VIDEO_PROJECTS.map((project) => (
            <PreviewCard
              key={project.id}
              project={project}
              label={t("openVideo", { number: project.id })}
              reducedMotion={reducedMotion}
              onOpen={openVideo}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeVideo();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("dialogLabel", { number: selectedProject.id })}
            className="relative flex max-h-full w-full max-w-5xl items-center justify-center"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeVideo}
              aria-label={t("closeVideo")}
              className="absolute -top-12 end-0 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:-top-14"
            >
              <X aria-hidden="true" size={21} />
            </button>

            <video
              ref={modalVideoRef}
              controls
              autoPlay
              playsInline
              preload="none"
              className="max-h-[calc(100svh-5rem)] max-w-full rounded-xl bg-black object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
