# Oliver Hill's portfolio

A static portfolio built with Vite, vanilla JavaScript and an optional Three.js sun intro. No framework or backend is required for the page itself.

## Where to edit

All editorial content is in **`src/content/`**. Components decide how it is displayed; content files decide what it says.

| Change | File |
| --- | --- |
| Welcome heading and job title | `src/content/site.js` |
| About me | `src/content/about.js` |
| Dissertation abstract, mark, stack, results and PDF | `src/content/dissertation.js` |
| Robotics project | `src/content/robotics.js` |
| Internship experience | `src/content/experience.js` |
| Basketball and hospitality | `src/content/extracurricular.js` |
| Early robotics and programming | `src/content/childhood.js` |
| Skills and résumé PDF | `src/content/skills.js` |
| Contact links and form labels | `src/content/contact.js` |
| Section order | `src/content/sections.js` |
| Fonts, layout and appearance | `src/styles/` |
| Page metadata and social previews | `index.html` |

A story paragraph and its mobile summary are kept together:

```js
blocks: [
  {
    heading: 'Overview',
    desktop: 'The full explanation, with optional <b>emphasis</b> or links.',
    mobile: 'A shorter version for narrow screens.',
  },
],
images: [
  {
    src: './info_images/example.jpg',
    alt: 'A useful description of the image',
    caption: 'The caption shown below it.',
  },
],
```

Copy supports locally authored HTML for links and emphasis. Do not populate these fields with untrusted user input. Only one text version is displayed (and exposed to screen readers) at a time: mobile up to 900px, desktop above 900px.

To add a story, copy one of the story content files, give it a unique `id`, then import and add it to the `sections` array. Its array position controls display order only. **Keep existing IDs stable**: `#panel-6` through `#panel-0` and `#dissertation` are shared URLs. Images pair their source, alt text and caption in one object; there are no parallel arrays to keep in sync.

## Run locally

Use Node.js 20 or newer and npm:

```sh
npm ci
npm run dev
```

```sh
npm test          # Content, asset, contact, URL and intro lifecycle checks
npm run build     # Production build into docs/
npm run check     # Tests followed by production build
npm run preview   # Serve the production build locally
```

`?dev` retains the intro's development mode. Public assets use the existing root base URL configured in `vite.config.js`.

`?sun=retro` previews the mobile sun on any screen. Its 320 triangular faces, colour palette and dithering live in `src/intro/low-poly-sun.js`; the halo and crossfade are in `src/styles/intro.css`. It uses a 256px canvas and paints at up to 20fps, with no texture download or WebGL dependency.

## Project map

```text
index.html              Page shell, metadata and external font references
src/
  main.js               Entry point; starts the optional 3D enhancement
  app/bootstrap.js      Intro controls, section creation and hash navigation
  content/              Editable copy, media, document links and section order
  components/           Small renderers for stories, media, PDFs, skills and contact
  intro/                Three.js scene, matching fallback, fade, resize and lifecycle
  services/contact.js   Lazy EmailJS integration and form submission handling
  config/email.js       EmailJS public browser configuration
  utils/                Shared visibility and video URL helpers
  styles/               Styles grouped by layout/component
  generated/            Generated image dimensions and responsive image URLs
public/                 PDFs, original images and optimised variants
scripts/                Maintenance tools
tests/                  Node's built-in test suite
docs/                   Generated production site (tracked for existing hosting)
```

`docs/` is generated output. Edit `src/`, `public/` or `index.html`, then run the build; do not hand-edit generated bundles. `src/generated/image-manifest.js` is generated too.

## Images

Place original content images in `public/info_images/`, then regenerate variants:

```sh
python3 scripts/optimise-images.py
```

The script needs Pillow. It preserves originals, writes responsive WebP variants to `public/info_images/optimised/`, and updates `src/generated/image-manifest.js`. It also generates the smaller sun texture from `public/images/sun.jpg`. The content tests catch missing originals, variants and PDFs. `scripts/requirements.txt` documents the Python dependency.

## Behaviour to preserve

- Cards stack at 900px; short screens use normal page scrolling. Desktop retains the two-card layout.
- Content is available before the optional 3D code downloads. Small screens, reduced motion, data-saving connections and direct section links skip WebGL.
- The rotating, low-poly sun uses the same projected bounds as the detailed 3D sun and crossfades after the texture is rendered. It stays static for reduced motion. Both renderers pause offscreen/in hidden tabs; entering the portfolio disposes of resources. The low-poly renderer also stops when WebGL takes over.
- The dissertation loads only on request. The résumé preloads near its card on desktop; mobile PDFs are opt-in.
- Images reserve their dimensions, load lazily and use responsive WebP variants. Skill icons and EmailJS are deferred.
- Contact tests inject a fake sender and never send mail. Test a real submission only when explicitly intended.

Browser checks should cover 320×568, 390×844, 844×390, 768×1024, 1024×768, 1366×768 and 1920×1080. Check the intro, hash links, mobile copy switching, document controls and media. Native PDF rendering depends on the browser; open/download links remain available.

## Deployment and credits

The workflow tests and builds on pushes to `main`, then triggers the separate deployment repository. The refactor retains the `docs/` output directory.

Hosted page: https://popcorns41.github.io/solar-system-portfolio-static/

Solar system inspiration: [N3rson/Solar-System-3D](https://github.com/N3rson/Solar-System-3D).
