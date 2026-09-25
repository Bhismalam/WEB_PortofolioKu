---
name: Bhisma.dev
description: A calm, exact personal portfolio in daylight, with one graphite band and one electric blue for action.
colors:
  canvas: "#ffffff"
  canvas-2: "#f5f5f7"
  canvas-3: "#ebebef"
  ink: "#1d1d1f"
  ink-2: "#424245"
  ink-3: "#6e6e73"
  line: "#e3e3e8"
  line-strong: "#c9c9d1"
  accent: "#0058f0"
  accent-hover: "#0047c4"
  accent-soft: "#e8f0ff"
  graphite: "#0b0f15"
  graphite-line: "#262d38"
  on-graphite: "#f5f5f7"
  on-graphite-2: "#a3acbd"
  success: "#0a7d4f"
  success-soft: "#e6f5ee"
  danger: "#c4302b"
  danger-soft: "#fdecec"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "68px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
    fontFeature: "\"ss01\", \"cv11\""
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.43
  mono:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  tag: "6px"
  field: "12px"
  inset: "16px"
  media: "20px"
  sheet: "24px"
  portrait: "28px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter: "32px"
  stack-sm: "12px"
  stack: "24px"
  grid-gap: "32px"
  section: "80px"
  section-md: "112px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-tonal:
    backgroundColor: "{colors.canvas-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-tonal-hover:
    backgroundColor: "{colors.canvas-3}"
  button-text:
    textColor: "{colors.accent}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-text-hover:
    backgroundColor: "{colors.accent-soft}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  button-ink-hover:
    backgroundColor: "{colors.ink-2}"
  chip-filter:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  chip-filter-hover:
    backgroundColor: "{colors.canvas-2}"
    textColor: "{colors.ink}"
  chip-filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  tag-mono:
    backgroundColor: "{colors.canvas-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.mono}"
    rounded: "{rounded.tag}"
    padding: "4px 8px"
  input-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  project-media:
    backgroundColor: "{colors.canvas-2}"
    rounded: "{rounded.media}"
  dialog-sheet:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.sheet}"
  form-panel:
    backgroundColor: "{colors.canvas-2}"
    rounded: "{rounded.sheet}"
    padding: "40px"
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-2}"
    height: "64px"
---

# Design System: Bhisma.dev

## Overview

**Creative North Star: "The Daylight Studio"**

A personal site read in daylight on an office laptop or a phone: white and near-white grounds, near-black ink, and a single electric blue that means "you can act here." The page is calm and exact rather than decorated. Hierarchy comes from large, tightly tracked Geist headlines, generous whitespace, and a small number of soft-cornered photographs; almost nothing is boxed, outlined, or ornamented. One graphite band in the middle of the page holds the skills and gives the scroll a single change of light.

Density is low on the public page and moderate in the admin. Content is CMS-driven and uneven, so structure is carried by type, spacing, and hairline rules rather than by containers that would look empty or overstuffed. The world explicitly replaces an earlier dark neon and glass look: no glow, no glass, no gradient text, no eyebrow badges, no typewriter effects, no invented stats or percentage bars.

Motion is spent in one place. The hero rises and the portrait unveils with an exponential ease-out; everything else is visible by default and changes state with short color transitions. The signature interaction is the shared-element case study: a project image grows into the detail sheet through a view transition.

**Key Characteristics:**
- Light world: white and #F5F5F7 grounds, #1D1D1F ink, one graphite band.
- One blue, for actions and links only.
- Geist set large with tight negative tracking; Geist Mono only for tech names, durations, and IDs.
- Pill-shaped controls; generously rounded photographs (20 to 28px).
- Unboxed content on white: spacing and hairline rules instead of bordered cards.
- One orchestrated entrance; shared-element growth into the case study.

## Colors

A cool, near-neutral grey scale with a single saturated blue and one deep graphite surface.

