# Premier Taxis — website

Single-page site for Premier Taxis (Premier Cars Limited), Guernsey. Plain HTML + Tailwind CSS v3 (compiled and committed) + a little vanilla JS. No frameworks, no runtime CDNs, all paths relative.

## Folder layout

```
index.html              ← the whole site; sections separated by big comment banners
thanks.html             ← where the booking form lands after sending
404.html                ← page-not-found, same design
assets/css/styles.css   ← compiled Tailwind (don't edit by hand; run npm run build)
assets/js/main.js       ← menu, header, reveals, services explorer, lightbox, form validation
assets/fonts/           ← Fraunces + Figtree (woff2, self-hosted) and their OFL licences
images/brand/           ← logo.webp / logo-sm.webp (from the client's own badge) + mark.svg
images/work/            ← photos, each as name.webp (~1600px) and name-sm.webp (~800px)
images/                 ← favicons, og-image.jpg (share card), site.webmanifest
src/input.css           ← Tailwind source: @font-face, components, keyframes
tailwind.config.js      ← brand colours, fonts, animations
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook research pack (not published – leading underscore)
_shots/                 ← screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| claret-800 | `#680107` | Main maroon from the logo – buttons, headings, accessible-travel band |
| claret-900 / 950 | `#4a0105` / `#2c0003` | Darker maroon (banner shadow tone) – headings, footer |
| gold-300 | `#fad737` | Logo lettering – highlights, road-line dashes, pins |
| gold-400 / 500 | `#f8c51c` / `#f0ae07` | Deeper logo gold – ticks, hovers |
| paper-50 / 100 | `#fffdf8` / `#fbf6ec` | Warm off-white backgrounds |
| ink | `#221516` | Body text |

Fonts: **Fraunces** (display, echoing the heavy serif of the logo) and **Figtree** (body). Both self-hosted from @fontsource, OFL licence.

Logo: the client's badge (`_fb-pack/images/profile.jpg`, 1254px) is sharp enough to use as-is, so it was **not** redrawn. `images/brand/mark.svg` / `favicon.svg` is a simple maroon-and-gold taxi mark for favicons only.

Concept: a **route line**. A dashed road centre-line runs under the hero and footer, the hero is an illustrated map of Guernsey with a taxi driving from the airport to St Peter Port, the services list uses route "stops", and the booking steps are a dashed path.

## Editing

- **Text** – edit `index.html` directly. Each section starts with a `═══` comment banner.
- **Colours** – change them in `tailwind.config.js`, then `npm install` (first time) and `npm run build`.
- **Services explorer** – each service is a `<button role="tab">` in the list plus a matching `<article role="tabpanel">`. Keep the `id` / `aria-controls` pairs matching. The "Book…" buttons use `data-service="…"`, which must match an `<option>` in the form's service list.
- **Island tours photos** – add `images/work/name.webp` + `name-sm.webp` (1600px / 800px WebP), then copy one of the `<button data-lightbox …>` blocks in the tours section and change `data-src`, `data-caption`, the `src`, `alt`, `width` and `height`.
- No before/after slider and no testimonials section (not relevant / no written reviews in the pack).

## Going live — checklist

SarniaSites charges a one-time fee and the client owns everything:

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg). Note: their Facebook links to **premiercarslimited.com** – check whether they already own it.
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap `https://sarniasites.github.io/premier-taxis/` for the real domain everywhere: canonical, og tags, JSON-LD, `sitemap.xml`, `robots.txt`, the form's `_next`
- [ ] Switch the form from the team's email to the client's (`premiercarslimited@gmail.com`) and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the services wording
- [ ] Check the assumptions below
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

### Assumptions to check with the client

- Passenger numbers: flyers say "1–6", "up to 5" and "1–7". The site says **up to 6**.
- Years of experience: flyers say both 17 and 18 years, so the site doesn't mention it.
- "Day and night, 7 days a week, including bank holidays" comes from the flyers. JSON-LD lists them as open 24/7.
- Gold account described as "everything in Standard" plus more, based on the corporate-accounts flyer.
- Island-tour gallery uses scenery photos from their page, not photos of their own vehicles (there are no real vehicle photos in the pack – the flyer vehicles are illustrations with text baked in). A real photo of their cars/drivers would improve the site.
- Second email in the pack (events@lepommier.co.uk) belongs to a shared Le Pommier post, not to Premier Taxis – not used.

### Left out on purpose

Shared posts from other businesses (Dix-Neuf festive tea, Le Pommier team night, Christmas Tractor Run, Christmas Gift Drive, road-closure and Guernsey Water notices), the "We are hiring" and "Driver in training" posts, the "No to GST" post, seasonal greetings (Easter, autumn, poppy), the "welcome new followers" post and the business-spotlight screenshot.

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
