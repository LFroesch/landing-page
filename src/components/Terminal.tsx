import { useState, useRef, useEffect } from "react"

type Entry = {
  input: string
  output: string[]
}

const commands: Record<string, string[]> = {
  // ── visible in help ──
  help: [
    "available commands:",
    "",
    "  whoami       who is this guy",
    "  stack        languages and tools",
    "  projects     what i've built",
    "  history      how i got here",
    "  setup        what i work on",
    "  hometown     where i'm from",
    "  location     where i am now",
    "  contact      how to reach me",
    "  resume       get my resume",
    "  clear        clear terminal",
    "",
    "...or just try things. some commands aren't listed.",
  ],
  whoami: [
    "Lucas Froeschner",
    "software developer — backend, fullstack, terminal tools",
    "self-taught via Boot.dev and 50+ projects from scratch",
    "former network technician. career switcher. builder.",
  ],
  stack: [
    "languages   Go, TypeScript, Python, SQL, Bash",
    "frontend    React, Next.js, Tailwind, Vite",
    "backend     Gin, Express, Django, REST, WebSockets",
    "data        PostgreSQL, MongoDB, Redis, Drizzle",
    "infra       Docker, AWS, Nginx, CI/CD",
    "tui         Bubble Tea, Lip Gloss, charm stack",
    "ai          Claude Code, Ollama, Gemini API",
  ],
  projects: [
    "dev-codex     terminal-first project management (live)",
    "gather        location-based social platform (live)",
    "scout         tui file explorer — daily driver",
    "vox           voice-controlled desktop automation",
    "portmon       live port monitor",
    "gator         RSS feed aggregator",
    "",
    "...and 40+ others. github.com/LFroesch",
  ],
  history: [
    "mid-2024   first hello world. boot.dev. hooked immediately.",
    "late 2024  python, pygame, asteroids. first game.",
    "fall 2024  data structures, algorithms, OOP. the fundamentals.",
    "winter 24  godot. built a 3D RPG. thousands of downloads.",
    "spring 25  discovered the frontend. fell into react.",
    "summer 25  deep into Go. built 15+ TUI tools.",
    "fall 25    fullstack SaaS. dev codex. 200+ endpoints.",
    "now        job hunting. still building every day.",
  ],
  setup: [
    "os        WSL2 on Windows (linux daily driver)",
    "editor    Cursor + terminal",
    "terminal  zsh + tmux",
    "browser   Firefox",
    "font      JetBrains Mono",
    "theme     dark. always.",
  ],
  hometown: ["Iowa City, IA. hawkeye country."],
  location: ["North Bay Area, CA — open to remote"],
  contact: [
    "email     lucas.froeschner@gmail.com",
    "github    github.com/LFroesch",
    "linkedin  linkedin.com/in/lucas-froeschner187",
  ],
  resume: ["scroll up and click Resume. or just email me."],

  // ── hidden commands (not in help) ──
  dog: ["Brady. mass: 80lbs. energy: unlimited. listening skills: zero."],
  cat: ["no cat. dog person. see 'dog'."],
  sarah: ["my fiancee. she tolerates the mass coding sessions."],
  coffee: ["black. no sugar. no debate."],
  vim: ["i use it. no i will not elaborate."],
  emacs: ["no."],
  neovim: ["respect. but not yet."],
  btw: ["i use arch. just kidding. wsl2."],
  linux: ["WSL2 counts. fight me."],
  windows: ["only for gaming and ollama GPU passthrough."],
  go: ["best language. i will die on this hill."],
  rust: ["on the list. haven't pulled the trigger yet."],
  python: ["first love. we still talk."],
  typescript: ["necessary evil that grew on me."],
  "favorite project": ["scout. i use it every single day."],
  scout: ["my file explorer. vim keys, 4 search modes, git-aware. daily driver."],
  "dev-codex": ["200+ endpoints, 1000+ tests, terminal-native. my biggest build."],
  gather: ["location-based social platform. geospatial queries, real-time chat."],
  vox: ["voice-controlled desktop. say it, it happens."],
  "second-brain": ["you're looking at what it built."],
  dwight: ["terminal AI assistant. named after schrute. obviously."],
  games: ["chess, snake, blackjack, roguelike — all in the terminal. see tui-hub."],
  valheim: ["modded to hell. it's a problem."],
  music: ["everything. depends on the coding session."],
  adhd: ["yes. hyperfocus is a feature, not a bug."],
  age: ["started coding mid-2024. mass-produced projects since."],
  boot: ["boot.dev changed my life. not an ad, just true."],
  "boot.dev": ["where it all started. best decision i ever made."],
  hire: ["yes please. lucas.froeschner@gmail.com"],
  "hire me": ["yes please. lucas.froeschner@gmail.com"],
  salary: ["let's talk. lucas.froeschner@gmail.com"],
  remote: ["preferred. but open to hybrid."],
  sudo: ["you don't have permission to do that here."],
  "sudo rm -rf /": ["nice try."],
  "sudo su": ["permission denied. this isn't your machine."],
  "sudo secret": ["still denied. not how sudo works anyway."],
  secret: ["access denied."],
  ".secret": ["you found the file. but you can't open it."],
  "cat .secret": ["wouldn't you like to know."],
  "cat .bashrc": ["alias yolo='git push --force'", "...just kidding. i'm not a monster."],
  ls: [
    "dev-codex/  gather/  scout/  vox/  second-brain/",
    "README.md   .gitconfig   .bashrc   .secret",
  ],
  "ls -la": [
    "drwxr-xr-x  lucas  dev-codex/",
    "drwxr-xr-x  lucas  gather/",
    "drwxr-xr-x  lucas  scout/",
    "drwxr-xr-x  lucas  vox/",
    "drwxr-xr-x  lucas  second-brain/",
    "-rw-r--r--  lucas  README.md",
    "-rw-r--r--  lucas  .gitconfig",
    "-rw-r--r--  lucas  .bashrc",
    "-rw-------  lucas  .secret",
  ],
  pwd: ["/home/lucas"],
  cd: ["you're already home."],
  "cd ..": ["there's nothing above this."],
  "cd /": ["root access denied."],
  ping: ["pong."],
  "ping google.com": ["64 bytes from google.com: time=0ms", "the internet works."],
  echo: ["echo."],
  "echo hello": ["hello"],
  man: ["no manual available. just type 'help'."],
  date: [new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
  uptime: ["2 years and counting."],
  top: ["PID 1: coding. PID 2: more coding. PID 3: thinking about coding."],
  ps: ["PID 1: coding. that's it. that's the process list."],
  kill: ["you can't kill what won't stop."],
  rm: ["careful with that one."],
  mkdir: ["what are we making?"],
  touch: ["file created. just kidding."],
  git: ["status: always coding."],
  "git status": ["on branch: main", "changes: too many to list", "commits today: probably double digits"],
  "git log": ["commit: built something", "commit: built something else", "commit: you get the idea"],
  "git push": ["permission denied. this is a portfolio, not a repo."],
  npm: ["node_modules weighs more than my dog."],
  "npm install": ["added 847 packages. 0 vulnerabilities. somehow."],
  exit: ["you can't leave. you just got here."],
  quit: ["there is no quit. only build."],
  "ctrl+c": ["^C not recognized. try 'exit'. (it won't work either.)"],
  hello: ["hey."],
  hi: ["hey."],
  hey: ["sup."],
  thanks: ["anytime."],
  "thank you": ["anytime."],
  why: ["because i love building things."],
  how: ["one project at a time."],
  "meaning of life": ["42. next question."],
  42: ["you already know."],
  matrix: ["there is no spoon."],
  hack: ["this isn't a movie."],
  "": [],
}

export default function Terminal() {
  const [history, setHistory] = useState<Entry[]>([])
  const [input, setInput] = useState("")
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (history.length === 0) return
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [history])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    setCmdHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)

    if (trimmed === "clear") {
      setHistory([])
      setInput("")
      return
    }

    const output = commands[trimmed] ?? [
      `command not found: ${trimmed}`,
      `type 'help' for available commands`,
    ]

    setHistory((prev) => [...prev, { input: trimmed, output }])
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1)
      setHistoryIndex(next)
      if (cmdHistory[next]) setInput(cmdHistory[next])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = historyIndex - 1
      if (next < 0) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(next)
        setInput(cmdHistory[next])
      }
    }
  }

  return (
    <div
      className="terminal"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-body">
        <div className="terminal-welcome">
          <span className="terminal-session">guest@lucas ~</span>
          type 'help' to see what's here.
        </div>
        {history.map((entry, i) => (
          <div key={i} className="terminal-entry">
            <div className="terminal-input-line">
              <span className="terminal-prompt">&gt;</span>
              <span>{entry.input}</span>
            </div>
            {entry.output.map((line, j) => (
              <div key={j} className="terminal-output">
                {line || "\u00A0"}
              </div>
            ))}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
