# Socials Launch — change log & revert guide

This launch made `/` the marketing landing for the **Socials** product and moved the
existing **DelegateHQ agency** site to `/agency`. All DelegateHQ pricing was hidden (commented
out, never deleted). The change is designed to be fully reversible.

Every edit that hides pricing or retargets the old home is tagged with the marker
**`SOCIALS-LAUNCH`** in the code. To find them all:

```bash
grep -rn "SOCIALS-LAUNCH" src
```

---

## What changed

### New files (delete these to revert)
- `src/app/agency/page.tsx` — the old homepage, moved here verbatim (minus the `<Pricing />` render).
- `src/app/agency/layout.tsx` — preserves the original DelegateHQ SEO metadata for `/agency`.
- `src/components/socials/` — the entire Socials landing (self-contained):
  - `SocialsNav.tsx`, `SocialsBookCallModal.tsx`, `SocialsHero.tsx`, `VideoCarousel.tsx`,
    `PromoVideo.tsx`, `Pipeline.tsx`, `Features.tsx`, `Trust.tsx`, `SocialsCTA.tsx`,
    `SocialsFooter.tsx`, `videos.ts`.
- `public/videos/socials-1.mp4 … socials-7.mp4` — compressed ambient vertical clips (from Pexels).
- `public/videos/socials-promo.mp4` — **not yet added**. The product demo/promo video. The
  `PromoVideo` player shows a graceful "coming soon" state until this file exists.
- `SOCIALS_LAUNCH.md` — this file.

### Edited files
- `src/app/page.tsx` — replaced the agency homepage with the Socials landing. (Original body
  now lives in `src/app/agency/page.tsx`.)
- `src/app/layout.tsx` — root metadata now describes Socials. Original metadata preserved in
  `src/app/agency/layout.tsx`.
- `src/components/Navigation.tsx` — `isHome` now matches `/agency`; logo links to `/agency`;
  "Pricing" desktop button, mobile "Pricing" link, and mega-menu price + trial badge commented out.
- `src/components/Footer.tsx` — `isHome` now matches `/agency`; logo links to `/agency`;
  "Pricing" link commented out.
- `src/components/sections/Divisions.tsx` — "See plans" (→ `#pricing`) replaced with "Book a
  call" (→ `#cta`); trial copy softened.
- `src/components/DivisionPage.tsx` — `<PricingSection>` no longer rendered (component kept,
  eslint-disabled); back-link → `/agency`; hero + CTA "See pricing" buttons replaced; trial copy softened.
- `src/components/sections/CTASection.tsx` — "Start free trial" (→ `#pricing`) → "Book a call"
  (cal.com); trial subheadline and "No credit card required" chip softened.
- `src/components/sections/Hero.tsx` — "₹20k Starting Monthly" stat replaced with "7 days To Go Live".
- `src/components/sections/FAQ.tsx` — pricing language removed from the "outside India" answer
  (original preserved in a comment above it).

### Untouched (data preserved)
- `src/lib/divisions.ts` — all per-division pricing data intact.
- `src/components/sections/Pricing.tsx` — the agency pricing section component, intact but no
  longer imported/rendered anywhere active.

---

## How to revert

1. **Restore the homepage:** copy the body of `src/app/agency/page.tsx` back into
   `src/app/page.tsx` (re-add the `<Pricing />` import + render), then delete the `src/app/agency/` folder.
2. **Un-hide pricing:** for every `SOCIALS-LAUNCH` marker in the files above, restore the original
   code shown in the adjacent comment (uncomment the pricing blocks, revert the retargeted buttons/copy,
   remove the eslint-disable lines in `DivisionPage.tsx`).
3. **Restore metadata:** move the metadata from `src/app/agency/layout.tsx` back into
   `src/app/layout.tsx`, then delete `src/app/agency/layout.tsx`.
4. **Delete Socials assets:** remove `src/components/socials/`, `public/videos/socials-*.mp4`,
   and this file.
5. Run `npm run build` to confirm a clean revert.

---

## Functional CTAs (Book a call + Request access)
- **Request access** posts to `src/app/api/socials/request-access/route.ts`, which emails the
  submission via **Resend**. Set these in `.env.local`:
  - `RESEND_API_KEY` — from https://resend.com (until set, the form falls back to a `mailto:`).
  - `SOCIALS_REQUEST_TO` — where requests are delivered.
  - `SOCIALS_REQUEST_FROM` — sender (`onboarding@resend.dev` for testing; a verified domain for prod).
- **Book a call** is a two-view modal: a scheduler **embedded inline via iframe** (default)
  and the request-access form (tab). Set `NEXT_PUBLIC_BOOKING_URL` to a real **booking page**
  (e.g. `https://cal.com/yourname/30min` or a Calendly event link) — the embed auto-themes for
  Cal.com/Calendly. The root `https://cal.com` placeholder will not embed; use a real event URL.
  The same env var also drives the agency `CTASection.tsx` / `DivisionPage.tsx` "Book a call" links.

## TODO before public launch
- Add `RESEND_API_KEY` and a real `NEXT_PUBLIC_BOOKING_URL` to `.env.local` (and to the host's
  env vars in production).
- For production email, verify a sending domain in Resend and set `SOCIALS_REQUEST_FROM` to it.
- Drop the real promo video at `public/videos/socials-promo.mp4`.
