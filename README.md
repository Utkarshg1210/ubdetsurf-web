# UBDetsurf Industries website

> html css js website made using wix ka design and claude

A plain **HTML5 + CSS3 + vanilla JavaScript** static site. No framework, no build step, no dependencies, no third-party scripts. Upload the files to any static host.

## What is in this folder

```
index.html                  Home
about-us.html               About us (leadership, journey, vision & mission, facilities)
products.html               Formulation types + molecule recommendation tables + FAQ
research-development.html   R&D
clients.html                Clients
iso-certifications.html     ISO certificates
careers.html                Careers (email-draft form)
contact-us.html             Contact (email-draft form)
css/                        variables.css, global.css, components.css, responsive.css, no-js.css
js/main.js                  Mobile nav, forms → mailto, lightbox, reveal
assets/fonts/               Self-hosted woff2 fonts (SIL OFL)
assets/images/              AVIF/WebP photos, certificates, client logos, OG images
assets/icons/, favicon.ico  Favicons and touch icon
robots.txt  sitemap.xml  llms.txt
SEO_STRATEGY.md  CONTENT_AUDIT.md  URL_REDIRECTS.md  README.md   (documentation: do not need to be uploaded)
```

## Preview locally

```
cd <this folder>
python3 -m http.server 8000     # then open http://localhost:8000
```

Opening the files by double-clicking mostly works, but use a server to test exactly what a host will serve.

## Deploy

1. **Choose a static host.** For Netlify, `netlify.toml` publishes only the website files and `_redirects` holds the old-address redirects. On any other host, upload everything except the `.md` files: they are internal notes and should not be public.
2. **Point the domain** `www.ubdetsurf.com` at the host and enable HTTPS. Redirect `ubdetsurf.com` and `http://` to `https://www.ubdetsurf.com/`.
3. **Set up the 301 redirects** in `URL_REDIRECTS.md` *before* switching the domain away from Wix.
4. In Google Search Console and Bing Webmaster Tools, verify the domain and submit `https://www.ubdetsurf.com/sitemap.xml`.
5. Read `CONTENT_AUDIT.md` and settle the open items (especially the "30+ years" figure, the award and the photo authenticity).
6. Test on the live domain: every page, the mobile menu, both forms (they open your mail app), and the redirects.

### Recommended response headers (set at the host)

These are the headers you cannot set from HTML. Check your host's documentation for where to put them (`_headers` on Netlify/Cloudflare, `.htaccess`/server config elsewhere).

```
# All pages
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; style-src-attr 'unsafe-inline'; script-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'

# Caching: set for Netlify in the _headers file (photos and fonts one week; CSS and JS ten minutes)
```

- The CSP expects **no inline scripts** (the JSON-LD blocks are data, not executable script). Some cards use inline `style` attributes to time their animation, which `style-src-attr 'unsafe-inline'` allows. Test it on the live site; if you add analytics or embeds, add their domains.
- File names carry no version, so give a replaced photo or font a **new file name**; otherwise returning visitors can see the old one for up to a week. CSS and JavaScript changes reach them within ten minutes.
- Turn on **Brotli or gzip** compression for HTML, CSS, JS, SVG and XML.
- Serve `.woff2` with `Content-Type: font/woff2` and `.avif`/`.webp` with the right image types (most hosts do this already).

## How to edit

**Text:** open the `.html` file, find the text, edit it, save. Keep one `<h1>` per page.

**Header and footer are repeated in every page** (that is the price of "no build step"). To change the menu, phone number or footer text, make the same edit in all eight files. Search for a unique string (for example `Quick links`) to find the block in each file.

**Colours, fonts, spacing:** `css/variables.css`. Everything else uses those values.

**Email addresses:** `js/main.js` has `SALES_EMAIL` and `CAREERS_EMAIL` at the top. The no-JavaScript fallback links in `contact-us.html` and `careers.html` contain the address as well, so change those too. Careers currently uses the sales address because no HR address has been confirmed.

