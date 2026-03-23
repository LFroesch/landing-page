import { useRef, useEffect, useState, useCallback } from "react"
import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { Unicode11Addon } from "@xterm/addon-unicode11"
import "@xterm/xterm/css/xterm.css"

const WS_URL = import.meta.env.PROD
  ? "wss://froesch.dev/ws"
  : "ws://localhost:8090/ws"

type Status = "idle" | "connecting" | "connected" | "full" | "ended" | "error"

export default function LiveDemo() {
  const termRef = useRef<HTMLDivElement>(null)
  const termInstance = useRef<Terminal | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [shouldConnect, setShouldConnect] = useState(false)

  const cleanup = useCallback(() => {
    wsRef.current?.close()
    wsRef.current = null
    termInstance.current?.dispose()
    termInstance.current = null
    fitRef.current = null
  }, [])

  // Step 1: user clicks → show the terminal div
  const handleStart = useCallback(() => {
    setStatus("connecting")
    setShouldConnect(true)
  }, [])

  // Step 2: once the div is mounted, open xterm and connect WS
  useEffect(() => {
    if (!shouldConnect || !termRef.current || wsRef.current) return
    setShouldConnect(false)

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      allowProposedApi: true,
      theme: {
        background: "#111111",
        foreground: "#999999",
        cursor: "#ffffff",
        selectionBackground: "#333333",
      },
      rows: 24,
      cols: 80,
    })

    const fit = new FitAddon()
    const unicode11 = new Unicode11Addon()
    term.loadAddon(fit)
    term.loadAddon(unicode11)
    term.unicode.activeVersion = "11"
    termInstance.current = term
    fitRef.current = fit

    termRef.current.innerHTML = ""
    term.open(termRef.current)
    fit.fit()

    const ws = new WebSocket(WS_URL)
    ws.binaryType = "arraybuffer"
    wsRef.current = ws

    ws.onopen = () => {
      setStatus("connected")
      const dims = fit.proposeDimensions()
      if (dims) {
        ws.send(JSON.stringify({ type: "resize", cols: dims.cols, rows: dims.rows }))
      }
    }

    ws.onmessage = (e) => {
      if (e.data instanceof ArrayBuffer) {
        term.write(new Uint8Array(e.data))
      } else {
        term.write(e.data)
      }
    }

    ws.onerror = () => {
      setStatus("error")
      cleanup()
    }

    ws.onclose = (e) => {
      if (e.code === 1013 || e.reason?.includes("slots")) {
        setStatus("full")
      } else {
        setStatus("ended")
      }
      wsRef.current = null
    }

    term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data)
      }
    })

    const handleResize = () => {
      if (fitRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
        fitRef.current.fit()
        const dims = fitRef.current.proposeDimensions()
        if (dims) {
          wsRef.current.send(JSON.stringify({ type: "resize", cols: dims.cols, rows: dims.rows }))
        }
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [shouldConnect, cleanup])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  return (
    <div className="live-demo">
      <div className="live-demo-header">
        <span className="live-demo-title">live demo — scout</span>
        <span className="live-demo-status">
          {status === "connected" && <><span className="live-dot" /> connected</>}
          {status === "connecting" && "connecting..."}
          {status === "full" && "all demo slots in use — try again soon"}
          {status === "ended" && "session ended"}
          {status === "error" && "connection failed"}
        </span>
      </div>

      {status === "idle" ? (
        <button className="live-demo-start" onClick={handleStart}>
          demo scout in your browser
        </button>
      ) : (
        <div
          ref={termRef}
          className="live-demo-terminal"
        />
      )}

      {status !== "idle" && (
        <button
          className="live-demo-retry"
          onClick={() => {
            cleanup()
            setShouldConnect(false)
            setStatus("idle")
          }}
        >
          reload
        </button>
      )}

      <p className="live-demo-note">
        sandboxed session · read-only demo filesystem · 2 min limit
      </p>
    </div>
  )
}
