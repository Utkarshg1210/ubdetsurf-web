# URL redirects (Wix → static site)

The old Wix site used different paths from this rebuild. Without redirects, every old URL that Google, directories and customers have saved will return a 404 and the new pages will start with no ranking history. Set these up at the host **before or at the moment you switch DNS**, as permanent (301) redirects.

## Redirect map

| Old Wix URL | New URL | Notes |
|---|---|---|
| `/` | `/` | Unchanged |
| `/about-3` | `/about-us.html` | |
| `/products` | `/products.html` | |
| `/general-1` | `/research-development.html` | Old R&D page |
| `/clients` | `/clients.html` | |
| `/iso-certifications` | `/iso-certifications.html` | |
| `/contact-8` | `/careers.html` | Old Careers page |
| `/contact-1` | `/contact-us.html` | Old Contact page |
| `/index.html` | `/` | Avoids a duplicate home URL |

Old exported file names (only matter if the files were ever published): `home.html` → `/`, `iso-cert.html` → `/iso-certifications.html`, `rnd.html` → `/research-development.html`, `contact.html` → `/contact-us.html`.

There is **no "Why UBDetsurf" page**: the original site did not have one, and its content would have had to be invented. The `/why-ubdetsurf.html` file suggested in the brief was therefore not created. If you want it, supply the real content and add it as a page.

For Netlify these are already in the `_redirects` file (the `/index.html` rule is left out: the home page's canonical address covers it). Test every old address on the temporary Netlify address before switching the domain.

## Apache (`.htaccess`)

```apache
RewriteEngine On
RewriteRule ^index\.html$ / [R=301,L]
RewriteRule ^about-3/?$ /about-us.html [R=301,L]
RewriteRule ^products/?$ /products.html [R=301,L]
RewriteRule ^general-1/?$ /research-development.html [R=301,L]
RewriteRule ^clients/?$ /clients.html [R=301,L]
RewriteRule ^iso-certifications/?$ /iso-certifications.html [R=301,L]
RewriteRule ^contact-8/?$ /careers.html [R=301,L]
RewriteRule ^contact-1/?$ /contact-us.html [R=301,L]
```

## Nginx

```nginx
location = /index.html          { return 301 /; }
location = /about-3             { return 301 /about-us.html; }
location = /products            { return 301 /products.html; }
location = /general-1           { return 301 /research-development.html; }
location = /clients             { return 301 /clients.html; }
location = /iso-certifications  { return 301 /iso-certifications.html; }
location = /contact-8           { return 301 /careers.html; }
location = /contact-1           { return 301 /contact-us.html; }
```

## Netlify / Cloudflare Pages (`_redirects`)

```
/index.html          /                          301
/about-3             /about-us.html             301
/products            /products.html             301
/general-1           /research-development.html 301
/clients             /clients.html              301
/iso-certifications  /iso-certifications.html   301
/contact-8           /careers.html              301
/contact-1           /contact-us.html           301
```

## After switching

1. Request each old URL and confirm one hop to a 200 page (`curl -sI https://www.ubdetsurf.com/about-3`).
2. Redirect `ubdetsurf.com` (no www) to `https://www.ubdetsurf.com/`, and HTTP to HTTPS.
3. In Google Search Console, submit `sitemap.xml` and inspect the home page.
4. Keep the redirects in place for at least a year.
5. Check whether the old Wix site had other URLs (blog posts, Wix-generated pages) in Search Console's Pages report and add them to the table.
