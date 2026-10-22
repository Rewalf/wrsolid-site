# WRSolid Site — Completion Plan

The brand, services, audience and tone are defined in `brand.md` / `brand-es.md`. This file tracks the work to get the site there.

---

## 1. Where things stand

- Next.js 16 static export, deployed to Azure Static Web Apps (free tier) from `master`.
- Single landing page in English and Spanish (`/en/`, `/es/`) via `next-intl`, with English as the default.
- **Content source:** text is in `messages/en.json` and `messages/es.json`, but the page structure (section order, cards, icons, footer links, the code sample) is hard-coded in the components.
- The current copy has been cleaned of untrue claims and the tungsten concept (Phase 1), but it still follows the old page structure until the content rewrite.
- The logo, favicon and typography do not match the brand.

## 2. Decisions

| Topic | Decision |
| :--- | :--- |
| Concept | Drop tungsten. Use "solid foundations", with stone and structure in the visuals. |
| Accent colour | Signal Green `#2BD46F` (palette in `brand.md` §6). |
| Content | YAML/Markdown files in the repo, no CMS. |
| Claims | Only verifiable facts: 20+ years, Azure Solutions Architect Expert, industries worked in. |
| Positioning | Senior-led consultancy, always speaking as *WRSolid / we*. Team size is never mentioned. The About section shows the founder's name and bio (no photo) with a link to flaubertpm.com. Industries only, no employer names. |
| Company | Mexican company. |
| Email | `hello@wrsolid.com` works (catch-all for any `@wrsolid.com` address on Apple's custom email domain). |
| Services | Cloud Architecture & Migration (data & ETL as a supporting service), Custom Software, DevOps & CI/CD, Consulting. AI described as part of every service. |
| Engagement | Fixed-scope projects and assessments / reviews. |
| Market | Mexico plus remote Latin America, bilingual. |
| Language | Follow the browser language, Spanish as fallback. Spanish copy impersonal, *usted* as fallback. Tagline: "Built to Last." / "Hecho para durar." |

### Open questions
- [ ] How the assessment offer is presented on the site: its name (e.g. "Architecture Review", "Diagnóstico técnico"), a typical duration (e.g. "1–2 weeks"), and whether to show a starting price ("from MXN …") or only "fixed price, quoted after a first call".
- [ ] Legal name and details to show in the privacy notice (*Aviso de Privacidad*).

---

## 3. Content approach

- `content/<locale>/home.yaml` lists the page sections in order, with their data:
  ```yaml
  sections:
    - type: hero
      title: Software built to last.
      lead: ...
      actions:
        - { label: Book an assessment, href: "#contact", style: primary }
    - type: services
      items:
        - { icon: cloud, title: Cloud Architecture & Migration, text: ..., extras: [...] }
  ```
- A registry maps each `type` to a component. Adding, removing or reordering sections is a content edit.
- Longer pages (privacy notice, any future articles) are Markdown files under `content/<locale>/`, with routes generated at build time.
- A schema (e.g. `zod`) validates the content during the build, so a typo fails the build instead of shipping an empty section.
- `messages/*.json` keeps only UI strings (nav, buttons, language switcher, form messages).
- If a visual editor is ever needed, Sveltia CMS or Decap CMS can be added on top of the same files without a backend.

---

## 4. Work plan

### Phase 1 — Quick fixes on the live site
These are worth shipping before the redesign because the current site states untrue things.
- [x] Remove the "Azure Partner" and "ISO 27001 Ready" badges and the 99.99% / 99.9% figures.
- [x] Remove tungsten, "never fail", "unbreakable" and similar wording from the copy; Spanish copy uses *usted*.
- [x] Fix the `#framework` anchor (now on the SOLID section).
- [x] Footer capabilities shown as plain text instead of `href="#"` links; "Legal" removed until the privacy notice exists.
- [x] LinkedIn link removed from the footer until the company page exists.
- [ ] Create the WRSolid LinkedIn company page, then add it back to the footer.

### Phase 2 — Logo and identity assets
- [ ] Vector monogram (SVG) based on the upper-left mockup: navy, chalk, and single-colour versions.
- [ ] Wordmark ("WR" regular, "SOLID" bold, green dot over the "O") plus horizontal and stacked lockups.
- [ ] Favicon set (`icon.svg`, `favicon.ico`, `apple-icon.png`) and a 1200×630 social preview image in each language.
- [ ] One shared `<Logo>` component replacing the copies in `Navbar.tsx` and `Footer.tsx`.

### Phase 3 — Content model and copy
- [ ] `content/en|es/home.yaml`, a section registry and schema validation (§3).
- [ ] Move all copy out of the components.
- [ ] Write the copy in Spanish and English following `brand.md` §5.
- [ ] Proposed page sections:
  1. **Hero:** tagline, one-line value proposition, "Book an assessment" + "Services" buttons.
  2. **Services:** the four services; data & ETL listed inside Cloud.
  3. **How we work:** assessment → proposal → delivery → handover, with AI-assisted delivery explained in a sentence.
  4. **Ways to engage:** fixed-scope project and assessment / review.
  5. **Principles:** the five identity attributes; SOLID can be a small visual here.
  6. **Experience:** industries served, technology groups (cloud, data, backend, frontend, DevOps) shown as a list, not logos.
  7. **About:** founder bio, 20+ years, Azure Solutions Architect Expert, name explanation (*We Are Solid — Somos sólidos* in Spanish), link to flaubertpm.com and LinkedIn.
  8. **Contact:** short form + email.

### Phase 4 — UI redesign
- [ ] Design tokens in `globals.css` (`@theme`) for the new palette and fonts. Replace inline `style={{…}}` and the JS hover handlers with Tailwind classes.
- [ ] Montserrat + Inter in place of Syne + Barlow.
- [ ] Hero with a darkened stone texture and the monogram. Alternate dark and light sections.
- [ ] Remove the fake code editor, dot grid, neon glows and giant background text.
- [ ] Accessibility: `prefers-reduced-motion`, Esc and focus trap in the mobile menu, contrast checks.

### Phase 5 — Language, SEO and platform
- [ ] Root `/` picks the locale from the browser language (`navigator.languages`) and falls back to Spanish. Static Web Apps route rules can't branch on `Accept-Language`, so this runs client-side, with a `<noscript>` link to both languages. Update the `/` redirect in `staticwebapp.config.json` to `/es/`.
- [ ] Per-locale title, description and social preview image. `hreflang` alternates and canonical URLs.
- [ ] `sitemap.xml` and `robots.txt`.
- [ ] Proper 404 status for unknown URLs (`responseOverrides` in `staticwebapp.config.json`; unknown URLs currently return 200).
- [ ] Remove `BrandMessage.tsx` (unused, causes the lint error) or turn it into the About quote. Delete the starter SVGs in `public/` and replace the template `README.md`.

### Phase 6 — Contact and legal
- [ ] Contact form through a Static Web Apps managed Azure Function (free tier) or a form service such as Formspree, with spam protection. Keep the email link as a fallback.
- [ ] Privacy notice page in Spanish and English. As a Mexican company collecting personal data through the form, WRSolid needs an *Aviso de Privacidad* under the federal data protection law (LFPDPPP). Link it from the form and the footer.

### Phase 7 — Launch checklist
- [ ] Lighthouse ≥ 95 on mobile for performance, accessibility and SEO.
- [ ] Test on phone widths, both languages, and with the keyboard only.
- [ ] Privacy-friendly analytics, if wanted (Plausible, Umami or Cloudflare Web Analytics; no cookie banner needed).
- [ ] Google Search Console: submit the sitemap.

### Related: consistency with flaubertpm.com and LinkedIn
Clients will compare the WRSolid About section with the personal site and LinkedIn. To fix:
- [ ] **Years of experience:** use 20+ everywhere (work history starts in 2005).
- [ ] **Certification:** Microsoft Certified: Azure Solutions Architect Expert is not listed on flaubertpm.com.
- [ ] **Location:** flaubertpm.com says New York; WRSolid is a Mexican company serving Mexico and Latin America. Decide what each site shows.
- [ ] **Availability:** flaubertpm.com says "Available for opportunities" and open to full-time roles, which reads oddly next to a consultancy. Point consulting enquiries to WRSolid instead.
- [ ] **Title:** flaubertpm.com shows "Software Architect" as headline but "Systems Analyst" as current role. Align with "Founder & Software Architect, WRSolid".
- [ ] **Link:** flaubertpm.com does not mention or link to WRSolid.
- [ ] **Client names:** flaubertpm.com lists employers and client logos, while WRSolid shows industries only. This is intentional, but check that the logos are cleared for public use.
