## Context

See `proposal.md` for motivation. The repository currently contains no frontend source, package manifest, or hosting configuration. The implementation must therefore establish a minimal frontend foundation while remaining limited to a single homepage. The only supplied content asset is `D:\pictures\12.jpg` (1200×800), which is authorized for use as the carousel placeholder. All other media and business content must be locally generated placeholders.

The visual reference is a desktop-first government portal with a fixed-width central canvas, a warm pale-red hero, calligraphic red branding, a saturated red navigation bar, yellow/orange accents, dense content modules, and restrained borders and shadows.

## Goals / Non-Goals

**Goals:**

- Establish a Vue 3 and TypeScript single-page frontend that can later grow into the remaining portal pages.
- Match the reference homepage's desktop composition and visual tokens closely at 1920×1080 and remain usable at 1440×900 and 1366×768.
- Implement all required homepage-only interactions with local state and no production dependencies.
- Make placeholder and empty states deliberate parts of the design rather than accidental missing content.
- Provide a repeatable visual-regression baseline for future iterations.

**Non-Goals:**

- Mobile-specific redesign, SSR, SEO content rendering, or a CMS.
- Real navigation beyond the homepage.
- Real search, map, video, image, file, rental, article, authentication, or trading integrations.
- Reuse of the reference site's logo image, background artwork, QR code, API keys, remote stylesheets, or production content.
- Rendering the excluded about-us, complaint, organizer, filing, or technical-support footer block.

## Decisions

### 1. Use a minimal Vue 3 SPA foundation

Create a Vite-powered Vue 3 application with TypeScript and Vue Router. The router will expose only the homepage route in this version; navigation labels will be buttons rather than active routes. This preserves a clean path to later pages without making the current inactive navigation appear broken.

Alternatives considered:

- Plain HTML/CSS/JavaScript would reduce initial setup but would make later component and route expansion unnecessarily expensive.
- Nuxt or another SSR framework adds infrastructure that the data-free static homepage does not need.
- Recreating the reference Vue 2 stack would copy legacy constraints without improving visual fidelity.

### 2. Use custom SCSS for fidelity and limit component-library styling

Use SCSS, BEM-style component classes, and CSS custom properties for the reference palette, typography, dimensions, shadows, and spacing. Element Plus may be used for the local video message and low-level form behavior, but major visible regions will use project-owned markup and styling so they do not resemble a generic admin interface.

Core visual tokens will include:

- Deep navigation red and bright action red.
- Gold/yellow active navigation and orange transaction-hall accents.
- Warm blush hero backgrounds and light neutral page backgrounds.
- A centered 1200–1280px content canvas with a desktop minimum width consistent with the reference.
- Chinese system sans-serif text with `STKaiti`, `KaiTi`, and similar fallbacks for the large branded heading.

### 3. Recreate brand structure without copying unavailable artwork

The hero will use layered CSS gradients and subtle decorative shapes instead of the reference banner image. A project-owned inline emblem and styled text will represent the brand area. This keeps the typography, scale, color, and spacing close to the reference while avoiding an undeclared dependency on its image assets.

### 4. Organize the homepage as independent presentational sections

The page will be composed from focused components:

- Top welcome/date strip.
- Branded hero and search controls.
- Primary navigation.
- First showcase row with Guangdong map navigation and carousel only; the compact convenience-service column is intentionally removed.
- A reference-aligned content row with a five-label tabbed information panel on the left and the video placeholder on the right.
- Empty-data modules for 交易动态, 临期资产, 三资公开, 农村工程和采购, and 网站导航.
- Floating back-to-top control if needed to match the reference vertical affordance.

Shared `SectionHeader`, `EmptyState`, `GrayMediaPlaceholder`, and `VideoPlaceholder` components will keep states visually consistent.

### 5. Treat all data as static local presentation state

Do not create an HTTP client or production endpoint configuration. Labels and structural copy will live in local TypeScript constants, while the five required business sections always render the exact empty-state text. A content security check in testing will assert that the homepage does not contact the reference domain.

### 6. Use the supplied image with cover cropping

Copy `D:\pictures\12.jpg` into a project-owned static asset path. Display it with `object-fit: cover`, a fixed reference-like carousel ratio, and a stable focal position so the character remains visible without stretching the 3:2 source image.

### 7. Render the Guangdong map as a local static illustration

Use a project-owned inline SVG silhouette approximating Guangdong Province with warm pastel fills, a border, and a centered 广东省 label. It is presentation-only: no geographic coordinates, external GeoJSON, tiles, markers, tooltips, or region navigation will be loaded.

### 8. Implement video interaction as a local message

The video area uses a gray 16:9 cover placeholder, centered circular play button, hover treatment, and accessible button label. Activation invokes a local toast or inline message reading exactly “视频暂未接入”; it never creates a media element or network request.

### 9. Validate fidelity with stable browser screenshots

Use Playwright for a homepage smoke test, inert-navigation checks, the video-message assertion, footer-omission assertion, empty-state assertions, and reference-sized screenshots. The visual baseline must be generated in one stable browser/OS environment to avoid font and rendering drift.

### 10. Match the reference information/video composition with local placeholders

Below the first showcase row, use an approximately 58/42 split: a tabbed information panel on the left and the 16:9 video placeholder on the right. The five tabs are 工作动态, 通知公告, 行业资讯, 警示曝光, and 帮扶协作, with the first active by default. Selecting a tab updates only local active state. The tab labels use a reference-like prominent desktop size of approximately 18–19px while remaining on one line at 1366px. The content body combines a gray 4:3 lead-media placeholder, neutral title/summary bars, and compact placeholder list rows so its density follows the reference without inventing article text, dates, or business records.

## Risks / Trade-offs

- [Exact brand artwork is unavailable] → Recreate the structure with CSS and inline local artwork, document the approximation, and keep the layout ready for an authorized asset replacement.
- [A static Guangdong silhouette is not survey-accurate] → Treat it explicitly as decorative navigation artwork and avoid claims of geographic precision.
- [The supplied 3:2 image differs from the reference carousel ratio] → Use cover cropping with a controlled focal point and verify it at all three desktop sizes.
- [A fixed desktop canvas can overflow on small screens] → Preserve the reference desktop-first behavior for this version and defer a true mobile layout.
- [Element Plus defaults could reduce fidelity] → Keep its visible use minimal and theme every exposed state through project tokens.
- [Future real data may reveal different content lengths] → Use resilient grid and text-overflow rules even though this version displays placeholders.

## Migration Plan

1. Scaffold the frontend at the repository root without changing OpenSpec artifacts outside this change.
2. Add the local carousel asset and homepage components.
3. Verify that the production build emits a self-contained static bundle.
4. Run the interaction and visual tests at the agreed desktop viewports.
5. If rollback is required, remove the newly introduced frontend files; no data migration or external-system rollback is necessary.
