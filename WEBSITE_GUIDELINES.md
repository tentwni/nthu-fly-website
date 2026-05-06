# NTHU-FLY · Website Design Guidelines

> A constraint document for anyone building, editing, or extending the NTHU-FLY iGEM website. This document defines **how** to design, not **what** to design. Add new sections, rewrite copy, swap imagery — but stay inside these rules.

---

## 1. Brand & Tone

- **Team name:** Always `NTHU-FLY` (hyphenated, all caps). Never `NTHU FLY`, `NthuFly`, or `NTHUFly`.
- **Project descriptor:** "Bio-Digital Olfactory System" or 「仿生嗅覺邊緣運算系統」.
- **Voice:** Confident, technical, sober. Avoid hype words ("revolutionary," "game-changing"). Prefer concrete claims with numbers (ppb, °C, module count).
- **Aesthetic target:** Editorial monochrome — a science research project presented like a contemporary design-agency case study. Reference benchmarks: **obys.agency** (work pages), **brand.ivress.co.jp**, **Pentagram** case studies, **Bureau Borsche**. Pure black + pure white, asymmetric editorial layout, scroll-driven motion, generous whitespace. The voice is still a research lab — but the visual argument is closer to a gallery exhibit than a product website. **Not** a hackathon project, **not** a SaaS landing page, **not** cyberpunk/terminal, **not** a developer tool.
- **Languages:** Traditional Chinese is primary content; English is acceptable for technical terms, headings, and labels. Do not auto-translate one into the other inline — pick one per element.

---

## 2. Audience

The site is written for three distinct readers. Every page should make sense to all three without compromising any one of them.

### 2.1 iGEM judges (primary)

- Read fast and scan for technical credibility.
- Look for: clear research methodology, novelty, evidence of execution, well-defined milestones.
- Will visit the site in batches alongside many other teams' sites — first impression in **under 5 seconds** matters.
- **Implication:** Hero must communicate *what* and *why* immediately. Technical depth should be reachable in one or two scrolls. Don't bury the science.

### 2.2 Biotech industry professionals (primary)

- Assess commercial viability, scientific rigor, and team competence.
- Recognize quality and recognize fluff — a polished design with hollow content fails them.
- Often arrive via shared link (LinkedIn, conference, Slack DM), so deep links to specific sections must work.
- **Implication:** Don't dilute technical claims for "accessibility." Provide depth (mechanism, references, limitations) for those who scroll. Anchor links and clean URLs are non-negotiable.

### 2.3 iGEM / biotech students (secondary)

- Browsing for inspiration, references, and networking opportunities.
- Will spend longer on the site if it's beautiful and educational.
- May not have read every paper we cite — appreciate plain-language summaries alongside technical content.
- **Implication:** Pair every dense technical block with at least one plain-language line. Make the site visually inspiring (this is where Apple-tier polish pays off). Provide visible Contact / Wiki / GitHub paths for outreach.

### 2.4 What this means for design choices

- **Density:** technical, but with whitespace. Never wall-of-text.
- **Tone:** don't talk down. Students will Google what they don't know. Judges will skip what they already know.
- **Visuals:** the site should feel like something a student would screenshot for their own moodboard.
- **No personas excluded:** if a section serves only one audience, ask whether the other two get something out of seeing it.

---

## 3. Design Principles (non-negotiable)

These come from condensed UX guidance and apply to every page or component.

1. **Visual hierarchy beats decoration.** Make the single most important thing on a page big and bold; turn the volume down on everything else. If three things look equally important, none of them is.
2. **Conversion over prettiness.** Every page must answer "who we are" and "what should the visitor do next." A pretty page that doesn't lead somewhere is a failure.
3. **Reduce friction, increase scannability.** Short paragraphs. Generous whitespace. Clear CTAs. Headlines users can skim.
4. **Design for the audiences in Section 2 — not for ourselves.** When in doubt, simpler wins.
5. **High contrast, always.** If you have to squint to read it, it fails accessibility.

---

## 4. Color System — Pure Monochrome

