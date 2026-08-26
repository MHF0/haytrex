# MM Services LLC — Website

Professional multi-page website for **MM Services LLC**, Houston, TX.
Handyman • Plumbing • Electrical • Landscaping.

Pure HTML/CSS/JS — no build step, no dependencies. Upload the folder to any
static host (Netlify, Vercel, GitHub Pages, cPanel, etc.) and it works.

```
mm-services-website/
├── index.html          home — hero, services overview, stats, featured
│                       before/after, auto-rotating client reviews
├── services.html       detailed service pages (handyman, plumbing,
│                       electrical, landscaping)
├── gallery.html        before/after comparison sliders
├── careers.html        job tracks + application form
├── contact.html        quote form, contact info, Google Map
├── css/styles.css      brand stylesheet + animations
├── js/main.js          nav, sliders, reviews carousel, counters, forms
└── assets/
    ├── favicon.svg
    └── gallery/        before/after images (see below)
```

Navigation links open each page **in a new tab** (as requested). To switch to
normal same-tab navigation, remove `target="_blank" rel="noopener"` from the
nav/footer links in each HTML file.

## Use the exact logo file

The emblem on the site is a high-fidelity SVG recreation of the MM SVCS logo
(defined once per page as `#logo-emblem`). To use the **original logo file**
instead:

1. Export the logo as PNG **with a transparent background** (the white-
   background version will show a white box on the dark header). Name it
   `assets/logo.png`.
2. In each HTML file, replace every
   `<svg class="..."><use href="#logo-emblem"></use></svg>` with
   `<img class="..." src="assets/logo.png" alt="MM Services LLC">`.

Tip: committing the PNG to this repo (drag &amp; drop on github.com works)
lets Claude wire it in for you on the next session.

## Replace the gallery images with real job photos

The before/after sliders use styled illustration imagery so the site looks
finished today. Real photos of your own jobs will always sell better:

1. Take before and after shots **from the same angle**, landscape 4:3
   (e.g. 1600×1200).
2. Drop them into `assets/gallery/` — e.g. `plumbing-before.jpg`,
   `plumbing-after.jpg`.
3. Update the matching `src` attributes in `index.html`, `gallery.html`
   and `services.html` (search for `assets/gallery/`).

## Client reviews

The reviews carousel on the home page auto-rotates every ~4 seconds (arrows,
dots, pauses on hover). The six reviews in `index.html` are **sample
placeholder content — replace them with real customer reviews before going
live**; publishing invented reviews as real ones can violate FTC rules.

To pull your Google reviews in automatically, the simplest options are an
embed widget (e.g. Elfsight, SociableKIT) pasted into the reviews section, or
the Google Places API if you want it fully custom.

## Forms

Both forms (quote request + job application) open the visitor's email app
with everything pre-filled, addressed to **info@mmsvcs.com** — works on any
static host with zero setup. To collect submissions in a dashboard instead,
create a free [Formspree](https://formspree.io) form and replace the
`hookForm(...)` mailto logic in `js/main.js` with a `fetch()` POST (a comment
in the file marks the spot).

## Editing the basics

- **Phone / email / address / hours** — search the HTML files for
  `(844) 620-0012`, `info@mmsvcs.com`, `20333 State Highway 249`.
- **Colors** — CSS variables at the top of `css/styles.css`
  (`--flame-500` is the logo orange, `--steel-800` the dark steel,
  `--shield-600` the shield blue).
- **Stats band numbers** — `data-count` attributes in `index.html`.
- **Map** — the Google Maps iframe in `contact.html`.
