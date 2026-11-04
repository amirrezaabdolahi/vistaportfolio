# Selected Works 2 video assets

The repository currently does not contain the three vertical showcase videos or their poster images. The component therefore uses clearly marked placeholder paths. Add the assets below under `frontend/public`, or update the `VIDEO_PROJECTS` configuration in `src/components/sections/selected-works-2.tsx` to match the supplied filenames.

For each of the three projects, provide:

| Asset | Required path |
| --- | --- |
| Full original video | `public/videos/selected-work-01.mp4` |
| Muted 5-second preview | `public/videos/selected-work-01-preview.mp4` |
| Poster image | `public/videos/posters/selected-work-01.jpg` |

Repeat the same naming pattern for `02` and `03`.

Recommended asset preparation:
- Keep the original vertical aspect ratio (typically 9:16) for both files.
- Export the preview as a separate, lightweight, muted 5-second MP4; do not use an animated GIF.
- Use a JPEG or WebP poster matching the video's first representative frame.
- Keep the original full-length video separate from its preview.
- The component lazy-loads preview sources only when a card enters the viewport. The modal loads the full source only after a user opens that video.

Until these six video files and three posters are supplied, the section layout and modal shell can render, but video playback cannot be verified and the media requests will return 404.
