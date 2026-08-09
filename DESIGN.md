# Nady4 / Digital Editorial System

## Design read

This is a bilingual Full Stack Engineer portfolio for technical collaborators, product teams, and international hiring teams. It presents production web products, LLM integrations, AI agents, and workflow automation through a futuristic underground editorial language. The system borrows from Swiss industrial print, corrupted image archives, early web interfaces, and terminal telemetry without reproducing the supplied reference literally.

## Dials

- `DESIGN_VARIANCE`: 10/10. Offset columns, image bleed, deliberate imbalance, and non-card layouts.
- `MOTION_INTENSITY`: 8/10. CSS entry wipes, pixel flicker, image displacement, and tactile states. Every effect has a hierarchy, feedback, or archive-processing purpose.
- `VISUAL_DENSITY`: 8/10. Dense metadata rails and technical labels are balanced by large paper fields and empty space.

## Tokens

- Substrate: `--paper` / `--paper-bright`, a cold off-white print surface.
- Ink: `--ink` / `--ink-muted`, never pure black or white.
- Signal: electric purple for links, active states, and archive indexing.
- Artifacts: green for successful system traces and red for corrupted fragments only.
- Geometry: all corners are square; 1px rules and 2px structural bars create hierarchy.
- Type: heavy Arial/Helvetica grotesk for structural headlines, Georgia for one editorial contrast, and a mono stack for metadata, coordinates, and labels.
- Spacing: 8px base rhythm; sections use 72-144px vertical fields and dense subgrids use 8-24px gaps.

## Component language

- `Navbar`: sticky two-row instrument panel, not a floating pill or hamburger-first SaaS bar.
- `Hero`: split archive plate with a monochrome portrait, pixel bars, coordinates, and a short value statement.
- `Projects`: image-first archive entries with horizontal screenshot tracks and a lightbox retained as the inspection tool.
- `Experience`: chronological ledger with rules, role codes, and dense contribution lists.
- `Education`, `Skills`, `Certifications`: plain indexed registers rather than equal-height cards.
- `Contact`: oversized print-room closing plate with one clear mail action.
- `Footer`: compact distribution strip with social endpoints and location metadata.

## Motion rules

- Reveals use `transform` and `opacity` only and are disabled for reduced-motion users.
- Hero imagery may carry controlled displacement; project screenshots remain clean and unprocessed.
- Scanlines and pixel fragments are fixed texture layers, never expensive scrolling filters.
- There is one horizontal data marquee. It communicates the site's archive status and does not repeat as filler.

## Responsive plan

- Desktop: 12-column editorial grid with offset image and text tracks.
- Tablet: 6-column grid, preserving the offset but reducing bleed and type scale.
- Mobile: strict single-column flow, horizontal screenshot tracks remain touch-scrollable, metadata wraps into readable rows, and every target remains at least 44px high.

## Implementation order

1. Replace the old purple/glass token layer with the print token layer and global accessibility primitives.
2. Rebuild navigation and hero composition around technical metadata and the portrait treatment.
3. Convert repeated rounded cards into archive rows, ledgers, and image-first project plates.
4. Bring blog/index and post surfaces into the same substrate so the site reads as one publication.
5. Verify bilingual routes, theme persistence, image lightbox behavior, keyboard focus, reduced motion, and production build output.
