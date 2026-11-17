# Premier Taxis — website

Single-page site for Premier Taxis (Premier Cars Limited), Guernsey. Plain HTML + Tailwind CSS v3 (compiled and committed) + a little vanilla JS. No frameworks, no runtime CDNs, all paths relative.

## Folder layout

```
index.html              ← the whole site; sections separated by big comment banners
thanks.html             ← where the quote form lands after sending
404.html                ← page not found, same design
assets/css/styles.css   ← compiled Tailwind (don't edit by hand – run npm run build)
assets/js/main.js       ← header, menu, reveals, services explorer, accessible-taxi hotspots, lightbox, form
assets/fonts/           ← Young Serif + Hanken Grotesk (woff2, self-hosted) and their OFL licences
images/brand/           ← logo.webp / logo-sm.webp (the client's round badge, background removed)
images/work/            ← photos, each as name.webp (large) and name-sm.webp (~800px)
images/                 ← favicons, og-image.jpg (share card), site.webmanifest
src/input.css           ← Tailwind source: @font-face, components, keyframes
tailwind.config.js      ← brand colours (named by role), fonts, animations
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook research pack (not published – leading underscore)
_shots/                 ← screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| action | `#680107` | Claret of the round badge – Call/Quote buttons, links, selected tab, contact band |
| brand | `#480102` / deep `#2e0003` | Darker claret from the banner – accessible-travel band, road strip, footer |
| highlight | `#f8ba07` / light `#fad737` | Taxi-sign amber from the badge lettering – road lines, markers, roof-sign tags |
| accent | `#2f62a8` | Forget-me-not blue (dementia-friendly symbol on the badge) – accessibility icons only |
| surface | `#fbf6ec` / white `#fffdf8` / warm `#f4ebdb` | Warm paper backgrounds |
| ink | `#241416` | Body text |

Fonts: **Young Serif** (display) and **Hanken Grotesk** (body), self-hosted from @fontsource, OFL.

Logo: the badge (`_fb-pack/images/profile.jpg`, 1254px) is sharp, so it was used as-is (cut to a circle), **not redrawn**. `images/favicon.svg` is a simple claret/amber "P" mark for browser tabs.

Concept: the road. An amber dashed centre-line runs through the hero (a route linking Airport, Harbour and Island tours photos), the road strip under the hero (a small taxi drives across), the booking steps and the footer. The centrepiece is the **accessible taxi cutaway**: a line drawing of the vehicle with six numbered points (wheelchair space, companion seat, dogs, trained drivers, what to tell us, partner WAV drivers).

## Editing

- **Text** – edit `index.html` directly. Each section starts with a `=====` comment banner.
- **Colours** – change `tailwind.config.js`, then `npm install` (first time) and `npm run build`.
- **Services explorer** – each tab is a `<button role="tab">` with `aria-controls="p-…"`; each panel is the matching `<div role="tabpanel" id="p-…">`. Copy a tab + panel pair to add one.
- **Accessible-taxi points** – the text lives in the `notes` array in `assets/js/main.js`; the numbered markers are the `<g class="hot" data-i="…">` groups in the SVG.
- **Adding a photo** – export `name.webp` (~1600px wide) and `name-sm.webp` (~800px) into `images/work/`. To add it to the "Around the island" strip, copy one of the `<button data-full="…">` blocks in `#gallery` (it opens in the lightbox automatically).
- No before/after slider (not a visual-transformation trade).

## Going live — checklist

SarniaSites charges a one-time fee and the client owns everything.

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg). Note: their Facebook links to premiercarslimited.com – check whether they already own it.
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap, robots, `_next`
- [ ] Switch the form from the team's email to the client's (premiercarslimited@gmail.com) and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the services wording
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

### Assumptions and things to check with the client

- **Passenger numbers differ between their flyers** (1–7 with multiple vehicles, 1–6, up to 5), so the site doesn't state a number. Ask which to use.
- **Years of experience differ** (17 on one flyer, 18 on another), so it's left out.
- "Fully licensed & insured" is from their island-tours flyer only; confirm it applies to all work.
- The accessible-taxi drawing shows a rear ramp and straps as illustration; the copy only states what the pack says (small–medium wheelchair + one passenger, Peugeot Horizon, partner WAV drivers).
- Brand name: the page is "Premier Taxis", the company "Premier Cars Limited" – both are shown.
- WhatsApp link uses 07781 135100 (their flyer says WhatsApp is available).
- No reviews were available, so there's no testimonials section.

### Left out on purpose

- Shared posts from other businesses (Dix-Neuf festive afternoon tea, Le Pommier menus and team night out, the Christmas Tractor Run, Christmas Gift Drive, road-closure notices, Guernsey Water notice).
- Hiring and driver-in-training posts, the GST post, the Easter and "welcome new followers" graphics, the poppy and "positive vibes" posts.
- Stock-looking images (yellow taxi sign, businessman at car door) and the photographer-credited sunset photo.

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).
