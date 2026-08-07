## Purpose

Defines the observable behavior and visual scope of the first high-fidelity homepage-only prototype, including static placeholders, inert navigation, a Guangdong map presentation, and explicit empty-data states without any dependency on production content or services.

## ADDED Requirements

### Requirement: Reference-consistent homepage presentation
The homepage SHALL reproduce the reference site's desktop visual language, including its typography hierarchy, red-and-gold color palette, pale warm background treatment, centered content width, spacing rhythm, section borders, navigation proportions, and card alignment.

#### Scenario: Desktop homepage is displayed
- **WHEN** a visitor opens the application at the homepage
- **THEN** the visible layout follows the reference homepage's visual hierarchy and presents the complete first-version homepage without requiring any external data

### Requirement: Homepage-only navigation scope
The homepage SHALL render the reference primary navigation labels and SHALL visually mark 首页 as active. Every non-home navigation item SHALL be inert in this version.

#### Scenario: Visitor clicks another primary navigation item
- **WHEN** a visitor clicks 综合信息, 交易动态, 临期资产, 三资公开, 工程和采购, 村域招商, 金融超市, 警示名单, or 交易大厅
- **THEN** the browser remains on the homepage and no route, external page, modal, or content view is opened

### Requirement: Branded header and search presentation
The homepage SHALL include the top welcome/date bar, the large branded hero area, the search selector and input, the search action, and the project-map action with styling and proportions consistent with the reference site. Search and project-map controls SHALL be presentation-only.

#### Scenario: Visitor uses a header control
- **WHEN** a visitor types in the search field or clicks 搜索 or 项目地图
- **THEN** the homepage remains visible and no external request or navigation occurs

### Requirement: Guangdong map navigation presentation
The map-navigation section SHALL display a static visual representation of Guangdong Province in place of the original Foshan map. The map SHALL not load map tiles, coordinates, project markers, or third-party map services.

#### Scenario: Guangdong map section is displayed
- **WHEN** the homepage finishes rendering
- **THEN** a Guangdong province map presentation is visible in the map-navigation area and interaction with it does not request or reveal real map data

### Requirement: Carousel placeholder image
The homepage carousel SHALL use the user-supplied image `D:\pictures\12.jpg` as its slide artwork while preserving the reference carousel's visible aspect ratio and cropping behavior.

#### Scenario: Carousel is visible
- **WHEN** a visitor views the top content area
- **THEN** the supplied image is displayed as the carousel slide without distortion and uses cover-style cropping where necessary

### Requirement: Two-column showcase without convenience-service panel
The first homepage showcase row SHALL contain only the Guangdong map-navigation panel and carousel panel. The homepage SHALL NOT render the 便民服务 heading, QR placeholder, 信息公开 shortcut, or 办事指南 shortcut.

#### Scenario: First showcase row is displayed
- **WHEN** a visitor views the area immediately below the primary navigation
- **THEN** the map occupies the left column, the carousel fills the remaining right column, and no convenience-service column is present

### Requirement: Reference-aligned information and video row
The row immediately below the map and carousel SHALL place a tabbed information panel on the left and the video placeholder on the right. The information panel SHALL expose the five labels 工作动态, 通知公告, 行业资讯, 警示曝光, and 帮扶协作 in that order, with 工作动态 active initially, and SHALL use neutral gray placeholders instead of imported article media or business content.

#### Scenario: Information row is displayed
- **WHEN** a visitor views the row below the showcase
- **THEN** all five information labels are visible on the left, gray placeholder content is shown beneath the active label, and the video placeholder is aligned to the right

#### Scenario: Visitor selects an information label
- **WHEN** a visitor activates any of the five information labels
- **THEN** the selected label receives the active treatment and the panel continues to show only local gray placeholder content without requesting data

### Requirement: Video placeholder interaction
The homepage SHALL provide a video-cover placeholder with a centered play button and SHALL show the exact message “视频暂未接入” when activated.

#### Scenario: Visitor clicks the video play button
- **WHEN** the visitor activates the play button on the video placeholder
- **THEN** the interface displays “视频暂未接入” and does not attempt to load or play a video

### Requirement: Image placeholders
Every content image location other than the supplied carousel image SHALL use a neutral gray placeholder that preserves the corresponding reference image area's aspect ratio.

#### Scenario: A content image slot has no media
- **WHEN** a homepage section contains an image slot without supplied content
- **THEN** a gray placeholder occupies the same proportional layout space without loading a remote image

### Requirement: Required empty-data sections
The homepage SHALL show the exact empty-state text “暂无公开数据” in the content area beneath each of these sections: 交易动态, 临期资产, 三资公开, 农村工程和采购, and 网站导航.

#### Scenario: Homepage contains no imported business data
- **WHEN** the specified five homepage sections render
- **THEN** each section displays “暂无公开数据” in a visually centered empty state consistent with the surrounding design

### Requirement: Footer block omission
The homepage SHALL omit the entire bottom block containing 关于我们, 监督投诉, organizer information, filing information, technical-support information, and related footer content.

#### Scenario: Visitor reaches the bottom of the homepage
- **WHEN** the visitor scrolls to the end of the page
- **THEN** none of the excluded footer or complaint content is present

### Requirement: No production data integration
The first-version homepage MUST NOT request the reference site's APIs or import its real articles, videos, images, files, rental listings, maps, contact details, QR codes, or transaction records.

#### Scenario: Homepage loads in a clean browser session
- **WHEN** the homepage and all of its local interactions are exercised
- **THEN** the page uses only project-owned static assets and local placeholder state and makes no request to `3z.fsny.foshan.gov.cn` or its service endpoints
