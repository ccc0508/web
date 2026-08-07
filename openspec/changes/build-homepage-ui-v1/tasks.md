## 1. Frontend Foundation

- [x] 1.1 Scaffold the Vue 3, TypeScript, Vite, Vue Router, Element Plus, and SCSS application at the repository root with a homepage-only route.
- [x] 1.2 Add global visual tokens, font fallbacks, reset styles, desktop content-width rules, and the red/gold/warm-neutral theme.
- [x] 1.3 Copy `D:\pictures\12.jpg` into a project-owned static asset path and verify that no reference-site assets or URLs are introduced.

## 2. Header and Primary Navigation

- [x] 2.1 Implement the welcome/date strip and the CSS-rendered branded hero with reference-consistent typography, spacing, and decorative treatment.
- [x] 2.2 Implement the presentation-only search selector, text input, search action, and project-map action without navigation or network requests.
- [x] 2.3 Implement the full primary navigation with 首页 active and every other item inert, including the highlighted 交易大厅 visual treatment.

## 3. Homepage Showcase Content

- [x] 3.1 Implement the first showcase row with a static Guangdong province SVG presentation, the supplied carousel placeholder image, and reference-like proportions.
- [x] 3.2 Implement reusable section headers, gray media placeholders, and empty-state presentation components.
- [x] 3.3 Implement the video-cover placeholder and play-button interaction that displays the exact message “视频暂未接入”.
- [x] 3.4 Implement 交易动态, 临期资产, 三资公开, 农村工程和采购, and 网站导航 sections, each displaying the exact text “暂无公开数据”.
- [x] 3.5 Complete remaining homepage spacing, separators, floating utilities, and bottom termination while ensuring the entire 关于我们/监督投诉 footer block is absent.

## 4. Verification and Visual QA

- [x] 4.1 Add automated homepage checks for inert navigation, empty-data text, the video message, excluded footer content, and absence of reference-domain requests.
- [x] 4.2 Run type checking and the production build and resolve all errors and warnings relevant to the homepage.
- [x] 4.3 Render and visually inspect the homepage at 1920×1080, 1440×900, and 1366×768, then adjust typography, colors, cropping, spacing, and alignment against the reference.

## 5. Reference Layout Refinement

- [x] 5.1 Remove the convenience-service column and resize the first showcase row to a two-column Guangdong map and carousel composition.
- [x] 5.2 Replace the existing feature row with a left-side tabbed information panel for 工作动态, 通知公告, 行业资讯, 警示曝光, and 帮扶协作 using gray placeholder media, with the video placeholder aligned on the right.
- [x] 5.3 Update automated checks to assert the missing convenience-service block, five information labels, local tab switching, and left-information/right-video ordering.
- [x] 5.4 Run type checking, production build, interaction tests, and desktop visual QA, then resolve layout or regression issues.
- [x] 5.5 Increase the five information-tab labels and the more-link typography to a reference-like desktop size, then verify they remain on one line at 1366px and pass the existing checks.

## 6. Full-Width Business Section Refinement

- [x] 6.1 Create a reusable full-width business-section component with reference-style split titles, local tabs, more-link treatment, optional category or district controls, and a centered “暂无公开数据” state.
- [x] 6.2 Replace the two-column cards with four independent rows for 交易动态, 临期资产, 三资公开, and 农村工程和采购 in the required order and configure each row from the supplied reference screenshots.
- [x] 6.3 Extend automated checks for full-width sequential layout, required tabs and districts, local state changes, and one empty state per business section.
- [x] 6.4 Run type checking, production build, interaction tests, and 1920px/1440px/1366px visual QA, then resolve spacing, typography, or overflow issues.
- [x] 6.5 Implement seven-item circular category carousels for 交易动态 and 临期资产, including the additional reference categories and functional previous/next arrows that advance one item and wrap.
- [x] 6.6 Add carousel interaction and wraparound checks, then run type checking, production build, browser tests, and desktop visual QA before committing and pushing.
