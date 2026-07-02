import { useRef, useEffect, useState, Fragment, useCallback } from 'react'

const PILLARS = [
  { label:'KAVACH',  color:'#ff6b35', r:255, g:107, b:53,  idx:0 },
  { label:'SACHCHI', color:'#00d084', r:0,   g:208, b:132, idx:1 },
  { label:'SANGAM',  color:'#a78bfa', r:167, g:139, b:250, idx:2 },
  { label:'DASTAAN', color:'#f59e0b', r:245, g:158, b:11,  idx:3 },
  { label:'PANAH',   color:'#38bdf8', r:56,  g:189, b:248, idx:4 },
]

const HERO_TEXT      = 'SETU'
const SCRAMBLE_CHARS = '!<>-_\\/[]{}@#$%^&*XZQJKVW0123456789'

// ── 3D math ──────────────────────────────────────────────────────────────────
function rotateY(p, a) {
  return { x: p.x*Math.cos(a)+p.z*Math.sin(a), y:p.y, z:-p.x*Math.sin(a)+p.z*Math.cos(a) }
}
function rotateX(p, a) {
  return { x:p.x, y:p.y*Math.cos(a)-p.z*Math.sin(a), z:p.y*Math.sin(a)+p.z*Math.cos(a) }
}
function project(p, fov, cx, cy) {
  const z = p.z + fov
  const s = fov / z
  return { x: cx + p.x*s, y: cy + p.y*s, s, z: p.z }
}

// ── Generate sphere points ────────────────────────────────────────────────────
function fibonacciSphere(n, R) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i/(n-1))*2
    const rad = Math.sqrt(1 - y*y)
    const theta = golden * i
    pts.push({ x: R*rad*Math.cos(theta), y: R*y, z: R*rad*Math.sin(theta) })
  }
  return pts
}