The palette is binary. Pure black, pure white, and a small set of greys for non-content surfaces. Color is a tool we have explicitly chosen not to use.

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--white` | `#FFFFFF` | Default page background. Section fills. Body text on dark inversions. |
| `--black` | `#000000` | All headings, all body text on light, primary buttons, dark inversion sections. |
| `--ink-90` | `#0A0A0A` | Practically black — reserved for very rare cases where pure black causes a halo against bright displays. Use sparingly. |
| `--ink-50` | `#7A7A7A` | Muted text only — eyebrow labels, captions, metadata. Never for body copy. |
| `--ink-20` | `#D9D9D9` | Hairline borders, dividers, very faint UI lines. |
| `--ink-08` | `#F2F2F2` | Optional alternate section background to break long stretches of pure white. Use sparingly — this is the only off-white permitted. |
| `--accent-live` | `#14CC61` | **One** specific use only: a single status/live indicator dot (e.g. eyebrow pulse). Not for CTAs, not for links, not for backgrounds. If the site reads as B&W with one tiny green pulse somewhere, that's correct. |

### Allocation rule

- **~95% Black + White.** The page should read as a binary composition. Nothing softens that.
- **~4% Greys.** `--ink-50` for muted captions/labels. `--ink-20` for hairline borders. `--ink-08` only as an alternate section fill when needed for rhythm.
- **~1% Live accent.** A single emerald pulse dot somewhere on the page (typically the hero status chip). That's it. Everywhere else, links and CTAs are black-on-white or white-on-black — not green.

### Hard rules

- **Pure `#000000` and `#FFFFFF` are correct.** This reverses the prior guideline and is intentional — the editorial reference is obys.agency.
- **Never** introduce a chromatic accent beyond the single `--accent-live` dot. No blues, oranges, purples, or muted teals. If you reach for color to differentiate something, you have probably failed to differentiate it with hierarchy first.
- **Never** use gradients of any kind on text, backgrounds, or borders. Gradients soften — we do not soften.
- **Section inversions** (full black sections with white text) are encouraged for rhythm. Inversion is the new alternation. A typical page might be 70% white, 30% black sections.
- **Color photography is permitted but should be desaturated to grayscale.** Treat all imagery as if for a black-and-white photo book. No exceptions.
- **Drop shadows are forbidden.** Lift in B&W is achieved through borders and whitespace, not shadow.

---

## 5. Typography

### Type stack

| Use | Family | Notes |
|---|---|---|
| Editorial display (H1, large H2) | `Fraunces` (variable, opsz 144, soft 100) | Used **only** for the largest editorial moments — hero H1, occasional showcase H2. The serif anchors the editorial mood. Italic permitted for emphasis on display only. |
| Latin body & UI | `Inter` | Weights 300–900. Use for everything that isn't a display headline. |
| 中文 body & UI | `Noto Sans TC` | Loaded alongside Inter for transparent CJK fallback |
| Code / technical labels | `JetBrains Mono` | Module IDs, units, version stamps, eyebrow labels |

### Hierarchy

| Level | Size (approx.) | Weight | Use |
|---|---|---|---|
| H1 | `clamp(3rem, 9vw, 8rem)` | Fraunces 400–500 (display) | One per page max. Lean into editorial scale — bigger than feels safe. |
| H2 | `clamp(2rem, 5vw, 4.5rem)` | Fraunces 400 (display) or Inter 800 | Section openers. Mix is fine — pick one per section consistently. |
| H3 | `~1.4rem` | Inter 700 | Card titles, sub-points. Never serif at this size. |
| H4 (eyebrow) | `0.74rem` uppercase, mono | JetBrains Mono 500, tracked `0.16em` | Section labels (`// Abstract`, `// Modules`). Black on white, white on black. |
| Body | `~1rem`, line-height 1.7 | Inter 400 | Max-width 65ch. Never edge-to-edge text. |
| Muted | inherit size | Inter 400, `--ink-50` | For captions, metadata, secondary labels only. |

### Hard rules

- **One H1 per page**, period.
- **Body text below 14px is forbidden.** Readability beats density.
- **Letter-spacing:** Fraunces display headings can run with default or slightly negative tracking (`-0.02em` max). Inter headings stay tight (`-0.025em`). Body default. Mono eyebrows tracked positive (`0.14em–0.18em`).
- **Decorative fonts beyond the type stack are forbidden.** Don't add a third typeface for "fun." The Fraunces ↔ Inter ↔ Mono triad is the entire toolkit.
- **Don't bold inside paragraphs to "emphasize."** If something is that important, pull it out.
- Avoid sentence-case headlines mixed with title-case headlines on the same page. Pick one.
- Italic Fraunces is permitted on display-size text only — never in body.

---

## 6. Layout & Spacing

