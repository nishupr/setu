import { useEffect, useRef, useState, useCallback } from 'react'

function useMagnetic(color = '0,212,170') {
  const ref = useRef(null)
  const onMouseMove = useCallback((e) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width
    const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height
    el.style.transform = `translate(${dx*10}px,${dy*10}px) scale(1.06)`
    el.style.textShadow = `0 0 24px rgba(${color},0.45), 0 0 48px rgba(${color},0.15)`
    el.style.filter = 'brightness(2.2)'
  }, [color])
  const onMouseLeave = useCallback(() => {
    const el = ref.current; if (!el) return
    el.style.transform = ''; el.style.textShadow = ''; el.style.filter = ''
  }, [])
  return { ref, onMouseMove, onMouseLeave }
}

function useCountUp(target, duration = 2000) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(typeof target === 'number' && target < 10 ? parseFloat((target * eased).toFixed(3)) : Math.round(target * eased))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { val, ref }
}

const KPIS = [
  { label:'Incidents Neutralized',      target:847,   suffix:'',  color:'#00d4aa', desc:'Localized conflicts prevented via KAVACH early intervention' },
  { label:'Avg Debunk Time',            target:4.2,   suffix:'h', color:'#00d084', desc:'Average time to debunk a viral claim — down from 72 hours' },
  { label:'Families Reunited',          target:2341,  suffix:'+', color:'#38bdf8', desc:'Successful matches through PANAH reunification hub' },
  { label:'Dialogue Participants',      target:18400, suffix:'+', color:'#a78bfa', desc:'Active users across SANGAM circles & town halls' },
  { label:'National Harmony Index',     target:0.912, suffix:'',  color:'#f59e0b', desc:'Aggregate stability score across monitored regions (0–1)' },
  { label:'Misinfo Neutralized',        target:3890,  suffix:'+', color:'#00d084', desc:'Claims verified/debunked via SACHCHI Pratyaksh Database' },
]

function KpiCard({ label, target, suffix, color, desc }) {
  const { val, ref } = useCountUp(target)
  const mag = useMagnetic(color.replace('#','').match(/../g).map(h=>parseInt(h,16)).join(','))

  return (
    <div ref={ref} style={{ background:'#030303', padding:'36px 28px 32px', overflow:'hidden', position:'relative' }}>
      <div
        ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave}
        style={{
          fontFamily:'Syne,sans-serif', fontWeight:800,
          fontSize:'clamp(2.8rem,4.5vw,5.5rem)',
          lineHeight:0.9, letterSpacing:'-0.03em',
          color, marginBottom:'16px', display:'inline-block',
          transition:'transform 0.18s ease, filter 0.18s ease, text-shadow 0.18s ease',
          cursor:'default',
        }}
      >{val}{suffix}</div>
      <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#e8e6e3', marginBottom:'8px' }}>{label}</div>
      <p className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#333', letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'pre-line', lineHeight:1.65 }}>{desc}</p>
    </div>
  )
}

export default function Impact() {
  return (
    <section id="impact" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">10 — Impact</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">MEASURING PEACE · KEY PERFORMANCE INDICATORS</span>
      </div>

      {/* ── Headline split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(3.5rem,5.5vw,6.5rem)',
            lineHeight:0.88, letterSpacing:'-0.035em',
            color:'#e8e6e3', margin:'0 0 36px 0',
          }}>
            MEAS<span style={{ color:'#00d4aa' }}>UR</span><br />ING<br />PEACE
          </h2>
          <p className="glow-text" style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
            color:'#3a3a3a', lineHeight:1.8,
            borderLeft:'2px solid #00d4aa', paddingLeft:'18px', margin:0,
          }}>
            SETU's effectiveness is not measured by engagement or screen time, but by tangible metrics of peace and stability — the only numbers that matter.
          </p>
        </div>
        <div className="fade-in" style={{ background:'#040404', padding:'52px 44px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#00d4aa', letterSpacing:'0.15em', marginBottom:'12px' }}>LIVE NATIONAL HARMONY INDEX</div>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(4rem,8vw,7rem)', color:'#00d4aa', lineHeight:0.9, marginBottom:'12px' }}>0.912</div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            <span style={{ width:'6px', height:'6px', background:'#00d4aa', display:'inline-block', borderRadius:'50%', animation:'breathePulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333', letterSpacing:'0.15em' }}>LIVE · UPDATED EVERY 60s</span>
          </div>
        </div>
      </div>

      {/* ── KPI grid — 3×2 with magnetic stat cards ── */}
      <div className="fade-in" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'#1c1c1c', marginBottom:'1px' }}>
        {KPIS.map(kpi => <KpiCard key={kpi.label} {...kpi} />)}
      </div>

    </section>
  )
}
