# MM Services LLC — Website

Professional single-page website for **MM Services LLC**, Houston, TX.
Handyman • Plumbing • Electrical • Landscaping.

Pure HTML/CSS/JS — no build step, no dependencies. Upload the folder to any
static host (Netlify, Vercel, GitHub Pages, cPanel, etc.) and it works.

```
mm-services-website/
├── index.html          the whole site (hero, services, before/after,
│                       team, careers, contact)
├── css/styles.css      brand stylesheet (colors pulled from the logo)
├── js/main.js          mobile nav, before/after sliders, forms
└── assets/
    ├── favicon.svg
    ├── gallery/        before/after images (placeholders — see below)
    └── team/           team photos (placeholders — see below)
```

## Replace the placeholder images with real photos

The before/after gallery and team cards currently use **labeled sample
illustrations** so the layout looks finished. Swap them for real job photos:

1. Take before and after shots **from the same angle**, landscape, ideally
   4:3 (e.g. 1600×1200). For team photos use portrait 4:5 shots of employees
   in uniform.
2. Drop the files into `assets/gallery/` / `assets/team/`.
3. In `index.html`, update the matching `src` attributes, e.g. change
   `assets/gallery/plumbing-before.svg` → `assets/gallery/plumbing-before.jpg`.
4. Update the `alt` text and the caption under each figure.

To add more before/after pairs, copy one whole `<figure class="ba-figure">…
</figure>` block — the slider wires itself up automatically.

## Logo

The emblem is an SVG recreation drawn from the real logo (defined once at the
top of `index.html` as `#logo-emblem`). To use the original logo file instead,
save it as `assets/logo.png` and replace the `<svg><use …></svg>` elements in
the header/footer with `<img src="assets/logo.png" alt="MM Services LLC">`.

## Forms

Both forms (quote request + job application) open the visitor's email app
with everything pre-filled, addressed to **info@mmsvcs.com** — this works on
any static host with zero setup.

To collect submissions in a dashboard instead, create a free
[Formspree](https://formspree.io) form and replace the `hookForm(...)` mailto
logic in `js/main.js` with a `fetch()` POST to your Formspree endpoint (a
comment in the file marks the spot).

## Editing the basics

- **Phone / email / address / hours** — search `index.html` for
  `(844) 620-0012`, `info@mmsvcs.com`, and `20333 State Highway 249`.
- **Colors** — all brand colors are CSS variables at the top of
  `css/styles.css` (`--flame-500` is the logo orange, `--steel-800` the dark
  steel, `--shield-600` the shield blue).
- **Service lists, careers copy** — plain text in `index.html`.
- **Map** — the Google Maps embed in the contact section is keyed to the
  office address; edit the iframe `src` if you move.
