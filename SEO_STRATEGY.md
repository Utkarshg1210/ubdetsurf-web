# SEO, AEO and GEO strategy for ubdetsurf.com

This document explains what was built into the site, how to measure it and what to do each week, month and quarter. **No ranking, traffic or conversion targets are given.** A new site has no baseline, so any target would be a guess. Section A tells you how to create the baseline; set targets after 8–12 weeks of data.

**Terms.** SEO = being found in search engines. AEO (answer-engine optimisation) = being the direct answer shown in snippets, "People also ask" and voice answers. GEO (generative-engine optimisation) = being accurately described and cited by AI assistants. There is no switch that guarantees any of the three. The work is: accurate content, clear structure, a fast, crawlable site and a reputation that exists beyond your own website.

---

## What the build already does

| Area | Implementation |
|---|---|
| Crawlability | Static HTML, all content in the HTML (no JavaScript needed to read it), `robots.txt` allows everything and points to `sitemap.xml`, 8 canonical URLs, no `noindex` anywhere. |
| Page metadata | Unique `<title>` and meta description, HTTPS canonical on `https://www.ubdetsurf.com/`, Open Graph and Twitter tags with a 1200×630 image per page, `lang="en-IN"`. |
| Structure | One `<h1>` per page, no skipped heading levels, breadcrumbs on every inner page, descriptive link text, internal links between related pages. |
| Structured data | JSON-LD: `Organization` (with address, phones, emails, area served (India), knowsAbout and the Dubai award, which should be verified, see `CONTENT_AUDIT.md`), `WebSite`, page type (`AboutPage`, `ContactPage`, `CollectionPage`, `WebPage`), `BreadcrumbList`, `FAQPage` on pages with a visible FAQ, `ItemList` for formulation types. **Deliberately absent:** `Product` (no prices or reviews exist), `Review`/`AggregateRating`, `sameAs` (no verified social profiles), `foundingDate` for the legal entity, `hasCertification` (certificate bodies not modelled). |
| Images | AVIF + WebP, explicit width and height, descriptive file names and alt text, lazy loading except the home hero (eager, `fetchpriority="high"`, preloaded). |
| Performance | Self-hosted fonts with `font-display: swap`, preloaded; no frameworks; no third-party scripts; CSS split into four files; no layout shift from fonts (CLS 0 in the Lighthouse run). |
| AEO | Direct-answer opening paragraphs, FAQ blocks with genuine questions on Home, Products, R&D and Certifications, real HTML tables for the 6 molecule recommendation lists, a fact sheet on the About page. |
| GEO | Consistent naming ("UBDetsurf Industries Pvt. Ltd."), one fact sheet, factual unambiguous sentences, `llms.txt` with only verified facts. `llms.txt` is a convenience file; no major search or AI provider has committed to using it as a ranking or citation signal, so it is not part of the plan's success measures. |

## Keyword map (one primary theme per page, to avoid cannibalisation)

| Page | Primary theme | Supporting phrases used naturally in the copy |
|---|---|---|
| `/` | Agrochemical surfactants and adjuvants manufacturer | emulsifiers, wetting and dispersing agents, Noida |
| `/products.html` | Pesticide formulation surfactants and adjuvants | EC, EW, SC, SL, WP, WDG, SG formulation emulsifiers; molecule recommendations |
| `/research-development.html` | Agrochemical formulation R&D support | stability testing, formulation scale-up, custom surfactants |
| `/about-us.html` | UBDetsurf Industries company profile | specialty chemicals since 2009, directors, facilities |
| `/clients.html` | Agrochemical companies supplied in India | customers, formulators |
| `/iso-certifications.html` | ISO 9001, 14001, 45001 certificates | quality management, certificate numbers |
| `/careers.html` | Careers, agrochemical jobs in Noida | formulation chemist, QC analyst |
| `/contact-us.html` | Contact UBDetsurf | enquiry, technical consultation |

Rule: if a new page targets a theme above, extend that page or link to it instead of writing a second page on the same theme.

---

## A. Baseline measurement (do this in week 1, before or on launch day)

Without a baseline you cannot tell whether anything worked. Record all of these in a spreadsheet with the date.

