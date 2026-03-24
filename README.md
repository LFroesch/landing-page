# Portfolio Landing Page

Personal portfolio site. Dark theme, terminal aesthetic, brutalist-professional design.

**Live:** [lucasfroeschner.com](https://lucasfroeschner.com) (or wherever you're hosting it)

## Tech Stack:

- React 19 + TypeScript
- Vite 8
- Framer Motion (scroll/hover animations)
- xterm.js (live TUI demo via WebSocket)
- Nginx on DigitalOcean droplet

## Run Locally

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Built files go to `dist/`. GitHub Actions deploys to the droplet via SCP on push to `main`.

## Features

- Full-page vertical scroll with alternating project sections
- Live terminal demo (Scout TUI via xterm.js + WebSocket)
- "Currently" section showing active learning/building
- Scroll-to-top button
- Mobile-responsive