### Primary
- **Electric Blue** (accent): primary buttons, inline links, the "open case study" affordance, the email address, focus outlines, text selection, and the input caret. It never fills decorative surfaces.
- **Pressed Blue** (accent-hover): hover and pressed state of blue-filled buttons only.
- **Blue Wash** (accent-soft): hover background behind blue text buttons (the "download CV" ghost button).

### Secondary
- **Night Graphite** (graphite): the one dark band (skills). Nothing else on the public page sits on it.
- **Graphite Rule** (graphite-line): hairline dividers inside the graphite band.
- **Paper on Graphite** (on-graphite) and **Mist on Graphite** (on-graphite-2): primary and secondary text on the graphite band.

### Neutral
- **White Canvas** (canvas): the default page ground, nav bar, dialogs, and fields.
- **Soft Grey** (canvas-2): alternate section ground (certificates), the contact form panel, tonal buttons, image placeholders, the language switch track, and the login and admin grounds.
- **Pressed Grey** (canvas-3): hover state of tonal controls; certificate thumbnail placeholder.
- **Ink** (ink): headlines, names, active labels, the dark CV button, and the active filter chip.
- **Ink Secondary** (ink-2): body copy, nav links, descriptions.
- **Ink Tertiary** (ink-3): subtitles, meta lines, placeholders, footnotes, and definition-list terms.
- **Hairline** (line): list dividers, the footer rule, the nav shadow line on scroll.
- **Strong Hairline** (line-strong): field borders and the scrollbar thumb.

### Status
- **Available Green** (success) with **success-soft**: the availability dot beside the hero actions, and positive notices in the admin.
- **Alert Red** (danger) with **danger-soft**: form errors, destructive admin actions, and the confirm dialog.

### Named Rules
**The One Blue Rule.** Blue marks what is clickable and nothing else. If an element is not a link, button, focus ring, or selection, it is not blue.

**The One Band Rule.** The page has exactly one graphite section. Every other section alternates between white and soft grey.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, -apple-system, Segoe UI)
**Body Font:** Geist, with stylistic sets `ss01` and `cv11` enabled on body
**Label/Mono Font:** Geist Mono (with ui-monospace, SF Mono, Menlo)

**Character:** One grotesque family does everything, from a 68px statement down to 13px meta. Weight stays at 600 for headings and 400 to 500 for everything else; hierarchy comes from size and tracking, not from weight contrast.

### Hierarchy
- **Display** (600, 44px mobile, 60px small tablet, 68px desktop, line-height 1.02, tracking -0.04em): the hero statement only, capped near 14ch and balanced. The contact headline uses the same treatment at 48 to 60px.
- **Headline** (600, 36px mobile to 48px, tracking -0.035em): section titles (work, skills, certificates), balanced, followed by a 17px Ink Tertiary subtitle capped at 48ch.
- **Title** (600, 28px, tracking -0.03em): the featured project title and the login heading. The case-study title scales to 40px at line-height 1.08.
- **Title Small** (600, 20px, tracking -0.02em): grid project titles and dialog headings. Certificate titles sit at 17px semibold.
- **Body** (400, 17px, line-height 1.625): descriptions and case-study prose, capped at 52 to 65ch.
- **Body Small** (400 to 500, 15px): button labels, secondary descriptions, and link actions.
- **Label** (500 to 600, 14px, sentence case): form labels, nav links, meta lines, and case-study subheads ("Overview", "Stack").
- **Mono** (400, 13px, Geist Mono): tech-stack names, skill durations (with tabular figures), and credential IDs only.

### Named Rules
**The Mono Means Data Rule.** Geist Mono appears only on machine-ish data: tech names, durations, dates-as-data, and IDs. Never on headings, labels, or prose.

**The Sentence Case Rule.** Labels and subheads are sentence case at normal tracking. The only uppercase text is the two-letter language code in the language switch.

## Layout

