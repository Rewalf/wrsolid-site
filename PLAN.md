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
| Engagement | Fixed-scope projects and the "Technical Assessment" / "Diagnóstico técnico" (typically 1–2 weeks). Both fixed price, quoted after a first call; no prices on the site. |
| Market | Mexico plus remote Latin America, bilingual. |
| Language | Follow the browser language, Spanish as fallback. Spanish copy impersonal, *usted* as fallback. Tagline: "Built to Last." / "Hecho para durar." |

### Open questions
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
        - { label: Request an assessment, href: "#contact", style: primary }
    - type: services
      items:
        - { icon: cloud, title: Cloud Architecture & Migration, text: ..., extra: {...} }
  ```
- `content/<locale>/site.yaml` holds the navigation, header call to action, footer and contact email.
- `lib/content.ts` loads and validates the files with `zod`; `components/sections/index.tsx` is the registry.
- A registry maps each `type` to a component. Adding, removing or reordering sections is a content edit.
- Longer pages (privacy notice, any future articles) are Markdown files under `content/<locale>/`, with routes generated at build time.
- The schema validates the content during the build, so a typo fails the build instead of shipping an empty section.
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
- [x] Vector monogram (SVG) based on the upper-left mockup: navy, chalk, and single-colour versions (`design/logo/`).
- [x] Wordmark ("WR" regular, "SOLID" bold, green dot over the "O") plus horizontal and stacked lockups, outlined from Montserrat.
- [x] Favicon set (`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`) and a 1200×630 social preview image (`public/og-image.png`, both taglines).
- [x] One shared `<Logo>` component (`components/brand/Logo.tsx`) replacing the copies in `Navbar.tsx` and `Footer.tsx`.
- [ ] Per-language social preview images, if wanted (Phase 5; a static export needs them as separate files referenced from per-locale metadata).
- [ ] Optional: a professional designer pass on the monogram (stroke balance, the W's middle stem, 16 px rendering).

### Phase 3 — Content model and copy
- [x] `content/en|es/home.yaml` and `site.yaml`, a section registry and schema validation (§3).
- [x] Move all copy out of the components. `messages/*.json` now only holds UI labels (menu, language).
- [x] Write the copy in Spanish and English following `brand.md` §5.
- [x] Page sections:
  1. **Hero:** tagline, one-line value proposition, "Request an assessment" + "Services" buttons.
  2. **Services:** the four services; data & ETL listed inside Cloud.
  3. **How we work:** first call → assessment → proposal → delivery → handover, with AI-assisted delivery explained in a sentence.
  4. **Ways to engage:** fixed-scope project and assessment / review.
  5. **Principles:** the five identity attributes; SOLID can be a small visual here.
  6. **Experience:** industries served, technology groups (cloud, data, backend, frontend, DevOps) shown as a list, not logos.
  7. **About:** founder bio, 20+ years, Azure Solutions Architect Expert, name explanation (*We Are Solid — Somos sólidos* in Spanish), link to flaubertpm.com and LinkedIn.
  8. **Contact:** email call to action (the form is Phase 6).

### Phase 4 — UI redesign
Most of this landed with Phase 3, since the new sections were built in the new style.
- [x] Design tokens in `globals.css` for the palette, fonts and dark/light section tones. No inline styles or JS hover handlers.
- [x] Montserrat + Inter in place of Syne + Barlow.
- [x] Alternate dark and light sections.
- [x] Remove the fake code editor, dot grid, neon glows and giant background text.
- [x] `prefers-reduced-motion`, Esc to close the mobile menu, focus moved into and back out of it, visible focus outlines.
- [ ] Replace the generated stand-in texture (`.stone-texture` in `globals.css`) with a real, darkened slate photo in the hero and contact sections.
- [ ] Decide whether the hero shows the monogram (engraved on stone) or stays text-only.
- [ ] Full focus trap in the mobile menu and a contrast audit (Phase 7 Lighthouse run).
- [ ] Review the copy on the live page with fresh eyes; adjust wording in the YAML files.

### Phase 5 — Language, SEO and platform
- [ ] Root `/` picks the locale from the browser language (`navigator.languages`) and falls back to Spanish. Static Web Apps route rules can't branch on `Accept-Language`, so this runs client-side, with a `<noscript>` link to both languages. Update the `/` redirect in `staticwebapp.config.json` to `/es/`.
- [x] Per-locale title and description (from `home.yaml` `meta`), `hreflang` alternates and canonical URLs.
- [ ] Per-locale social preview image.
- [ ] `sitemap.xml` and `robots.txt`.
- [ ] Proper 404 status for unknown URLs (`responseOverrides` in `staticwebapp.config.json`; unknown URLs currently return 200).
- [x] Remove `BrandMessage.tsx` and the other old section components (the brand message is now the About quote). Starter SVGs in `public/` removed.
- [ ] Replace the template `README.md` (how to run, where content lives, how to regenerate the logo).

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
