import { useState, useEffect, useRef } from "react"

type Plane = {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  speed: number
  direction: number
  turnRate: number
  patterns: { freq: number; amp: number; phase: number }[]
  // cooldown: after a strong turn, dampen turning so planes glide straight before next move
  cooldown: number
  // random drift target that shifts occasionally — adds unpredictability on top of sine patterns
  drift: number
  driftTimer: number
  tick: number
  opacity: number
}

function createPlane(scatter = true): Plane {
  const goingRight = Math.random() > 0.35
  const baseAngle = goingRight
    ? -0.2 + Math.random() * 0.4
    : Math.PI + (-0.2 + Math.random() * 0.4)

  const depth = Math.random()
  const scale = depth < 0.4 ? 0.4 + Math.random() * 0.3 : depth < 0.75 ? 0.7 + Math.random() * 0.4 : 1.0 + Math.random() * 0.5
  const speed = scale * (0.5 + Math.random() * 0.9)
  const opacity = 0.04 + scale * (0.06 + Math.random() * 0.06)

  // each plane gets 2-3 layered sine patterns that combine into unique flight paths
  // — some will swoop, some will loop, some will do lazy S-curves
  const patternCount = 2 + Math.floor(Math.random() * 2)
  const patterns = Array.from({ length: patternCount }, () => ({
    freq: 0.008 + Math.random() * 0.025,  // how fast this wave oscillates
    amp: 0.015 + Math.random() * 0.04,    // how much it turns per frame
    phase: Math.random() * Math.PI * 2,   // offset so planes aren't in sync
  }))

  // occasionally give a plane a tight loop pattern
  if (Math.random() < 0.25) {
    patterns.push({
      freq: 0.003 + Math.random() * 0.005, // slow build
      amp: 0.05 + Math.random() * 0.03,    // strong enough to loop
      phase: Math.random() * Math.PI * 2,
    })
  }

  const w = window.innerWidth
  const h = window.innerHeight

  return {
    id: Math.random(),
    x: scatter ? Math.random() * w : (goingRight ? -80 : w + 80),
    y: scatter ? Math.random() * h : Math.random() * h * 0.7,
    rotation: (baseAngle * 180) / Math.PI,
    scale,
    speed,
    direction: baseAngle,
    turnRate: 0,
    patterns,
    cooldown: 0,
    drift: 0,
    driftTimer: 60 + Math.floor(Math.random() * 120),
    tick: scatter ? Math.floor(Math.random() * 500) : 0,
    opacity: Math.min(opacity, 0.22),
  }
}

export default function PaperPlanes() {
  const [planes, setPlanes] = useState<Plane[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    setPlanes(Array.from({ length: 25 }, () => createPlane(true)))

    const interval = setInterval(() => {
      frameRef.current++

      setPlanes((prev) =>
        prev.map((plane) => {
          const t = plane.tick + 1
          let cooldown = Math.max(0, plane.cooldown - 1)
          let drift = plane.drift
          let driftTimer = plane.driftTimer - 1

          // random drift shifts occasionally — adds chaos the sine waves alone don't have
          if (driftTimer <= 0) {
            drift = (Math.random() - 0.5) * 0.025
            driftTimer = 80 + Math.floor(Math.random() * 200)
          }

          // sum sine patterns + random drift
          let turnForce = drift
          for (const p of plane.patterns) {
            turnForce += Math.sin(t * p.freq + p.phase) * p.amp
          }

          // cooldown: after a big turn, dampen force so the plane glides straight for a bit
          const cooldownDampen = cooldown > 0 ? 0.15 : 1
          turnForce *= cooldownDampen

          // if turn force is strong, trigger cooldown after it plays out
          if (Math.abs(turnForce) > 0.03 && cooldown === 0) {
            cooldown = 40 + Math.floor(Math.random() * 60)
          }

          // smoother easing — 0.04 lerp for gentle banking
          const turnRate = plane.turnRate + (turnForce - plane.turnRate) * 0.04
          const dir = plane.direction + turnRate

          const nosePitch = Math.sin(dir)
          const gravity = 0.02 + Math.max(0, -nosePitch) * 0.02

          const x = plane.x + Math.cos(dir) * plane.speed
          const y = plane.y + Math.sin(dir) * plane.speed + gravity
          const w = window.innerWidth
          const h = window.innerHeight

          if (x < -120 || x > w + 120 || y < -120 || y > h + 120) {
            return createPlane(false)
          }

          return {
            ...plane,
            x,
            y,
            direction: dir,
            turnRate,
            cooldown,
            drift,
            driftTimer,
            tick: t,
            rotation: (dir * 180) / Math.PI,
          }
        })
      )
    }, 33)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="paper-planes">
      {planes.map((p) => (
        <div
          key={p.id}
          className="plane"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
            opacity: p.opacity,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          >
            <path d="M3 3l18 9-18 9 4-9z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