export default function Hero() {
  const canvasRef  = useRef(null)
  const mouseRef   = useRef({ x:0.5, y:0.5 })
  const tRef       = useRef(0)

  const [scrambleKey,  setScrambleKey]  = useState(0)
  const [scrambled,    setScrambled]    = useState(HERO_TEXT)
  const [scrambleDone, setScrambleDone] = useState(false)
  const [sub1, setSub1] = useState('')
  const [sub2, setSub2] = useState('')

  const SUB1 = "India's Peace Intelligence Platform."
  const SUB2 = 'Detect tension. Debunk lies. Bridge communities.'

  // ── Canvas 3D scene ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha:true })
    let animId
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Track mouse for parallax
    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      }
    }
    window.addEventListener('mousemove', onMove)

    // ── Build 3D scene ──────────────────────────────────────────────────
    const SPHERE_R = 380 // Expanded to fill space

    // 5 pillar nodes placed at pentagon on sphere equator
    const pillarNodes = PILLARS.map((p, i) => {
      const angle = (i/5)*Math.PI*2 - Math.PI/2
      return {
        ox: Math.cos(angle)*SPHERE_R*0.78,
        oy: Math.sin(angle * 0.4)*SPHERE_R*0.25 - 20,
        oz: Math.sin(angle)*SPHERE_R*0.78,
        pillar: true, ...p,
      }
    })

    // ~38 community nodes on sphere surface
    const communityNodes = fibonacciSphere(38, SPHERE_R).map(p => ({
      ox:p.x, oy:p.y, oz:p.z,
      pillar:false,
      color:'#e8e6e3', r:232, g:230, b:227,
    }))

    const allNodes = [...pillarNodes, ...communityNodes]

    // Build connections — pillar↔all within range, community within short range
    const CONNECTIONS = []
    for (let a = 0; a < allNodes.length; a++) {
      for (let b = a+1; b < allNodes.length; b++) {
        const nA=allNodes[a], nB=allNodes[b]
        const dist = Math.sqrt((nA.ox-nB.ox)**2+(nA.oy-nB.oy)**2+(nA.oz-nB.oz)**2)
        const threshold = (nA.pillar||nB.pillar) ? SPHERE_R*1.1 : SPHERE_R*0.72
        if (dist < threshold) CONNECTIONS.push({ a, b, dist, progress: Math.random() })
      }
    }

    // Rotation state — auto + mouse parallax
    let rotY = 0, rotX = 0
    let targetRX = 0, targetRY = 0

    const draw = () => {
      const t = (tRef.current += 0.008)
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.clearRect(0,0,W,H)

      // Smooth camera tilt toward mouse
      const mx = mouseRef.current.x, my = mouseRef.current.y
      targetRY = rotY + t*0.18 + (mx - 0.5)*0.35
      targetRX = (my - 0.5)*0.22
      const camY = targetRY
      const camX = targetRX

      const fov = Math.min(W,H)*1.7
      const cx = W * 0.72 // Shifted to right
      const cy = H * 0.5

      // Project all nodes
      const projected = allNodes.map((n, i) => {
        let p = { x:n.ox, y:n.oy, z:n.oz }
        p = rotateY(p, camY)
        p = rotateX(p, camX)
        const proj = project(p, fov, cx, cy)
        // depth factor 0..1
        const depth = (proj.z + SPHERE_R + fov) / (SPHERE_R*2 + fov)
        return { ...proj, depth, node:n }
      })

      // ── Atmospheric rings from center ──────────────────────────────────
      for (let ri=0; ri<4; ri++) {
        const phase = (t*0.4 + ri*0.7) % (Math.PI*2)
        const pulse = Math.sin(phase)*0.15
        const rr = (80 + ri*55)*(1+pulse)
        const alpha = 0.04 - ri*0.008
        ctx.beginPath(); ctx.ellipse(cx, cy, rr*1.35, rr*0.6, 0, 0, Math.PI*2)
        ctx.strokeStyle = `rgba(0,212,170,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke()
      }

      // ── Perspective grid floor ─────────────────────────────────────────
      const gY = H*0.78
      ctx.save(); ctx.globalAlpha = 0.06
      const vLines = 16, hLines = 8
      for (let i=0; i<=vLines; i++) {
        const fx = (i/vLines)*W
        ctx.beginPath(); ctx.moveTo(fx, gY)
        ctx.lineTo(cx + (fx-cx)*0.05, H*0.52)
        ctx.strokeStyle='#00d4aa'; ctx.lineWidth=0.5; ctx.stroke()
      }
      for (let i=1; i<=hLines; i++) {
        const fy = gY + (H-gY)*(i/hLines)
        const shrink = 1 - (fy-gY)/(H-gY)*0.85
        const midX = cx
        ctx.beginPath()
        ctx.moveTo(midX - W*0.5*shrink, fy)
        ctx.lineTo(midX + W*0.5*shrink, fy)
        ctx.strokeStyle='#00d4aa'; ctx.lineWidth=0.5; ctx.stroke()
      }
      ctx.restore()

      // ── Sort connections by average Z for painter's algorithm ──────────
      const sortedConns = [...CONNECTIONS].sort((cA,cB) => {
        const zA = (projected[cA.a].z + projected[cA.b].z)/2
        const zB = (projected[cB.a].z + projected[cB.b].z)/2
        return zA - zB
      })

      // ── Draw connections ───────────────────────────────────────────────
      sortedConns.forEach(conn => {
        const pA = projected[conn.a], pB = projected[conn.b]
        const nA = allNodes[conn.a],  nB = allNodes[conn.b]
        const avgDepth = (pA.depth + pB.depth)/2
        const alpha = avgDepth * (nA.pillar||nB.pillar ? 0.22 : 0.08)
        if (alpha < 0.005) return

        const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y)
        grad.addColorStop(0, `rgba(${nA.r},${nA.g},${nA.b},${alpha.toFixed(3)})`)
        grad.addColorStop(1, `rgba(${nB.r},${nB.g},${nB.b},${alpha.toFixed(3)})`)
        ctx.beginPath(); ctx.moveTo(pA.x, pA.y); ctx.lineTo(pB.x, pB.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = nA.pillar||nB.pillar ? pA.s*1.2 : pA.s*0.5
        ctx.stroke()

        // Animated energy packet along pillar connections
        if (nA.pillar || nB.pillar) {
          conn.progress = (conn.progress + 0.004) % 1
          const prog = conn.progress
          const px = pA.x + (pB.x-pA.x)*prog
          const py = pA.y + (pB.y-pA.y)*prog
          const packetColor = nA.pillar ? nA.color : nB.color
          const pAlpha = avgDepth * 0.8
          ctx.beginPath(); ctx.arc(px, py, pA.s*1.8, 0, Math.PI*2)
          ctx.fillStyle = packetColor + Math.round(pAlpha*255).toString(16).padStart(2,'0')
          ctx.fill()
        }
      })

      // ── Draw nodes — sorted back-to-front ─────────────────────────────
      const sortedNodes = [...projected].sort((a,b) => a.z - b.z)
      sortedNodes.forEach(({ x, y, s, depth, node }) => {
        if (depth < 0.02) return
        const base = depth

        if (node.pillar) {
          const pulse = 1 + Math.sin(t*2.2 + node.idx*1.25)*0.12
          const gR = s * 28 * pulse

          // Outer glow
          const g = ctx.createRadialGradient(x,y,0,x,y,gR)
          g.addColorStop(0, `rgba(${node.r},${node.g},${node.b},${(base*0.5).toFixed(2)})`)
          g.addColorStop(0.4, `rgba(${node.r},${node.g},${node.b},${(base*0.15).toFixed(2)})`)
          g.addColorStop(1, `rgba(${node.r},${node.g},${node.b},0)`)
          ctx.beginPath(); ctx.arc(x,y,gR,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()

          // Outer ring
          ctx.beginPath(); ctx.arc(x,y,s*9,0,Math.PI*2)
          ctx.strokeStyle=`${node.color}${Math.round(base*120).toString(16).padStart(2,'0')}`
          ctx.lineWidth=0.8; ctx.stroke()

          // Inner ring
          ctx.beginPath(); ctx.arc(x,y,s*5,0,Math.PI*2)
          ctx.strokeStyle=`${node.color}${Math.round(base*180).toString(16).padStart(2,'0')}`
          ctx.lineWidth=1.2; ctx.stroke()

          // Core dot
          ctx.beginPath(); ctx.arc(x,y,s*3.5,0,Math.PI*2)
          ctx.fillStyle=node.color; ctx.fill()

          // Label — only for front-facing nodes
          if (depth > 0.55) {
            ctx.save()
            ctx.font = `700 ${Math.max(8,s*9)}px JetBrains Mono, monospace`
            ctx.textAlign='center'; ctx.textBaseline='top'
            ctx.fillStyle=`${node.color}${Math.round(depth*180).toString(16).padStart(2,'0')}`
            ctx.fillText(node.label, x, y + s*12)
            ctx.restore()
          }
        } else {
          // Community node
          const alpha = base * 0.45
          const gR = s * 8
          const g = ctx.createRadialGradient(x,y,0,x,y,gR)
          g.addColorStop(0, `rgba(200,210,220,${(alpha*0.6).toFixed(2)})`)
          g.addColorStop(1, `rgba(200,210,220,0)`)
          ctx.beginPath(); ctx.arc(x,y,gR,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
          ctx.beginPath(); ctx.arc(x,y,s*1.5,0,Math.PI*2)
          ctx.fillStyle=`rgba(180,190,200,${alpha.toFixed(2)})`; ctx.fill()
        }
      })

      // ── Hub at center ─────────────────────────────────────────────────
      const hP = 1 + Math.sin(t*2.8)*0.12
      const hubX = cx, hubY = cy
      ;[60,38,22].forEach((r,i) => {
        const a = [0.04, 0.08, 0.12][i] * hP
        const g = ctx.createRadialGradient(hubX,hubY,0,hubX,hubY,r*hP)
        g.addColorStop(0, `rgba(0,212,170,${(a*2).toFixed(2)})`)
        g.addColorStop(1, `rgba(0,212,170,0)`)
        ctx.beginPath(); ctx.arc(hubX,hubY,r*hP,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
      })
      // Crosshair
      ctx.strokeStyle='rgba(0,212,170,0.3)'; ctx.lineWidth=0.7
      ctx.beginPath();ctx.moveTo(hubX-18,hubY);ctx.lineTo(hubX+18,hubY);ctx.stroke()
      ctx.beginPath();ctx.moveTo(hubX,hubY-18);ctx.lineTo(hubX,hubY+18);ctx.stroke()
      // Core
      ctx.beginPath();ctx.arc(hubX,hubY,3.5,0,Math.PI*2)
      ctx.fillStyle='#00d4aa';ctx.fill()

      // ── SETU text glow overlay at center ─────────────────────────────
      ctx.save()
      ctx.globalAlpha = 0.03
      ctx.font = `800 ${Math.min(W,H)*0.5}px Syne, sans-serif`
      ctx.textAlign='center';ctx.textBaseline='middle'
      ctx.fillStyle='#00d4aa'
      ctx.fillText('SETU', cx, cy)
      ctx.restore()

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  // ── Scramble ─────────────────────────────────────────────────────────────
  useEffect(() => { setTimeout(() => setScrambleKey(1), 500) }, [])

  useEffect(() => {
    if (scrambleKey === 0) return
    let frame = 0
    const id = setInterval(() => {
      const resolved = Math.floor(frame/1.4)
      setScrambled(HERO_TEXT.split('').map((ch,i) =>
        i < resolved ? ch : SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)]
      ).join(''))
      frame++
      if (resolved >= HERO_TEXT.length) { setScrambled(HERO_TEXT); setScrambleDone(true); clearInterval(id) }
    }, 25)
    return () => clearInterval(id)
  }, [scrambleKey])

  useEffect(() => {
    if (!scrambleDone) return
    let alive=true, i=0
    const id1 = setInterval(() => {
      if (!alive) return; i++; setSub1(SUB1.slice(0,i))
      if (i >= SUB1.length) {
        clearInterval(id1); let j=0
        const id2 = setInterval(() => {
          if (!alive){clearInterval(id2);return}; j++; setSub2(SUB2.slice(0,j))
          if (j>=SUB2.length) clearInterval(id2)
        }, 22)
      }
    }, 30)
    return () => { alive=false; clearInterval(id1) }
  }, [scrambleDone])

  const magMove  = useCallback(e => {
    const el=e.currentTarget,r=el.getBoundingClientRect()
    el.style.transform=`translate(${((e.clientX-(r.left+r.width/2))/r.width)*7}px,${((e.clientY-(r.top+r.height/2))/r.height)*7}px)`
  },[])
  const magLeave = useCallback(e => { e.currentTarget.style.transform='' },[])

  return (
    <section style={{ minHeight:'100vh', paddingTop:'52px', background:'transparent', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Full-bleed canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute',inset:0,width:'100%',height:'100%',willChange:'transform' }} />

      {/* Left text vignette */}
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.75) 30%,rgba(0,0,0,0.2) 55%,transparent 72%)',pointerEvents:'none',zIndex:1 }} />
      {/* Bottom fade */}
      <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'220px',background:'linear-gradient(to top,#000 0%,transparent 100%)',pointerEvents:'none',zIndex:1 }} />

      {/* Main hero content */}
      <div style={{ position:'relative',zIndex:2,flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 80px',maxWidth:'780px' }}>
        {/* Eyebrow label */}
        <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px' }}>
          <div style={{ display:'flex',gap:'4px' }}>
            {PILLARS.map(p => (
              <span key={p.label} style={{ width:'5px',height:'5px',background:p.color,display:'inline-block',opacity:0.7 }} />
            ))}
          </div>
          <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#3a3a3a',letterSpacing:'0.22em',textTransform:'uppercase' }}>
            Peace Intelligence Platform
          </span>
          <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#1c1c1c' }}>·</span>
          <span style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(0,212,170,0.35)',letterSpacing:'0.1em' }}>Concept Stage 2026</span>
        </div>

        {/* Giant title */}
        <h1
          className={scrambleDone ? 'hero-title-glow' : ''}
          style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(76px,13vw,165px)',lineHeight:0.84,letterSpacing:'-0.04em',color:'#e8e6e3',margin:'0 0 24px 0' }}
        >
          {scrambled.split('').map((ch,i) => (
            <span key={i} style={{ color:HERO_TEXT[i]===ch?(i===0?'#00d4aa':'#e8e6e3'):'#00d4aa' }}>{ch}</span>
          ))}
        </h1>

        {/* Sanskrit */}
        <div style={{ fontFamily:'Space Grotesk,sans-serif',fontWeight:400,fontSize:'13px',color:'rgba(0,212,170,0.4)',letterSpacing:'0.1em',marginBottom:'20px' }}>
          सेतु = Bridge &nbsp;·&nbsp; Ek platform jo todta nahi, jodta hai
        </div>

        {/* Typewriter */}
        <div style={{ minHeight:'72px',marginBottom:'40px' }}>
          <p style={{ fontFamily:'Syne,sans-serif',fontWeight:400,fontSize:'clamp(15px,1.6vw,22px)',color:'#777',lineHeight:1.5,margin:'0 0 6px 0' }}>
            {sub1}
            {sub1.length>0&&sub1.length<SUB1.length&&<span style={{ color:'#00d4aa',animation:'blink 0.7s step-end infinite' }}>|</span>}
          </p>
          {sub1.length===SUB1.length && (
            <p style={{ fontFamily:'Space Grotesk,sans-serif',fontWeight:300,fontSize:'clamp(13px,1.2vw,17px)',color:'#444',lineHeight:1.65,margin:0 }}>
              {sub2}
              {sub2.length>0&&sub2.length<SUB2.length&&<span style={{ color:'#00d4aa',animation:'blink 0.7s step-end infinite' }}>|</span>}
            </p>
          )}
        </div>

        {/* CTAs */}
        <div style={{ display:'flex',gap:'12px',marginBottom:'52px' }}>
          <a href="/signup" className="btn-primary" onMouseMove={magMove} onMouseLeave={magLeave}>
            Get Early Access
          </a>
          <a href="#problem" className="btn-outline" onMouseMove={magMove} onMouseLeave={magLeave}>
            Learn More
          </a>
        </div>

        {/* Pillar tags */}
        <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
          {PILLARS.map(p => (
            <span key={p.label} style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:p.color,border:`1px solid ${p.color}30`,padding:'4px 10px',letterSpacing:'0.12em',transition:'border-color 0.2s',cursor:'default' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=p.color+'80'}
              onMouseLeave={e=>e.currentTarget.style.borderColor=p.color+'30'}
            >{p.label}</span>
          ))}
        </div>
      </div>

      {/* Real stat bottom bar */}
      <div style={{ position:'relative',zIndex:2,borderTop:'1px solid #1c1e1c',display:'grid',gridTemplateColumns:'repeat(4,1fr)' }}>
        {[
          { value:'800+',  label:'Communal incidents / yr',  sub:'Source: NCRB 2022' },
          { value:'56%',   label:'Indians received fake news',sub:'Reuters Institute 2023' },
          { value:'72 hrs',label:'Avg time to debunk a claim',sub:'AltNews / BOOM cases' },
          { value:'20M+',  label:'Displaced since 1947',      sub:'IDMC / UNHCR estimates' },
        ].map((s,i) => (
          <div key={s.label} style={{ padding:'18px 32px',borderRight:i<3?'1px solid #1c1e1c':'none',background:'rgba(0,0,0,0.8)' }}>
            <div style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'24px',color:'#e8e6e3',lineHeight:1,marginBottom:'5px',fontVariantNumeric:'tabular-nums' }}>{s.value}</div>
            <div className="glow-text" style={{ fontFamily:'Space Grotesk,sans-serif',fontSize:'12px',color:'#444',marginBottom:'3px' }}>{s.label}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'8px',color:'#222',letterSpacing:'0.08em' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