- **Max content width:** `1280px`. Most content snaps to this. Display headlines may break out wider for editorial impact.
- **Asymmetric grid is the default.** A 12-column grid is in play, but content does not have to fill it. Place a paragraph in columns 7–11 against an empty 1–6. Place an image in columns 2–6 with a caption in column 8. Negative space is the strongest design element on the page.
- **Section vertical rhythm:** `160px` desktop, `100px` mobile between major moments. Larger than feels safe.
- **Whitespace is content.** When in doubt, add more.
- **Section rhythm comes from black/white inversion**, not from gentle background shifts. Stack white → black → white → black to create chapters. Hairline dividers (`1px var(--ink-20)` on white, `1px rgba(255,255,255,0.18)` on black) are permitted between subsections.
- **Mobile-first.** Every layout must collapse cleanly to one column at ≤ 900px and stay readable at ≤ 360px. Asymmetric desktop layouts collapse to centered single-column on mobile — don't force the asymmetry through.

---

## 7. Components

### Buttons

- **Primary CTA:** solid `--black` on white sections, solid `--white` on black sections. Text is the inverse. Hover inverts (white → black or black → white) with a 200ms transition. **No ghost buttons** in the disappearing sense, but underlined text-link CTAs are now a permitted style alongside solid buttons (an editorial move, not a "ghost button" — the text is high-contrast and clearly clickable).
- **Secondary CTA:** an underlined text link in the body color, with an arrow glyph. Used at most once per primary.
- **Pill or rectangular?** Both permitted. Rectangular `border-radius: 0` is now on-brand for editorial moments. Pill `999px` is on-brand for chip-style CTAs. Pick one per page and commit.
- Never have more than two buttons grouped together. If you need three, you need to rethink the section.

### Cards

- Background: white on white sections, black on black sections (i.e. the section background). Border: `1px solid var(--ink-20)` on white, `1px solid rgba(255,255,255,0.18)` on black.
- Radius: `0` (preferred for editorial mood) or up to `8px` for softer moments. Pick one per page.
- Hover: a subtle translateY(-2px) lift + border color shift toward full black/white. **No drop shadows.** No glows. No accent borders.

### Tags / Pills

- `JetBrains Mono`, `0.74rem`, current text color, transparent fill, `1px solid currentColor` at 35% opacity outline.
- Use for tech keywords (`HEK293T`, `LSH`, `GCaMP6`). Don't use for marketing words.

### Iconography

- **No emoji.** Ever.
- Stroked SVG icons at `1.25–1.5px` weight, `currentColor`, no fill. They invert with the section automatically.
- Single-glyph mono characters (`A`, `B`, `M·01`) inside thin square outlines work too.
- No filled icons. No multicolor icons. No icon libraries with rounded "friendly" styling.

### Imagery

- **All photography is converted to grayscale.** Use CSS `filter: grayscale(1) contrast(1.05)`, or pre-process. No exceptions for "the photo looked nice in color."
- Diagrams: black-and-white only. If you need to highlight something, use weight, scale, or position — not color.
- Background patterns: at most one — a thin mono grid, halftone dot, or hairline rule per section. Mask it so it fades at edges.

---

## 8. Motion & Animation

> Motion is a primary expressive layer of the site. Reference benchmarks: **obys.agency** (text reveals, scroll progress, asymmetric staggered transforms), **brand.ivress.co.jp** (mouse trail, scroll-driven scene changes), **Apple product pages** (sticky scroll storytelling), **Linear** (clean ease-out transitions). The site should feel choreographed — when you scroll, things happen. The mouse should feel slightly alive.

### 8.1 Philosophy

1. **Motion is choreography, not decoration.** Every motion should feel like it earns its place — text reveals as you arrive at it, sections lock in place to let one idea breathe, the cursor confirms presence.
2. **Calm, not playful.** Even in this more interactive direction, no bouncy springs, no overshoot, no spinning logos, no confetti. Editorial restraint. Think gallery, not arcade.
3. **One headline motion per section.** Each section gets one main motion concept (a sticky pin, a horizontal scroll, a mass text reveal). Don't stack five effects in one viewport.
4. **Reading must always win.** If a user has to wait for an animation to read something, the animation has failed. All scroll-driven transforms must complete on text the moment that text is centered in viewport — no holding text hostage.
5. **Performance is a brand value.** A janky animation looks worse than no animation at all.

### 8.2 Allowed patterns

