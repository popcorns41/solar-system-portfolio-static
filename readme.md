# Hosted page
Link: https://popcorns41.github.io/solar-system-portfolio-static/
# Welcome

Welcome to my personal 3D portofolio website! Current platform support is desktop and tablet. Please note this is not a final product yet, current implementing a static version of the website and working on bugs.

# 3D Portfolio – Model Credits and Inspiration

## Core Inspiration

- **Solar System Base Inspiration**  
  [N3rson/Solar-System-3D (GitHub)](https://github.com/N3rson/Solar-System-3D)  
  Used as the foundational reference for layout, orbital motion, and interaction design.

# Responsive layout and loading

- Cards stack at widths up to 900px. At heights up to 600px, content grows with the page instead of using nested card scrolling. Wider displays retain two columns, with extra room for media.
- Portfolio sections render before the optional Three.js intro. Direct section links, small screens, reduced-motion preferences, and data-saving connections skip the 3D download. A CSS sun keeps the intro usable without WebGL.
- The render loop pauses outside the viewport and in hidden tabs. Entering the portfolio disposes of the renderer, controls, textures, and listeners.
- Dissertation previews load on request. The smaller resume preloads only near its card on desktop; mobile readers choose when to load either PDF.
- Responsive WebP images have explicit dimensions. Originals remain in `public` for future edits; the page requests the generated variants. Regenerate after replacing originals with `python3 scripts/assets/optimise_images.py` (requires Pillow).
- Google Fonts uses one stylesheet request. Skill icons load near the skills section; controls use inline SVG. EmailJS loads only when the contact form is submitted.

## Validation

Run `npm test` for rendering lifecycle and resize tests, and `npm run build` to regenerate `docs`.

Responsive checks cover 320×568, 390×844, 844×390, 768×1024, 1024×768, 1366×768 and 1920×1080. Verify the intro button, direct section links, PDF preview/download controls, and media at these sizes when changing layouts. Contact submissions should only be tested with permission to send an actual message.
