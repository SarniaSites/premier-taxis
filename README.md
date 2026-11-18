# Premier Taxis — website

Single-page site for Premier Taxis (Premier Cars Limited), Guernsey. Plain HTML + Tailwind CSS v3 (compiled and committed) + a small vanilla JS file. No frameworks, no CDNs.

```
index.html              the whole site, sections separated by comment banners
thanks.html, 404.html   form thank-you page and not-found page, same design
assets/css/styles.css   compiled Tailwind (run npm run build after editing classes or src/input.css)
assets/js/main.js       menu, header, hero entrance, route map explorer, lightbox, FAQ, form validation
assets/fonts/           self-hosted Anybody, Reddit Sans, Martian Mono (woff2) + OFL licences
images/brand/           logo badge (WebP, cut from the Facebook profile image)
images/work/            photos, two sizes each (name.webp + name-sm.webp)
images/                 favicons, site.webmanifest, og-image.jpg (1200×630 share card)
src/input.css           Tailwind source, @font-face, components, keyframes
tailwind.config.js      brand colours (named by role, with where each came from) and fonts
sitemap.xml, robots.txt
_fb-pack/               the Facebook pack this was built from (not published: leading underscore)
_shots/                 screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| brand-700 | `#680107` | Logo burgundy. Headings, map coastline, accessible-travel band |
| brand-900 | `#480102` | Banner burgundy. Hero, contact section, theme colour |
| action | `#FAD737` | TAXI roof-sign yellow. Only Call / Quote buttons and the roof sign |
| highlight | `#A8692F` | Bronze of the Premier Cars van. Route line, ticks, icons, the drawn taxi |
| accent | `#2F6FD0` | Forget-me-not blue from the logo. Accessibility icons only |
| ink | `#2A0B0E` | Text (burgundy-black) |
| surface | `#F8F2EF` | Page ground (warm, tinted toward the burgundy) |

Fonts: **Anybody** (display; wide italic caps like the logo lettering, width axis animates on load), **Reddit Sans** (body), **Martian Mono** (small meter-style labels). Recurring device: one word in each big heading drawn as an outline.

Logo: the Facebook profile image is 1254 px and sharp, so it is used as-is (cut to a circle). It has not been redrawn as SVG; `images/favicon.svg` is a simplified badge for the browser tab only. Ask the client for the original vector file if they have one.

The Guernsey coastline on the map is from geoBoundaries (CC BY 4.0) / OpenStreetMap contributors (ODbL), simplified.

## Editing

- **Text**: edit `index.html` directly.
- **Colours**: change `tailwind.config.js`, then `npm install && npm run build`.
- **Services / route stops**: each stop is an `<li data-stop data-at>` in the "THE DAY'S RUNS" block. `data-at` is how far along the route (0–1) the car stops. The matching map dot is `data-stop-dot` with the same index.
- **Adding a photo**: save `images/work/name.webp` (~1600 px) and `name-sm.webp` (~800 px), copy a `<figure class="photo-card">` in the island tours block and update `data-lb` numbers.
- No before/after slider (not a visual-transformation trade) and no testimonials (the page has no written reviews).

## Going live — checklist

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg). They already have premiercarslimited.com, so check who controls it first.
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap, `_next`
- [ ] Switch the form from the team's email to `premiercarslimited@gmail.com` and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the services wording
- [ ] Check the assumptions below
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

### Assumptions to check with the client

- Passenger numbers: flyers say "1–6", "up to 5", "up to 6" and "1–7". The site says **one to six**.
- Years of experience (flyers say 17 and 18): left out.
- "Fully licensed and insured" comes from the island tours flyer; confirm it covers all work.
- WhatsApp and text links use 07781 135100 (the flyer says text and WhatsApp are available; same number assumed).
- The accessible vehicle is a Peugeot Horizon (from their notice). The route map is illustrative, not a timetable.
- Photos: St Peter Port seafront, a coastal view and a sunset from their page. A sunset by a named photographer (Gary Sarre) was left out.

### Left out of the pack

Shared posts from other businesses (Dix-Neuf festive afternoon tea, Le Pommier menus and team nights, Christmas Tractor Run, Christmas Gift Drive, road closure notice, Guernsey Water notice), hiring adverts, "Driver in training" and "No to GST" posts, Easter and welcome graphics, the "Positive Vibes" and poppy images.

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).