| Pattern | When to use | Notes |
|---|---|---|
| **Mass text reveal (line clip)** | Hero H1, section openers | Each line lives in a `overflow: hidden` row; child translates from `translateY(102%)` to `0`. Stagger 60–100ms between lines. Drives the editorial mood. |
| **Fade + translate-up on scroll** | Body paragraphs, supporting text | Translate `12–24px`, opacity `0 → 1`. Use `IntersectionObserver`. Trigger once. |
| **Staggered reveal** | Grid of cards, list of points | `60–120ms` delay between siblings. Max 8 items in a stagger. |
| **Sticky-pin storytelling** | One per page minimum, two max | A pinned section where content transforms as the user scrolls past it. Image scales, text changes, layout swaps. Use CSS `position: sticky` plus scroll-driven progress. |
| **Scroll-driven scale / clip-path** | Featured imagery, opening section | Image starts as a tight crop or 80% scale, opens to full bleed as it scrolls into the center of the viewport. Drives the "scrolling changes the website" feeling. |
| **Section inversion on scroll** | Major chapter transitions | The page background flips from white to black (or vice versa) as a sentinel section enters viewport. Crossfade `200–300ms`. |
| **Mouse trail (small dot, blend-difference)** | Whole site | A small black dot (8–12px) that follows the cursor with `lerp` lag (~0.15). `mix-blend-mode: difference` so it inverts naturally over both white and black sections. Optionally grows on hover over interactive elements. **No particle trails, no streaks** — single dot only. |
| **Hover lift on cards/buttons** | Any interactive surface | `translateY(-2px to -4px)` + border-color shift. `200–300ms` ease-out. **No shadows** (we are B&W). |
| **Number counter** | Hero stats, metric callouts | Tick from 0 to value over `~800ms` once in viewport. Skip if `prefers-reduced-motion`. |
| **Smooth in-page scroll** | Anchor nav links | `scroll-behavior: smooth` is fine. Don't reinvent it with JS. |
| **Marquee / auto-scroll strip** | Sponsor logos, university partner row | Pause on hover. Mask edges. Never use for actual content. |
| **Scroll progress indicator** | Top of page, optional | A `1px` line at the top of viewport that fills left-to-right as the user scrolls. Pure black on white pages, pure white on black pages. |

### 8.3 Banned patterns

