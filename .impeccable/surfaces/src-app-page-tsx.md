---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/admin/dashboard/page.tsx","src/app/admin/login/page.tsx"]
---

Scope: public home page (`src/app/page.tsx` and `components/public/*`) plus the admin CMS (`/admin/login`, `/admin/dashboard`) restyled into the same system. Visitor mode: Experience (public), Operate (admin).

Audience: recruiters and freelance clients, weighted equally. Proof on hand: the real photo, the real skills list, and real contact channels. Projects and certificates are CMS dummy data, so the layout has to survive real, uneven content.

Chosen: the category standard (canon), with Apple and Stripe as the quality bar. Light world, chosen from the use scene (a recruiter's office laptop in daylight, a client's phone), with one graphite band.

## Direction contract

THESIS: A calm, exact personal site where one person is shown both designing and building. It refuses the dark-neon template: no glow, glass, gradient text, eyebrow badges, typewriter, fake stats, or percentage bars.

OWN-WORLD: White and #F5F5F7 grounds, #1D1D1F ink, one electric blue (#0058F0) used only for actions and links. One graphite band (#0B0F15) holds the skills. Geist is set large with tight tracking; Geist Mono appears only for tech-stack names and dates. Photos and thumbnails get generous 20–28px radii, and there are no card borders on white, only spacing.

STORY: The visitor learns who Bhisma is and that they design and build. They see the work immediately, then understand the design and build skills, and then contact them or take the CV.

FIRST VIEWPORT: Left, the name and a large statement headline (about 72px), a single roles line, and the primary "Lihat karya" and secondary "Unduh CV" buttons. Right, a tall portrait at about 44% width. The top of the featured project peeks above the fold.

FORM: The category standard (canon, chosen by the user), seed 75dc4a68. Signature interaction: a shared-element case study, where clicking a project card grows its image into the detail view. Motion grammar: one orchestrated hero entrance with exponential ease-out; content stays visible by default.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
