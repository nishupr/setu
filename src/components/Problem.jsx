import { useRef, useEffect, useState, useCallback } from 'react'

function useMagnetic() {
  const ref = useRef(null)
  const onMouseMove = useCallback((e) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX-(rect.left+rect.width/2))/rect.width
    const dy = (e.clientY-(rect.top+rect.height/2))/rect.height
    el.style.transform=`translate(${dx*10}px,${dy*10}px) scale(1.06)`
    el.style.textShadow='0 0 24px rgba(0,212,170,0.45), 0 0 48px rgba(0,212,170,0.15)'
    el.style.filter='brightness(2.2)'
  }, [])
  const onMouseLeave = useCallback(() => {
    const el = ref.current; if (!el) return
    el.style.transform=''; el.style.textShadow=''; el.style.filter=''
  }, [])
  return { ref, onMouseMove, onMouseLeave }
}

function StatCard({ num, suffix, label, sub, accent }) {
  const [display, setDisplay] = useState('—')
  const mag = useMagnetic()
  const started = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let v = 0, target = parseFloat(num)
        const id = setInterval(() => {
          v = Math.min(v + Math.ceil(target/40), target)
          setDisplay(v + (suffix||''))
          if (v >= target) clearInterval(id)
        }, 35)
      }
    }, { threshold:0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [num, suffix])

  return (
    <div ref={ref} style={{ background:'#030303', padding:'36px 28px 32px', overflow:'hidden', position:'relative' }}>
      <div ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave} style={{
        fontFamily:'Syne,sans-serif', fontWeight:800,
        fontSize:'clamp(2.8rem,4.5vw,5.5rem)',
        lineHeight:0.9, letterSpacing:'-0.03em',
        color: accent ? '#00d4aa' : '#e8e6e3',
        marginBottom:'14px', display:'inline-block',
        transition:'transform 0.18s ease, filter 0.18s ease, text-shadow 0.18s ease',
        cursor:'default',
      }}>{display}</div>
      <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#e8e6e3', marginBottom:'6px' }}>{label}</div>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#2a2a2a', letterSpacing:'0.1em', textTransform:'uppercase' }}>{sub}</div>
    </div>
  )
}

export default function Problem() {
  const stats = [
    { num:'800',  suffix:'+', label:'Communal incidents per year',          sub:'NCRB Annual Report 2022',           accent:false },
    { num:'56',   suffix:'%', label:'Indians received fake news on WhatsApp',sub:'Reuters Digital News Report 2023',  accent:true  },
    { num:'72',   suffix:'h', label:'Average time to debunk a viral claim',  sub:'AltNews / BOOM documented cases',   accent:false },
    { num:'20',   suffix:'M+',label:'Internally displaced since 1947',       sub:'IDMC / UNHCR India estimates',      accent:false },
  ]

  return (
    <section id="problem" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" />
        <span className="section-bar-index">01 — The Problem</span>
        <div className="section-bar-rule" />
        <span className="section-bar-sub">WHY SETU EXISTS · SCALE OF THE CRISIS</span>
      </div>

      {/* Headline + context */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(3.5rem,5.5vw,6.5rem)',lineHeight:0.88,letterSpacing:'-0.035em',color:'#e8e6e3',margin:'0 0 32px 0' }}>
            THE<br />FRAG<span style={{ color:'#00d4aa' }}>MEN</span><br />TATION
          </h2>
          <p className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'#3a3a3a',lineHeight:1.8,borderLeft:'2px solid #00d4aa',paddingLeft:'18px',margin:0 }}>
            Misinformation spreads 6× faster than truth online. In India, a single viral rumor can ignite communal tensions across multiple districts within hours — long before any official response is coordinated.
          </p>
        </div>
        <div className="fade-in" style={{ background:'#040404',padding:'52px 44px',display:'flex',flexDirection:'column',gap:'20px',justifyContent:'center' }}>
          <p className="glow-text" style={{ color:'#666',lineHeight:1.9,fontSize:'15px',margin:0 }}>
            India has over 4,500 distinct communities speaking 121 major languages. This diversity is a strength — but it also means that misinformation can be tailored to exploit local tensions in ways that national media never detects in time.
          </p>
          <p className="glow-text" style={{ color:'#444',lineHeight:1.8,fontSize:'13px',margin:0 }}>
            The 2013 Muzaffarnagar riots began with a fabricated video. The 2020 Delhi violence was preceded by weeks of targeted social media campaigns. In each case, the intelligence existed — but no system connected the dots fast enough.
          </p>
          <div style={{ borderLeft:'3px solid #00d4aa',paddingLeft:'20px' }}>
            <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'13px',color:'#00d4aa',marginBottom:'4px' }}>Source: Ministry of Home Affairs</div>
            <p className="glow-text" style={{ color:'#444',fontSize:'12px',lineHeight:1.7,margin:0 }}>India recorded 857 communal incidents in 2022 alone, resulting in 167 deaths and 1,249 injuries. The majority were preceded by verifiable digital warning signals.</p>
          </div>
        </div>
      </div>

      {/* Stat cards — 4 col magnetic */}
      <div className="fade-in" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'#1c1c1c' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
    </section>
  )
}