A single centered container (max 1200px) with 20px gutters on mobile and 32px from the small breakpoint up. Two-column compositions use a 12-column grid from the medium breakpoint: the hero splits 7/5 (text left, portrait right, portrait first on mobile), the featured project 8/4, the contact section 6/6, and the case study 8/4.

Sections breathe at 80px vertical padding on mobile and 112px from medium up (contact goes to 128px). Headings sit 12px above their subtitles; content blocks start 48 to 56px below. Project grids run one column on mobile and two from the small breakpoint, with 32px column and 56px row gaps. Skills run one, two, then four columns.

The nav is fixed at 64px with an anchor scroll offset of 80px; on mobile it collapses to a full-width sheet of large (22px semibold) links separated by hairlines. Horizontal filter chips scroll edge to edge on mobile with a right-edge fade mask.

## Elevation & Depth

Mostly flat and tonal: depth comes from the white versus soft-grey grounds and the single graphite band. Shadows appear only on things that genuinely float above the page, and they are soft, neutral, and never colored.

### Shadow Vocabulary
- **Scroll hairline** (`box-shadow: 0 1px 0 var(--color-line)`): the nav bar once the page scrolls or the menu opens.
- **Segment lift** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.12)`): the active option in the language switch.
- **Floating control** (`box-shadow: 0 2px 8px rgb(0 0 0 / 0.15)` to `0 2px 10px rgb(0 0 0 / 0.18)`): white pills laid over imagery (the "watch" badge and the dialog close button).
- **Card rest** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 12px 40px rgb(0 0 0 / 0.06)`): a standalone white card on a grey ground (the login card).
- **Sheet** (`box-shadow: 0 24px 80px rgb(0 0 0 / 0.28)`): modal dialogs over the scrim (`rgb(10 12 16 / 0.55)`).
- **Focus halo** (`box-shadow: 0 0 0 4px rgb(0 88 240 / 0.14)`): focused form fields.

### Named Rules
**The Only-If-Floating Rule.** A shadow means the element sits above the page (overlay, sheet, floating control, sticky bar). In-flow content never carries one.

## Shapes

Soft geometry with two families. Interactive controls are full pills: buttons, filter chips, social links, the language switch, and icon buttons. Imagery and panels get generous continuous corners that grow with size: 28px for the hero portrait, 24px for dialog sheets and the contact panel, 20px for project media and the login card, 16px for images inset in a dialog, 12px for fields, certificate thumbnails, and alert strips, and 6px for mono tech tags. On mobile, dialogs become bottom sheets rounded only on the top corners.

Borders are rare. Fields carry a 1px strong hairline; lists of certificates and skills are divided by 1px hairlines top, bottom, and between rows. Content on white is never boxed.

**The No Box On White Rule.** Cards, projects, and list items on a white ground are not outlined or shadowed. Separate them with spacing, and use hairline rules only to divide rows of a list.

## Components

### Buttons
Quiet and confident: pill-shaped, medium weight, one clear primary per group.
- **Shape:** full pill (9999px); heights 48px for primary page actions, 44px inside dialogs and panels, 36px in the nav.
- **Primary:** Electric Blue fill, white 15px medium label, 24px horizontal padding, optional trailing 16px arrow icon; hovers to Pressed Blue.
- **Tonal:** Soft Grey fill with Ink label; hovers to Pressed Grey. Used for secondary actions beside a primary (GitHub, Figma, "send again").
- **Text:** blue label with no fill; a Blue Wash appears on hover (the hero "download CV").
- **Ink:** Ink fill with white label, 36px tall; reserved for the persistent CV action in the nav.
- **Focus:** global 2px Electric Blue outline at 3px offset.
- **Disabled:** 60% opacity, with a small white spinner replacing the icon while loading.

### Chips
- **Filter:** 36px pill, 14px medium Ink Secondary label, no fill at rest; Soft Grey on hover; the active chip inverts to an Ink fill with white text.
- **Tech tag:** 6px corners, Soft Grey fill, 13px Geist Mono in Ink Secondary.
- **Social link:** 40px pill, Soft Grey fill, 16px brand icon plus label; Pressed Grey on hover.

