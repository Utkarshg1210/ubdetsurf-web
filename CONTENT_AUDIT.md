# Content audit and open items

Everything on the rebuilt site comes from the original Wix pages, the Velo files or the certificates and photos you supplied. Nothing was invented. Where the source was missing, unverifiable or contradictory, the item is listed here for you to confirm. Nothing below blocks launch, but items marked **Decide** change what visitors read.

## A. Claims to confirm

| # | Item | What the site says now | Action |
|---|---|---|---|
| 1 | **"30+ years of expertise" vs "since 2009"** | The original home page showed "30+ Years of Expertise" while the About page says the company has worked in this field since 2009. These conflict (2009 is about 17 years). The rebuilt home page shows "2009 – working in agrochemical formulation ingredients since" instead. | **Decide.** If "30+ years" refers to the directors' experience (Umesh Gupta began in 1993; B.K. Gupta cites over four decades), say that explicitly and I'll reword it. |
| 2 | "100+ products manufactured" | Kept from the original home page. | Confirm the number. If you can't back it up, remove it. |
| 3 | "2 manufacturing units" | Kept from the original home page; Unit 3 is described as planned. | Confirm. |
| 4 | **Award** | "Emerging Company of the Year Award – Small Scale, PMFAI-SML Annual Agchem Awards, Dubai, 2026." The photo shows a backdrop for the "6th edition, 19 January 2026" event. | Confirm the exact award title and keep the certificate or organiser's announcement on file. The award is also stated in the Organization JSON-LD (`award`, in `index.html` and every page's head); remove it there if it cannot be verified. |
| 5 | **Leadership biographies** | Text and quotes are the originals. They include "Chief Operating Officer of the RR Group" (B.K. Gupta), "Sales Officer in 1993" and a trading enterprise founded in 1995 (Umesh Gupta). | Each director should read their own biography and approve it. |
| 6 | **Careers: training and mentorship** | The original said "continuous training, mentorship programs". The rebuild says "training and exposure to high-impact projects". | Confirm what actually exists. |
| 7 | **Export markets** | The original Clients page listed "Southeast Asia, Africa, Middle East, with international regulatory support". **Removed** because nothing else on the site or in the certificates supports it. | Supply evidence (or the list of countries) if you want it back. |
| 8 | **Response-time promises** | The original forms promised replies "within one business day" and HR replies "within 7–10 working days". **Removed**: they are commitments, and the forms no longer send anything themselves. | Re-add only if you will keep them. |
| 9 | **Unit 1 location vs certificate site** | All three ISO certificates name the manufacturing site as G-26, Hapur Road, Udyog Kunj, Ghaziabad. The site's address is Noida. | Confirm that Unit 1 is the Ghaziabad site and, if so, say so on the About page. |
| 10 | **Photo authenticity** | Some supplied photos (for example the drums in finished-goods storage and the production-floor vessels) have a very smooth, stylised look. They are used as real photographs of the company. | Confirm they are real photographs of your premises. Replace any that are not. |
| 11 | **Facilities without photos** | Manufacturing Unit 2 and the Noida office have no photograph; the original used stock images. | Supply real photos. |

## B. Content that was removed or replaced

- **All Unsplash stock photos** (leaf droplets, lab bench, team, field, crop). They are not UBDetsurf's own and implied facilities and people that may not be yours. Pages use real photos, a CSS pattern or no image.
- **Five hotlinked client logos** (Advance Agrolife, Agrow Allied Ventures, Acufine Lifesciences, Yogi Crop Sciences, Nathsagar Bio Genetics) were loaded from those companies' own websites, which is fragile and may not be permitted. They now appear as **text names**. **Action:** obtain the logos and permission to show them, or keep text.
- **Client logos in general:** the 22 logos are shown to identify existing customers. Confirm you have permission from each company.
- **"Request received / sent" messages** from the Wix forms (they claimed an enquiry or application was sent). The new forms only open the visitor's email app and say so.
- **File upload field** on Careers (a static page cannot receive files). The page tells applicants to attach their CV to the email.
- **Counters animating from 0** (they showed "0+" without JavaScript).

## C. Contact details

| Item | Status |
|---|---|
| infosales@ubdetsurf.com | Verified (original site). Used for **both** enquiries and careers. |
| scm@ubdetsurf.com | Verified (original Contact page). Shown as the supply-chain email only. |
| 0120-4136200, +91 9999422987, +91 9818009891 | From the original Contact page. |
| **HR / careers email** | **None exists.** The original Careers page sent CVs to infosales@. The site does the same. If you have an HR address, change `CAREERS_EMAIL` at the top of `js/main.js` and the static link in `careers.html`. |
| Social profiles | None on the original site, so none are linked and no `sameAs` is in the schema. |
| Address | Ithum, Tower-B, 1111A, Plot No. A-40, Sector-62, Noida, Uttar Pradesh – 201301 (original). |
| Google Maps | Link to a search for the address (original). No embedded map, so no third-party scripts or cookies. |

## D. Information the site does not have (so it is not on the site)

- Prices, minimum order quantities, lead times.
- Technical data sheets, safety data sheets, product specifications. The Products page therefore only lists product names and the molecules they are recommended for, and says dosages are shared on request.
- Company registration details (CIN, GST), founding year of the legal entity, employee count, production capacity.
- Any customer testimonials or case studies. None were published, none were written.
- Export statistics, countries served.
- A "Why UBDetsurf" page (see `URL_REDIRECTS.md`).

## E. Design note

The logo is a navy-blue square; the site follows the brief and keeps the original green-and-gold palette. Colours live in `css/variables.css`, so moving the site to a navy-led palette is a one-file change. Two contrast fixes were made to the original colours: gold text on white (`#c9a84c`, 2.3:1) is now `#8a6d1c`, and mid-green accent text uses `#2f7a58`.

## F. Fonts

Merriweather, Open Sans and DM Mono are self-hosted (SIL Open Font License; fontsource packages). The logo tagline uses Lucida Handwriting from the visitor's computer if available and falls back to a serif; it is not embedded because it is not freely licensable.