1. **Verify the site in Google Search Console** (domain property, DNS TXT record). Submit `https://www.ubdetsurf.com/sitemap.xml`.
2. **Verify in Bing Webmaster Tools** (it can import from Search Console). Bing data also feeds several AI assistants.
3. **Install privacy-respecting analytics** of your choice (GA4, Plausible or similar) and consider whether a cookie banner is required for your audience. The site ships with no analytics.
4. **Capture the old Wix site's numbers if you still have access:** impressions, clicks, top queries and top pages for the last 12 months. This is the only true "before" you have.
5. **Record current rankings** for 20–30 queries you care about (see C), in a private/incognito window with location set to India.
6. **Run PageSpeed Insights** (mobile) on every page and record LCP, INP, CLS.
7. **Run the AI prompt test** (see E) once and save the answers verbatim.
8. **Count what exists:** indexed pages (`site:ubdetsurf.com`), referring domains (Search Console → Links), Google Business Profile status.

## B. Tools (free first)

| Need | Free | Paid (only when free is outgrown) |
|---|---|---|
| Indexing, queries, clicks, errors | Google Search Console, Bing Webmaster Tools | none needed |
| Traffic and conversions | GA4, Plausible (self-host) | Plausible cloud, Matomo cloud |
| Speed and Core Web Vitals | PageSpeed Insights, Lighthouse (Chrome DevTools), Search Console CWV report, CrUX | DebugBear, SpeedCurve, Calibre |
| Rank tracking | Search Console average position, manual checks | Semrush, Ahrefs, SE Ranking, Mangools |
| Keyword research | Search Console queries, Google autocomplete, "People also ask", Google Trends | Semrush, Ahrefs, Keyword Planner (needs an Ads account) |
| Backlinks | Search Console → Links, Bing Webmaster | Ahrefs, Semrush, Majestic |
| Crawl / technical audit | Screaming Frog free (500 URLs), Lighthouse | Screaming Frog paid, Sitebulb |
| Structured data | Rich Results Test, Schema Markup Validator | none |
| AI visibility | manual prompt testing (E) | Otterly, Profound, Peec AI and similar (still immature; treat results as directional) |
| Local presence | Google Business Profile | none |

## C. Keyword tracking

1. Build a list of **20–30 queries** across four groups: *product* ("EC emulsifier for pesticide formulation", "wetting agent for WDG"), *problem* ("EC formulation stability problem", "SC suspension caking"), *company* ("UBDetsurf", "UBDetsurf Industries Noida"), *buyer* ("agrochemical surfactant manufacturer India"). Use only terms real customers use; confirm them against the Search Console queries once data exists.
2. Record, monthly: query, landing page, impressions, clicks, average position (Search Console), plus a manual check of the top-3 results.
3. Review by **page**, not by keyword. For each page ask: do its top queries match its theme (keyword map above)? If a page ranks for another page's theme, fix the internal links and titles.
4. Branded queries ("UBDetsurf …") should appear first and rank #1. If they do not after 4 weeks, check indexing and canonicals before anything else.

## D. Performance monitoring

- **Targets already defined by Google** (these are published thresholds, not invented ones): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile of real visits.
- Lab test at hand-over (Lighthouse, mobile emulation, local server): Performance 91–100, Accessibility 100, Best Practices 100, SEO 100 on the pages tested; CLS 0. These are lab figures, not real-user data. Re-test on the live domain after hosting is set up.
- Real-user data appears in Search Console → Core Web Vitals after about 28 days and enough traffic. Until then, rely on PageSpeed Insights.
- Re-test after **any** change to images, fonts, CSS or JS. The most common regression is a large new image without width/height or `loading="lazy"`.
- Confirm hosting sends compression (Brotli/gzip), long-cache headers for `/assets/`, `/css/`, `/js/` and `Cache-Control` revalidation for HTML (see `README.md`).

## E. AEO and GEO monitoring: prompt-testing framework

AI assistants do not publish rankings. The only honest measure is to ask them.

**Test set (20 prompts, fixed, so months are comparable):**
- *Brand (5):* "What is UBDetsurf Industries?", "Where is UBDetsurf Industries located?", "What does UBDetsurf Industries manufacture?", "Is UBDetsurf Industries ISO certified?", "Who are the directors of UBDetsurf Industries?"
- *Category (10):* "Who makes surfactants for agrochemical formulations in India?", "Indian manufacturers of emulsifiers for EC pesticide formulations", "Wetting and dispersing agents for WDG formulations: suppliers in India", and similar, written the way a formulation chemist would ask.
- *Problem (5):* "How do I improve emulsion stability in an EC formulation?" etc. These test whether your explanatory content is used.