### Cards / Containers
- **Project media:** 20px corners, Soft Grey placeholder, image cover-fit; on hover the image scales to 1.03 over 700ms with the expo ease. The whole article is clickable through a stretched title button; grid titles turn blue on hover.
- **Panels:** the contact form sits in a Soft Grey panel (24px corners, 24px padding mobile, 40px desktop). No border, no shadow.
- **Standalone card on grey:** white, 20px corners, Card rest shadow (login).

### Inputs / Fields
- **Style:** white fill, 1px Strong Hairline border, 12px corners, 15px text, 12px by 14px padding, Ink Tertiary placeholder. Labels sit above at 14px medium Ink with 6 to 8px gap.
- **Hover:** border darkens slightly.
- **Focus:** border turns Electric Blue with a 4px Focus halo; no outline.
- **Disabled:** Soft Grey fill, Ink Tertiary text.
- **Select:** native appearance removed, custom chevron at the right.
- **Error:** a danger-soft strip with 12px corners, danger text, and a leading alert icon.

### Navigation
- **Bar:** fixed, white, 64px tall; first name at left (17px semibold, tight tracking), 14px Ink Secondary links centered with 32px gaps that darken to Ink on hover, language switch and Ink CV pill at right.
- **Language switch:** Soft Grey pill track with two 28px segments; the active segment is white with a Segment lift.
- **Mobile:** a 40px round menu button opens a full-width white sheet of 22px semibold links on hairline rows, followed by the language switch and CV pill.

### Dialog Sheet
Modal sheet used for the case study and certificates: scrim fades in over 300ms; the white sheet (24px corners, bottom sheet on mobile, max 92svh, widths 440, 760, or 1000px) rises 24px over 500ms with the expo ease. Focus is trapped, Esc and the scrim close it, and the close control is a 40px round button (white with a Floating control shadow when over media).

### Shared-Element Case Study (signature)
Opening a project wraps the state change in a view transition: the card image and the case-study hero share a transition name, so the thumbnail grows into the 16:9 media at the top of the sheet over 550ms with the expo ease. It falls back to an instant change when the API is missing or reduced motion is requested.

### Hero Entrance
The one orchestrated moment: text lines rise from 14px below and 35% opacity over 900ms in 40 to 80ms staggers, while the portrait unveils from a clipped, 1.04-scaled inset over 1.2s. Content is never hidden before animating, and all of it is disabled under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep blue for actions, links, focus, and selection only (The One Blue Rule).
- **Do** alternate white and soft-grey sections, with exactly one graphite band.
- **Do** make every button, chip, and switch a full pill; use 44 to 48px heights for primary touch targets.
- **Do** set headings in Geist 600 with negative tracking (-0.02em to -0.04em) and balanced wrapping.
- **Do** use Geist Mono at 13px only for tech names, durations, and IDs.
- **Do** round photographs and media generously (20 to 28px) and give them a Soft Grey placeholder.
- **Do** separate content on white with spacing, and divide lists with 1px hairlines.
- **Do** keep motion to the hero entrance, the case-study growth, sheet entry, and short color transitions, all using `cubic-bezier(0.16, 1, 0.3, 1)` and all disabled under reduced motion.
- **Do** design every list for zero, one, and many CMS items, and for missing optional links.

### Don't:
- **Don't** use glow, glass or backdrop blur, gradient text, or colored shadows.
- **Don't** add eyebrow or kicker labels above headings, or uppercase tracked labels.
- **Don't** show invented stats, percentage skill bars, or typewriter headlines.
- **Don't** outline or shadow cards that sit in-flow on a white ground.
- **Don't** introduce a second accent hue; status green and red are for status only.
- **Don't** put Geist Mono on headings, labels, or body copy.
- **Don't** use rectangular or small-radius (8 to 12px) buttons.
