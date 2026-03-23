export type Activity = {
  label: string
  category: "learning" | "building" | "career"
}

export const currentActivity: Activity[] = [
  { label: "gRPC + protobuf in Go", category: "learning" },
  { label: "TUI ecosystem — BubbleTea apps", category: "building" },
  { label: "Message queues (NATS)", category: "learning" },
  { label: "Backend / fullstack roles", category: "career" },
]

export type Project = {
  name: string
  tagline: string
  highlights: string[]
  tech: string[]
  github: string
  liveUrl?: string
  hasLiveDemo?: boolean
  screenshot?: string
}

export const projects: Project[] = [
  {
    name: "Dev Codex",
    tagline: "Terminal-first project management",
    highlights: [
      "200+ REST endpoints, 1000+ Jest tests",
      "Browser-native terminal — 70+ slash commands, autocomplete, batch execution",
      "Built-in AI assistant with multi-turn sessions and SSE streaming",
      "Real-time collab via Socket.IO — note locking, presence, activity feeds",
      "Stripe billing, JWT/OAuth auth, self-hostable",
    ],
    tech: ["TypeScript", "React", "Express", "MongoDB", "Socket.IO", "Stripe"],
    github: "https://github.com/LFroesch/dev-codex",
    liveUrl: "https://dev-codex.com",
    screenshot: "/dc_terminal.png",
  },
  {
    name: "Gather",
    tagline: "Location-based social platform",
    highlights: [
      "Geospatial event discovery with MongoDB $geoNear",
      "Real-time messaging, online/offline presence, friendship-gated DMs",
      "Social feed, follows, community polls, song voting with daily charts",
      "~50 API endpoints, admin dashboard, 32 themes",
    ],
    tech: ["React", "Express", "MongoDB", "Socket.IO", "Cloudinary"],
    github: "https://github.com/LFroesch/gather",
    liveUrl: "https://gather.froesch.dev",
    screenshot: "/gather_event.png",
  },
  {
    name: "Scout",
    tagline: "TUI file explorer — my daily driver",
    highlights: [
      "Built to replace default file navigation",
      "4 search modes: directory, recursive, content via ripgrep, ultra",
      "Full file ops with trash-based undo, git-aware UI, frecency bookmarks",
      "Cross-platform binaries with curl install script",
    ],
    tech: ["Go", "Bubble Tea", "Lip Gloss"],
    github: "https://github.com/LFroesch/scout",
    hasLiveDemo: true,
  },
  {
    name: "Vox",
    tagline: "Voice-controlled desktop automation",
    highlights: [
      "5-step NLP pipeline: intents → search → phrase → fuzzy → fallback",
      "Workflow engine — batch-launch apps, terminals, URLs in sequence",
      "Save/restore multi-monitor window layouts",
      "NLP reminders with recurring schedules",
    ],
    tech: ["Python", "PyQt6", "SpeechRecognition", "pywin32"],
    github: "https://github.com/LFroesch/vox",
    screenshot: "/vox-layouts.png",
  },
]
