## Why

The project currently has no application implementation, while the first deliverable is a high-fidelity, data-free recreation of the public homepage at `https://3z.fsny.foshan.gov.cn/#/`. Establishing the homepage shell first provides a visual baseline for later pages without prematurely integrating real content, maps, files, media, or transaction services.

## What Changes

- Create the first static homepage implementation, matching the reference site's typography, red-and-gold palette, spacing, visual hierarchy, and desktop layout.
- Build the shared top welcome bar, branded hero/search area, primary navigation, homepage content sections, floating utilities, and page structure.
- Remove the entire bottom "关于我们 / 监督投诉" area and do not render the reference footer block.
- Keep all non-home navigation items visually present but inert; clicking them must not navigate or change the page.
- Replace the original Foshan map navigation with a static, non-interactive Guangdong province map presentation.
- Use `D:\pictures\12.jpg` as the homepage carousel image placeholder.
- Render a video-cover placeholder with a play button; clicking it shows the message "视频暂未接入".
- Use neutral gray placeholders that preserve the reference site's image aspect ratios wherever other content images would appear.
- Show "暂无公开数据" beneath the transaction dynamics, expiring assets, three-assets disclosure, rural engineering and procurement, and website navigation sections.
- Do not connect to the reference site's APIs or import its articles, rental listings, video, images, files, map tiles, coordinates, or other data.

## Capabilities

### New Capabilities
- `homepage-ui`: Defines the high-fidelity static homepage layout, placeholder media behavior, inert navigation, Guangdong map presentation, and required empty-data states.

### Modified Capabilities

None.

## Impact

- Introduces a new frontend application in the repository, which currently contains only OpenSpec metadata.
- Adds a local copy or project-owned derivative of the user-supplied carousel placeholder image.
- Adds frontend dependencies for the chosen Vue 3, TypeScript, Vite, Element Plus, and styling/testing stack.
- Does not introduce backend services, databases, authentication, real map integrations, external API calls, or production content ingestion.
