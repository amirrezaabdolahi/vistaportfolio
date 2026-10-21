# Scroll-controlled background video asset

Place the optimized background video at:

`public/videos/hero_background_video.mp4`

The component intentionally loads this file only on screens wider than 767px and when reduced motion is not requested. If the asset is absent or the browser cannot load it, the page keeps its static light gradient fallback and remains usable.

No poster image is required for the fallback. If a poster is added later, wire it through the `poster` attribute in `src/components/layout/scroll-video-background.tsx`.

Recommended preparation:
- H.264 MP4 for broad browser compatibility.
- Remove audio.
- Use a fast-start MP4 layout (`-movflags +faststart`).
- Keep keyframes reasonably frequent to improve random seeking.
- Compress the file for web delivery; test seeking on real mobile hardware before enabling mobile scrubbing.
