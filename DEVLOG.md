## DevLog
### 2026-03-23: CI/CD via GitHub Actions
Added deploy.yml workflows for landing-page, dev-codex, and gather. Landing-page builds in Actions then SCPs dist/ to droplet. Dev-codex/gather SSH in and run git pull + docker compose rebuild. Updated droplet deploy.sh and README.
Files: .github/workflows/deploy.yml (all 3 repos), droplet/scripts/deploy.sh, droplet/README.md

### 2026-03-23: "Currently" section
Added minimal section between projects and resume showing what I'm actively learning/building. Data lives in data.ts as a hardcoded array (4 items). Reuses existing skill-row styling pattern. Staggered fade-in animations.
Files: src/components/CurrentlySection.tsx (new), src/data.ts, src/App.tsx, src/index.css
### 2026-03-23: Fix live demo overflow on mobile
Live demo section was too wide on mobile — grid item's `min-width: auto` let terminal content push beyond viewport. Added `min-width: 0` on grid items, `overflow: hidden` on media container, `width: 100%` on `.live-demo`.
Files: src/index.css

### 2026-03-23: Mobile + UX polish
Fixed mobile zoom (viewport meta `maximum-scale=1`), added `touch-action: manipulation` on live demo terminal to prevent pinch-zoom. Strengthened contact CTA — added tagline ("I ship fast and learn faster"), made email a button-style element with border/padding. Fixed resume path in ContactSection (`assets/resume.pdf` → `/LucasFroeschner_Resume_3-26.pdf`). Added scroll-to-top button (appears after scrolling past hero). Removed dead Terminal widget code (commented-out import in App.tsx, all `.terminal-*` CSS).
Files: index.html, src/App.tsx, src/index.css, src/components/ContactSection.tsx, src/components/ScrollToTop.tsx (new)

### 2026-03-20: Favicon, resume PDF, hide terminal
Added favicon.svg and resume PDF to public/ (Vite static). Fixed resume hrefs from `assets/resume.pdf` → `/resume.pdf`. Commented out Terminal widget in App.tsx. Built and deployed to droplet.
Files: public/favicon.svg, public/resume.pdf, src/App.tsx, src/components/ResumeSection.tsx

### 2026-03-19: LiveDemo component (xterm.js)
Added `LiveDemo.tsx` — xterm.js terminal that connects via WebSocket to tui-demo-server. Shows "launch scout in your browser" button, handles connect/disconnect/full/timeout states, terminal resize. Wired into Scout's ProjectSection via `hasLiveDemo` flag on Project type. CSS for live-demo container. Installed `@xterm/xterm` + `@xterm/addon-fit`.
Files: `src/components/LiveDemo.tsx`, `src/components/ProjectSection.tsx`, `src/data.ts`, `src/index.css`

### 2026-03-18: React + Framer Motion first draft
Fixed double nesting (landing-page/landing-page/ → landing-page/). Removed vanilla HTML/CSS scaffold and Vite boilerplate. Ported all content into React components: Header, Section, ProjectCard, Footer. Added Framer Motion animations (fade-up on load for header, whileInView slide-up on cards with stagger, whileHover lift, section header slide-in). Project data extracted to data.ts. Builds clean.
Files: src/App.tsx, src/data.ts, src/index.css, src/components/{Header,Section,ProjectCard,Footer}.tsx

### 2026-03-18: Decision to rebuild with React + Framer Motion
Vanilla HTML+CSS scaffold was functional but too plain for a portfolio. Decided on React + Vite + Framer Motion for scroll animations, hover effects, and component reuse. Three.js deferred to later phase.

### 2026-03-18: Built landing page scaffold
index.html + style.css following LANDING_PAGE.md design doc. Dark theme, monospace, GitHub-style colors. 2-col live apps, 3-col other projects. Placeholder media boxes.

### 2026-03-17: Scaffolded project
Created directory structure, project files. Design doc at LANDING_PAGE.md.