**How to run:** monthly, in ChatGPT, Gemini, Perplexity, Microsoft Copilot, Claude and Google (AI Overviews / AI Mode), logged out where possible, same wording each time. Record for each answer: (1) is UBDetsurf mentioned? (2) are the facts right? (3) is the website cited? (4) which competitors appear? (5) the date and the tool's name/version.

**Scoring (simple):** *mention rate* = prompts with a mention ÷ prompts asked; *accuracy* = facts correct ÷ facts stated; *citation* = prompts citing ubdetsurf.com ÷ prompts asked. Track the three numbers over time; do not set a target until you have 3 months of data.

**If an answer is wrong:** find where the wrong fact comes from (usually an old directory listing or the old Wix site). Correct the source, make sure the right fact is stated plainly on your own site, and re-test in 4–6 weeks. You cannot edit an AI's answer directly.

**Things that help (none guaranteed):** consistent company name and address everywhere (site, Google Business Profile, IndiaMART/Alibaba/LinkedIn, trade directories); facts stated in plain sentences; pages other reputable sites link to or quote; accurate third-party listings. **Things to avoid:** fake reviews, fake mentions, buying links, hidden text, mass-produced pages. They are against the platforms' rules and can get the site removed.

## F. Content roadmap (only topics you can answer truthfully)

Order by how directly the content answers buyer questions. Each item needs input from your technical team; do not publish text the team has not checked.

1. **Technical data / safety documents:** a downloadable data sheet per product (or product family) once approved. This is the biggest gap on the site and the most useful content for buyers.
2. **Problem-solving guides** written by R&D: "Why EC formulations cloud on dilution and how emulsifier choice affects it", "Preventing caking in SC formulations", "Choosing a wetting agent for WDG". One page per question, with a named author from your R&D team.
3. **Formulation-type pages** (EC, EW, SC, SL, WP/WDG, SG) that go deeper than the current tables: what the type is, typical emulsifier/dispersant roles, which UBDetsurf products apply. Move the tables to link to these.
4. **Glossary** (surfactant, HLB, emulsifier, dispersant, adjuvant, tank-mix additive): short, accurate definitions that link to the product pages.
5. **Case studies**, only with a customer's written permission and real numbers.
6. **Company news** (awards, exhibitions) with dates, photographs and the organiser's link. This helps with verification (see CONTENT_AUDIT item 4).
7. **Hindi pages** if your buyers search in Hindi (check Search Console queries first).

Each new page needs: unique title and description, one H1, canonical, a sitemap entry, JSON-LD (`WebPage` + `BreadcrumbList`; `Article` only for dated, signed articles), links from at least two existing pages.

## G. Backlink strategy (earn them; never buy them)

Links from relevant, reputable sites matter, and a new domain starts with none of the old Wix site's authority (the redirects in `URL_REDIRECTS.md` preserve what exists).

1. **Fix what exists first:** search for "UBDetsurf" and your name variants; correct wrong addresses/phones on every listing so they match the site exactly.
2. **Business listings that are real:** Google Business Profile, LinkedIn company page, IndiaMART, TradeIndia, Alibaba, Kompass, industry association directories (e.g. the associations whose events you attend), government/export-promotion directories you qualify for.
3. **Trade press and events:** exhibitions and awards you have actually attended (the Dubai award is a good example) usually publish exhibitor lists and winner lists with links; ask for them to link to your site.
4. **Customers and partners:** ask a customer if their "approved suppliers" or "partners" page can name and link to you (only with their agreement).
5. **Expert content:** R&D articles in trade magazines and association newsletters with a byline and link.
6. **Do not:** buy links, join link exchanges, comment-spam, or create directory profiles that no one will ever read. One relevant link is worth more than fifty irrelevant ones.

Track: number of referring domains (Search Console), which are relevant to agrochemicals, and any link that points to an old URL that is not redirected.

## H. Action plan

**Weekly (about 30 minutes)**
- Search Console: new errors (Pages report), manual actions, security issues.
- Check the contact email inbox the forms send to; reply times affect leads more than rankings.
- Look at the top 5 queries and any sudden drop.

