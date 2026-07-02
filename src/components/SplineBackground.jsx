import { useEffect, useRef } from 'react'

// Lightweight pillar orbs — 5 total, one per pillar
const PILLAR_ORBS = [
  { x: 0.75, docFrac: 0.08, r: 320, color: '0,212,170',   speed: 0.0003, phase: 0,   depth: 0.08 },
  { x: 0.12, docFrac: 0.22, r: 280, color: '255,107,53',  speed: 0.0002, phase: 2.1, depth: 0.10 },
  { x: 0.82, docFrac: 0.40, r: 300, color: '0,208,132',   speed: 0.00025,phase: 4.4, depth: 0.09 },
  { x: 0.25, docFrac: 0.60, r: 260, color: '167,139,250', speed: 0.00018,phase: 1.3, depth: 0.07 },
  { x: 0.68, docFrac: 0.78, r: 290, color: '56,189,248',  speed: 0.00022,phase: 3.7, depth: 0.09 },
  { x: 0.40, docFrac: 0.92, r: 240, color: '245,158,11',  speed: 0.00015,phase: 0.9, depth: 0.06 },
]

export default function SplineBackground() {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5) // cap for perf
    let frame = 0

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0

    function draw() {
      frame++
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)
      t += 1

      const scroll = scrollRef.current
      const docH = Math.max(document.documentElement.scrollHeight, H * 10)

      // Teal grid lines — only horizontal for perf
      ctx.strokeStyle = 'rgba(0,212,170,0.015)'
      ctx.lineWidth = 0.5
      const gridOff = (scroll * 0.1) % 60
      for (let y = -gridOff; y < H + 60; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Pillar orbs — simple radial gradients, no overdraw
      PILLAR_ORBS.forEach((orb) => {
        const breathe = Math.sin(t * orb.speed * 1000 + orb.phase) * 0.08
        const r = orb.r * (1 + breathe)
        const docY = orb.docFrac * docH + Math.sin(t * orb.speed * 600 + orb.phase) * 25
        const cy = docY - scroll * (1 - orb.depth)
        const cx = orb.x * W + Math.sin(t * orb.speed * 300 + orb.phase) * 15
        if (cy < -r * 1.5 || cy > H + r * 1.5) return
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0,   `rgba(${orb.color},0.22)`)
        g.addColorStop(0.5, `rgba(${orb.color},0.08)`)
        g.addColorStop(1,   `rgba(${orb.color},0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', mixBlendMode: 'screen',
      }}
    />
  )
}
