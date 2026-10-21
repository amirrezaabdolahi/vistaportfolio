# Scroll-controlled background video asset

Place the optimized background video at the frontend public root:

`public/hero_background_video.webm`

The component loads the video only on screens wider than 767px and when reduced motion is not requested. If the asset is missing or the browser cannot decode it, the page keeps its static light-gradient fallback.

For smoother scroll scrubbing:
- Keep the resolution and bitrate appropriate for a full-screen background.
- Use frequent keyframes / a short GOP so the decoder can seek without decoding a long chain of frames.
- Avoid unusually long or high-complexity encoding settings.
- Test the actual file in the target browsers; codec and encoding settings affect seek latency.
- Consider a lightweight poster image for the initial frame if desired.

The binary video itself is not committed in this repository change.