**Monthly (about 2 hours)**
- Update the keyword spreadsheet (C) and the prompt-test log (E).
- Run PageSpeed Insights on Home, Products and one inner page; compare with the baseline.
- Review analytics: sessions, top landing pages, form/mailto clicks (add event tracking if you install analytics).
- Fix broken links (Screaming Frog free) and check that `sitemap.xml` lists every live page with a current `lastmod`.
- Publish or update one piece of content from F.
- Ask one customer or partner for a link or mention (G).

**Quarterly**
- Review the keyword map: any page competing with another? Any theme with no page?
- Re-read every page for facts that have changed (units, products, certificates, address, phone, award).
- Check certificate validity dates (current certificates expire 28 July 2029) and update the Certifications page.
- Review competitors' sites for formats you lack (data sheets, FAQ depth) without copying text.
- Review the Core Web Vitals report in Search Console.

**Annually**
- Full technical audit (crawl, structured data, accessibility, security headers).
- Review and refresh the company fact sheet and `llms.txt`; renew domain and TLS certificates; check fonts/licences.
- Re-assess the palette, imagery and copy against the brand; replace placeholder-quality photos with new photography.
- Re-run the AI prompt test with a new set alongside the old one.

## I. Troubleshooting

| Symptom | Check first |
|---|---|
| A page is not indexed | Search Console → URL Inspection: is it "Crawled – currently not indexed" (quality/duplicate) or "Discovered" (crawl budget/links)? Confirm no `noindex`, canonical points to itself, page is in the sitemap, and at least two internal links point to it. Do not spam "Request indexing". |
| Wrong title/description in results | Google may rewrite them. Make sure the title matches the page's H1 topic and the description summarises the page. Allow weeks for re-crawl. |
| Traffic drop after launch | Missing/incorrect 301 redirects (`URL_REDIRECTS.md`), `robots.txt` blocking, `www`/non-www duplication, HTTP not redirecting to HTTPS. |
| Rich result lost | Run the Rich Results Test; the FAQ markup must match visible FAQ text exactly. |
| Slow LCP | Hero image served at the wrong size, missing compression/caching at the host, a new large image, a new third-party script. |
| CLS spikes | New images without width/height, a font change without preloading, injected banners. |
| Mailto forms "do nothing" | The visitor has no email app configured. The page offers a "copy message text" button and the visible address. If this is common, move to a form service or a server endpoint (a deliberate trade-off: it adds a third party and privacy duties). |
| Brand name in AI answers is wrong | See E: fix the source, restate the fact on-site, re-test. |
| Duplicate content warnings | Check that `index.html` redirects to `/`, that only one of www/non-www resolves, and that no old Wix domain is still live. |

## J. KPI reporting template

Copy monthly. Fill in only numbers you actually measured; leave blanks rather than estimating.

```
UBDetsurf – SEO / AEO / GEO report – [Month YYYY]
Prepared by: ______   Data sources: Search Console, analytics, PageSpeed, manual prompt tests

1. Visibility (Search Console, last 28 days vs previous 28)
   Impressions: ___ (Δ ___)   Clicks: ___ (Δ ___)   Avg. position: ___ (Δ ___)
   Branded clicks: ___   Non-branded clicks: ___
   Pages indexed: ___ of 8   Pages with errors: ___

2. Top 5 queries / top 5 pages (name, clicks, impressions, position)

3. Engagement (analytics)
   Sessions: ___   Engaged sessions: ___   Enquiry/careers email-draft clicks: ___
   Phone and email link clicks: ___

4. Performance (PageSpeed mobile; field data if available)
   Home LCP/INP/CLS: ___ / ___ / ___    Products LCP/INP/CLS: ___ / ___ / ___
   Core Web Vitals status in Search Console: Good / Needs improvement / Poor

5. AEO / GEO prompt test (20 prompts, [date])
   Mention rate: ___%   Factual accuracy: ___%   Citation of ubdetsurf.com: ___%
   Wrong facts found: ______   Source of wrong fact: ______

6. Authority
   Referring domains: ___ (Δ ___)   New relevant links: ______   Lost links: ______

7. Content shipped this month: ______      Planned next month: ______

8. Issues and decisions needed: ______
```