- ❌ **Bouncy / spring easing.** No overshoot. Ease-out cubic-bezier curves only.
- ❌ **Element rotation / spin** (except true loading spinners — and we shouldn't have those).
- ❌ **Multi-particle cursor effects** — sparkles, streaks, exploding dots. The mouse trail is a single dot, full stop.
- ❌ **Auto-playing carousels with content** — reading material that moves on a timer disrespects the reader.
- ❌ **Scroll-jacking that prevents the user from scrolling at their own pace.** Sticky pins are fine; hijacking scroll velocity is not.
- ❌ **Animations longer than 700ms** for non-scroll-driven motion. Scroll-driven transforms can run as long as the user keeps scrolling — the user controls the duration.
- ❌ **Animation triggered on every scroll event.** Use `IntersectionObserver` for triggers and `requestAnimationFrame` + lerp for cursor/scroll-progress only.
- ❌ **Animating `width`, `height`, `top`, `left`, `margin`.** Animate `transform`, `opacity`, `clip-path` only.
- ❌ **Confetti, particles, fireworks.** Still banned. Even on milestone pages.
- ❌ **"Click to enter" splash screens or full-page intro animations.** Judges will close the tab.
- ❌ **Loading spinners over 500ms.** If something takes longer, show a skeleton, not a spinner.
- ❌ **Hover-only reveals on touch devices** with no fallback. The mouse trail must hide entirely on touch (`@media (hover: none)`).
- ❌ **Character-by-character text reveal** for body copy. Whole-line clip reveal is the editorial move; per-character is theatrical.

### 8.4 Timing & easing

- **Standard easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — natural deceleration. Use this 90% of the time.
- **Linear:** only for marquee strips and infinite background drifts.
- **Ease-in:** never for entrances; rare for exits.
- **Hover transitions:** `200–300ms`.
- **Section reveals:** `400–600ms`.
- **Page transitions:** there are none. We are a static site. Don't add an SPA shell just to fade pages.

### 8.5 Technical rules

- **Always respect `prefers-reduced-motion: reduce`.** Wrap every non-essential animation in this query and disable transforms/opacity transitions inside it.
- **`IntersectionObserver` for scroll triggers.** Set `threshold: 0.15` and `rootMargin: "0px 0px -10% 0px"` as a baseline.
- **Trigger animations once.** Re-animating on re-entry feels nervous.
- **Keep JS lean.** No animation library larger than `~30KB` for a static site. CSS-first; reach for GSAP only if a sticky-pin sequence genuinely demands it.
- **`will-change` is a last resort,** not a default. Apply only to elements actively animating, then remove.
- **Test on a low-end Android device.** If it stutters there, simplify.
- **60fps target.** If the section can't hit 60fps, drop the animation, not the device support.
- **Lighthouse performance score ≥ 90.** Animation must not push us below this.

### 8.6 What "editorial polish" means in practice

- Motion is **choreographed**, not random. Every transform should be defensible — why does this move, why now?
- Easing curves are **always decelerating.** Things arrive, they don't bounce or settle.
- **Spacing breathes** before, during, and after motion — never crammed.
- Hover states are **small and confident.** A 2px lift, not a 10px jump.
- **The mouse trail is a thin presence**, not a personality. If it's drawing attention to itself, make it smaller.
- **Sticky pins must end** — the user must be able to scroll past every pinned section in a finite number of viewports. No infinite scroll-jacking.
- The page **must remain readable without JavaScript.** Reveal animations may degrade to "everything is visible by default." Mouse trail simply does not appear. Sticky pins may simplify to standard sections.
- **Mobile gets a stripped-down motion vocabulary.** No mouse trail on touch. Sticky pins still work but pin durations are shorter. Mass text reveals still trigger but with shorter translate distances.

---

## 9. Accessibility

- Body text contrast ratio ≥ **4.5:1** against its background. Headings ≥ **3:1**.
- Every interactive element must have a visible focus state. Don't `outline: none` without replacing it.
- All images need `alt` text. Decorative images get `alt=""`.
- Don't convey meaning by color alone. A green tag plus the word "active" is fine; a green dot meaning "active" is not.
- Tap targets ≥ `44 × 44px` on mobile.
- All animations honor `prefers-reduced-motion` (see Section 8.5).
- Keyboard navigation must reach every interactive element in logical order.

---

## 10. Anti-patterns (do not do)

- ❌ Any chromatic color beyond the single `--accent-live` pulse dot. No blues, oranges, purples, muted teals, gradients of any kind.
- ❌ Drop shadows. We do lift through borders and inversion, not shadow.
- ❌ More than three font weights on the same page.
- ❌ Centered body paragraphs over 2 lines long.
- ❌ Animated background gradients of any kind.
- ❌ Stock illustrations of "AI brains" or "DNA helixes glowing in space."
- ❌ Marketing words: "revolutionary," "cutting-edge," "next-generation," "synergy," "leverage."
- ❌ Splash screens, loaders, "scroll to begin" prompts.
- ❌ Auto-playing video, especially with sound.
- ❌ Modals that pop up on first visit asking for emails or feedback.
- ❌ Multiple cursor effects layered together (a trail dot AND a custom cursor AND a magnetic hover ring, etc.). Single trail dot, period.
- ❌ Decorative serifs everywhere. Fraunces is for display moments only — H1 and select H2. Never in body, never in nav, never in buttons.

---

## 11. File & Tech Conventions

- HTML: semantic tags (`<header>`, `<section>`, `<nav>`, `<footer>`). One `<h1>` per page.
- CSS: use the design tokens declared in `:root`. No raw hex values in component CSS.
- JS: keep it minimal and progressive. The site must remain usable with JS disabled — content first, behavior second. Animations may degrade gracefully.
- Naming: kebab-case for class names (`hero-stats`, `pillar-tags`).
- Comments: structural section headers (`/* ===== HERO ===== */`) only. Don't comment obvious code.

---

## 12. When in Doubt

If a design choice isn't clearly covered above, default to: **the option that obys.agency would ship.** Pure B&W. Editorial scale. Generous whitespace. Asymmetric grid. Less is the answer almost every time.

For motion specifically, default to: **the option that ivress would ship.** Choreographed reveals, scroll changes the page, the cursor has a quiet presence. But always: reading wins, performance wins.

If you're tempted to add color, ask first: "could I solve this with hierarchy, scale, position, or typography instead?" The answer is almost always yes.

Bring open questions to the team Slack with a screenshot before shipping.

---

*Version: v0.3 — full pivot to editorial monochrome direction. References shifted from Recursion / Apple / Stripe (research-biotech, calm) to obys.agency / ivress / Pentagram (editorial monochrome, choreographed motion). Color system reduced to pure B&W with a single live-accent dot. Mouse trail and scroll-driven transformations now first-class motion patterns. Display serif (Fraunces) added to type stack for H1 and showcase H2. v0.2 prior version retired in repo history.*
