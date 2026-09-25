# MM Services LLC — Website

Professional multi-page website for **MM Services LLC**, Houston, TX.
Handyman • Plumbing • Electrical • Landscaping.

Pure HTML/CSS/JS, served together with its backend by `../mm-services-backend`
(see that folder's README for running it and deploying to the Hostinger VPS).

```
mm-services-website/
├── index.html          home — hero, services overview, stats, about,
│                       auto-rotating client reviews
├── services.html       detailed service pages (handyman, plumbing,
│                       electrical, landscaping)
├── careers.html        job tracks + application form
├── contact.html        quote form, contact info, Google Map
├── css/styles.css      brand stylesheet + animations
├── js/main.js          nav, reviews carousel, counters, forms
└── assets/
    ├── favicon.svg
    ├── logo.png        company logo (transparent background)
    └── photos/         site photography
```

Navigation links open each page **in a new tab** (as requested). To switch to
normal same-tab navigation, remove `target="_blank" rel="noopener"` from the
nav/footer links in each HTML file.

## Logo

The site uses the company logo at `assets/logo.png` (transparent background;
a white-background copy is at `assets/logo-white-bg.png`). To update it,
replace those files with a new export.

## Photos

Site photography lives in `assets/photos/` (hero and careers images are the
company's own; the rest are CC BY 2.0 stock listed in PHOTO-CREDITS.md).
To swap any photo, drop a new 4:3 image into that folder and update the
matching `src` in the HTML.

## Client reviews

The reviews carousel on the home page auto-rotates every ~4 seconds (arrows,
dots, pauses on hover). The six reviews in `index.html` are **sample
placeholder content — replace them with real customer reviews before going
live**; publishing invented reviews as real ones can violate FTC rules.

To pull your Google reviews in automatically, the simplest options are an
embed widget (e.g. Elfsight, SociableKIT) pasted into the reviews section, or
the Google Places API if you want it fully custom.

## Forms

The quote form posts to `/api/quotes` and the job application form (with
optional resume upload) posts to `/api/applications`. Both are saved in the
backend's database, emailed to info@mmsvcs.com, and listed in the admin
dashboard at `/admin`. If the site is opened without the backend running,
the forms fall back to opening the visitor's email app with the details
filled in.

## Editing the basics

- **Phone / email / address / hours** — search the HTML files for
  `(844) 620-0012`, `info@mmsvcs.com`, `20333 State Highway 249`.
- **Colors** — CSS variables at the top of `css/styles.css`
  (`--flame-500` is the logo orange, `--steel-800` the dark steel,
  `--shield-600` the shield blue).
- **Stats band numbers** — `data-count` attributes in `index.html`.
- **Map** — the Google Maps iframe in `contact.html`.
