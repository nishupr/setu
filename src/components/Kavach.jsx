import { useEffect, useRef, useState, useCallback } from 'react'

function useMagnetic() {
  const ref = useRef(null)
  const onMouseMove = useCallback((e) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width
    const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height
    el.style.transform = `translate(${dx*10}px,${dy*10}px) scale(1.06)`
    el.style.textShadow = '0 0 24px rgba(255,107,53,0.45), 0 0 48px rgba(255,107,53,0.15)'
    el.style.filter = 'brightness(2.2)'
  }, [])
  const onMouseLeave = useCallback(() => {
    const el = ref.current; if (!el) return
    el.style.transform = ''; el.style.textShadow = ''; el.style.filter = ''
  }, [])
  return { ref, onMouseMove, onMouseLeave }
}

const ALERTS = [
  { id:'KV-001', region:'Varanasi South', level:'red',    countdown:'T-12H', narrative:'High-risk polarization narrative detected on 3 platforms', status:'PRIORITY' },
  { id:'KV-002', region:'Muzaffarnagar',  level:'yellow', countdown:'T-48H', narrative:'Spike in keyword "Bandh" — coordinated campaign suspected',   status:'VIGILANT' },
  { id:'KV-003', region:'Howrah North',   level:'yellow', countdown:'T-64H', narrative:'Unverified rumor spreading via WhatsApp groups — monitoring',  status:'VIGILANT' },
  { id:'KV-004', region:'Amritsar West',  level:'green',  countdown:'——',    narrative:'Stable. Sentiment within normal range. No anomalies.', status:'STABLE' },
]

const FEATURES = [
  { title:'High-Freq Scanning',    body:'Ingests thousands of digital footprints per minute across 14 regional languages — Twitter/X, Facebook, YouTube live.' },
  { title:'Bot Detection',         body:'Identifies coordinated inauthentic behavior, distinguishing organic citizen frustration from engineered campaigns.' },
  { title:'Regional Heatmap',      body:'Color-coded geographic zones allow administrators to click any sector and see the exact narratives driving shifts.' },
  { title:'AI Intelligence Brief', body:'When a threat is detected, KAVACH provides actionable counter-measures — deploying community leaders or releasing infographics.' },
]