**Adding a page:**
1. Copy a similar page, change title, description, canonical, Open Graph URL, H1, content and JSON-LD.
2. Add it to the menu and footer of every page.
3. Add it to `sitemap.xml` and (optionally) `llms.txt`.
4. Create `assets/images/og/og-<name>.jpg` (1200×630) and point the page's `og:image` at it.

**Adding a product row:** edit the table in `products.html` (`<tr>` with number, product, and a `<ul class="molecules">` list). Keep the S.No. column in order.

**Updating the sitemap:** change `<lastmod>` when a page's content changes. Do not list redirected or `noindex` URLs.

**Images:** export AVIF and WebP, at 1× and 2× widths where useful, give descriptive file names (`stainless-steel-mixing-vessels-763.webp`, not `IMG_1234.webp`), and always add `width`, `height` and `alt`. Use `loading="lazy"` on everything except the first image on a page.

## Forms (Contact and Careers)

A static site has no server to receive form data, so the forms prepare a pre-filled message: they try the visitor's email app (`mailto:`) and also offer Gmail and Outlook web compose buttons, which pass the form details to that service only when clicked. They never say "sent": opening the email app is not the same as sending. They also show a copy-the-text fallback. With JavaScript disabled, a button with a ready-made `mailto:` link is shown instead.

- Careers subject is exactly `Career Application – UBDetsurf Industries`; the page tells applicants to **attach their CV** because a web page cannot attach files.
- If you want forms that send directly, you need a server or a form service. That adds a third party and data-protection obligations, so it was deliberately not done.

## Accessibility and browser support

Semantic landmarks, skip link, visible focus rings, accessible mobile menu (`aria-expanded`, Escape closes), `prefers-reduced-motion` respected, native `<details>` for FAQs, tables with proper headers, colours checked for contrast. The page content works with JavaScript disabled. Targets current Chrome, Edge, Firefox and Safari; the CSS uses custom properties and modern layout (grid/flex) and the certificate viewer uses `<dialog>` (links open the image directly if unsupported).

## Licences

- **Fonts:** Merriweather, Open Sans, DM Mono: SIL Open Font License 1.1, self-hosted from the fontsource packages. Keep the licence if you redistribute the font files. Lucida Handwriting (logo tagline) is *not* bundled; visitors who lack it see a serif fallback.
- **Images:** photographs, certificates and logos supplied by UBDetsurf, except `crop-spraying-field-*` (About page), an Unsplash stock photo (`photo-1719559521262-773f39dbee87`, Unsplash License). The home page `hero-slide-*` (also behind its closing banner) and `crop-rows-aerial-*` images are Unsplash stock photos too (`photo-1783454975251-8baeadeb91f7`, `photo-1742161261695-922c22274e5b`, `photo-1625246333195-78d9c38ad449`, `photo-1416879595882-3373a0480b5b`, `photo-1724531281596-cfae90d5a082`). The Products page `product-*` card photos are Unsplash stock photos too (`photo-1532094349884-543bc11b234d`, `photo-1784913110581-1c12f5d48279`, `photo-1692369584496-3216a88f94c1`, `photo-1586137712370-9b450509c587`, `photo-1617155093730-a8bf47be792d`, `photo-1751330453710-008c33dd0155`, `photo-1587499211757-86eeee9c75da`, `photo-1766297247072-93fd815afef3`). The R&D banner `rnd-banner-*` is Unsplash `photo-1446608943998-cbd52b140335`; `clients-banner-*` is `photo-1500937386664-56d1dfef3854` and `careers-banner-*` is `photo-1521791136064-7986c2920216`. Client logos belong to those companies.
- **Code:** written for UBDetsurf Industries Pvt. Ltd.

## Original files

Nothing was deleted. The original Wix exports and the Wix–GitHub repository are untouched. The rebuilt site was written alongside them in the folder `ubdetsurf-site/`.
