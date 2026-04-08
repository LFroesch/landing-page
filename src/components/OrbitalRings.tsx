import { useEffect, useRef } from "react"

export default function OrbitalRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let frame = 0
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // each arc is a wide, sweeping band — not a clean ellipse
    // they drift very slowly, almost like light pollution or a nebula edge
    const arcs = [
      { ry: 0.22, tilt: -18, speed: 0.00008, phase: 0, width: 80, opacity: 0.03 },
      { ry: 0.18, tilt: -10, speed: -0.00005, phase: 1.8, width: 120, opacity: 0.02 },
      { ry: 0.25, tilt: -25, speed: 0.00003, phase: 3.6, width: 50, opacity: 0.025 },
    ]

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width * 0.5
      const cy = canvas.height * 0.35
      // rx spans wider than the viewport so edges fade off-screen naturally
      const rx = Math.max(canvas.width, canvas.height) * 0.9

      for (const arc of arcs) {
        const ry = Math.max(canvas.width, canvas.height) * arc.ry
        const angle = arc.tilt * (Math.PI / 180) + frame * arc.speed + arc.phase

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)

        // draw the arc as a gradient stroke — bright center, fading edges
        // multiple passes at slightly different offsets to create a soft glow band
        const passes = 6
        for (let i = 0; i < passes; i++) {
          const t = i / (passes - 1) // 0 to 1
          const offset = (t - 0.5) * arc.width
          const falloff = 1 - Math.abs(t - 0.5) * 2 // 0 at edges, 1 at center
          const alpha = arc.opacity * falloff * falloff

          ctx.beginPath()
          ctx.ellipse(0, offset, rx, ry, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.lineWidth = arc.width / passes
          ctx.stroke()
        }

        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="orbital-rings"
    />
  )
}