export default function Kavach() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    let animId, t = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)

    const zones = [
      { x:0.35,y:0.40,r:0.12,color:'255,107,53', pulse:0.8 },
      { x:0.60,y:0.30,r:0.09,color:'245,158,11', pulse:1.2 },
      { x:0.70,y:0.60,r:0.07,color:'0,208,132',  pulse:1.5 },
      { x:0.25,y:0.65,r:0.08,color:'245,158,11', pulse:0.6 },
      { x:0.50,y:0.70,r:0.05,color:'0,208,132',  pulse:2.0 },
    ]

    function draw() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.fillStyle='#050805'; ctx.fillRect(0,0,W,H); t += 0.015

      ctx.strokeStyle = 'rgba(255,107,53,0.05)'; ctx.lineWidth = 0.5
      for (let x = 0; x < W; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
      for (let y = 0; y < H; y += 32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }

      const cx = W*0.5, cy = H*0.5, sweepR = Math.min(W,H)*0.42
      const sweepAngle = (t * 0.8) % (Math.PI * 2)
      ctx.save(); ctx.globalAlpha = 0.12
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,sweepR,sweepAngle-0.7,sweepAngle)
      ctx.fillStyle = 'rgba(255,107,53,0.4)'; ctx.fill(); ctx.restore()
      ctx.beginPath(); ctx.moveTo(cx,cy)
      ctx.lineTo(cx+Math.cos(sweepAngle)*sweepR, cy+Math.sin(sweepAngle)*sweepR)
      ctx.strokeStyle='rgba(255,107,53,0.5)'; ctx.lineWidth=1; ctx.stroke()

      ;[0.15,0.28,0.42].forEach(f => {
        ctx.beginPath(); ctx.arc(cx,cy,Math.min(W,H)*f,0,Math.PI*2)
        ctx.strokeStyle='rgba(255,107,53,0.08)'; ctx.lineWidth=0.5; ctx.stroke()
      })

      zones.forEach(z => {
        const zx=z.x*W, zy=z.y*H
        const breathe = 1 + Math.sin(t*z.pulse)*0.22
        const r = z.r*Math.min(W,H)*breathe
        const g = ctx.createRadialGradient(zx,zy,0,zx,zy,r)
        g.addColorStop(0,`rgba(${z.color},0.5)`); g.addColorStop(1,`rgba(${z.color},0)`)
        ctx.beginPath(); ctx.arc(zx,zy,r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
        ctx.beginPath(); ctx.arc(zx,zy,3,0,Math.PI*2); ctx.fillStyle=`rgba(${z.color},0.9)`; ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const mag = useMagnetic()

  return (
    <section id="kavach" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" style={{ background:'linear-gradient(90deg,transparent 0%,#ff6b35 50%,transparent 100%)' }} />
        <span className="section-bar-index" style={{ color:'rgba(255,107,53,0.6)', textShadow:'0 0 12px rgba(255,107,53,0.4)' }}>03 — Kavach</span>
        <div className="section-bar-rule" style={{ background:'linear-gradient(90deg,rgba(255,107,53,0.18),transparent)' }} />
        <span className="section-bar-sub">EARLY WARNING · SHIELD · कवच</span>
      </div>

      {/* ── Headline + description split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(3.5rem,5.5vw,6.5rem)',
            lineHeight:0.88, letterSpacing:'-0.035em',
            color:'#e8e6e3', margin:'0 0 36px 0',
          }}>
            EARLY<br />
            <span style={{ color:'#ff6b35' }}>WAR</span>NING<br />
            SYSTEM
          </h2>
          <p className="glow-text" style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
            color:'#3a3a3a', lineHeight:1.8,
            borderLeft:'2px solid #ff6b35', paddingLeft:'18px', margin:0,
          }}>
            KAVACH acts as the sensory nervous system of SETU. A district-level command center designed for intelligence units and local administration — monitoring the digital pulse of the nation in real-time.
          </p>
        </div>
        <div className="fade-in" style={{ background:'#040404', padding:0, position:'relative' }}>
          <div style={{ position:'absolute', top:'12px', left:'16px', fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#ff6b35', letterSpacing:'0.2em', zIndex:2 }}>
            REGIONAL SENTIMENT HEATMAP — LIVE
          </div>
          <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block', minHeight:'340px' }} />
          <div style={{ position:'absolute', bottom:'12px', right:'16px', display:'flex', gap:'12px' }}>
            {[['#ff6b35','PRIORITY'],['#f59e0b','VIGILANT'],['#00d084','STABLE']].map(([c,l]) => (
              <span key={l} style={{ display:'flex', alignItems:'center', gap:'4px', fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:c, letterSpacing:'0.1em' }}>
                <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:c, display:'inline-block' }} />{l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2×2 feature grid ── */}
      <div className="fade-in stagger-reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        {FEATURES.map(f => (
          <div key={f.title} className="principle-card" style={{ background:'#050505', padding:'28px 32px', borderLeftColor:'rgba(255,107,53,0.18)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#ff6b35', letterSpacing:'0.15em', opacity:0.6 }}>▪</span>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#c8c6c3' }}>{f.title}</span>
            </div>
            <p className="glow-text" style={{ fontSize:'12px', color:'#444', lineHeight:1.7, margin:0 }}>{f.body}</p>
          </div>
        ))}
      </div>

      {/* ── 72H Alert Queue ── */}
      <div className="fade-in" style={{ borderTop:'1px solid #0d0d0d' }}>
        <div style={{ padding:'12px 24px', borderBottom:'1px solid #111', display:'grid', gridTemplateColumns:'80px 120px 1fr 70px', gap:'8px' }}>
          {['Timer','Region','Narrative','ID'].map(h => (
            <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', letterSpacing:'0.2em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>
        {ALERTS.map((a,i) => (
          <div key={a.id} className="row-item" style={{
            padding:'14px 24px', borderBottom:'1px solid #0c0c0c',
            display:'grid', gridTemplateColumns:'80px 120px 1fr 70px',
            alignItems:'center', gap:'8px',
          }}>
            <span className={`alert-t-minus alert-${a.level}`}>{a.level==='green'?'STABLE':a.countdown}</span>
            <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'12px', color:'#e8e6e3' }}>{a.region}</span>
            <span className="glow-text" style={{ fontSize:'12px', color:'#555', lineHeight:1.5 }}>{a.narrative}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'#333', letterSpacing:'0.1em' }}>{a.id}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
