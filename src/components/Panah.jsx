import { useRef, useCallback } from 'react'

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

const CAMPS = [
  { name:'Shanti Niketan Center',    sector:'Sector 7, Varanasi',  dist:'2.3 km', capacity:68, security:92, status:'OPEN' },
  { name:'Aashraya Relief Hub',      sector:'Muzaffarnagar North', dist:'5.1 km', capacity:81, security:88, status:'OPEN' },
  { name:'Sahara Community Shelter', sector:'Sector 12, Howrah',   dist:'8.7 km', capacity:54, security:95, status:'OPEN' },
  { name:'Umeed Transit Camp',       sector:'South Delhi Zone',    dist:'12.4km', capacity:93, security:79, status:'FILLING' },
]

const SCHEMES = [
  { title:'Social Security Credit',       badge:'TIER-1',  color:'#38bdf8' },
  { title:'Trauma & Mental Wellness',     badge:'ACTIVE',  color:'#a78bfa' },
  { title:'Universal Ration Entitlement', badge:'ACTIVE',  color:'#00d084' },
  { title:'Temporary Legal Identity',     badge:'INSTANT', color:'#00d4aa' },
]

export default function Panah() {
  const mag1 = useMagnetic('56,189,248')
  const mag2 = useMagnetic('0,208,132')
  const mag3 = useMagnetic('56,189,248')

  return (
    <section id="panah" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" style={{ background:'linear-gradient(90deg,transparent 0%,#38bdf8 50%,transparent 100%)' }} />
        <span className="section-bar-index" style={{ color:'rgba(56,189,248,0.6)', textShadow:'0 0 12px rgba(56,189,248,0.4)' }}>07 — Panah</span>
        <div className="section-bar-rule" style={{ background:'linear-gradient(90deg,rgba(56,189,248,0.18),transparent)' }} />
        <span className="section-bar-sub">DISPLACED PERSON SUPPORT · REFUGE · पनाह</span>
      </div>

      {/* ── Headline + P-ID split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(3.5rem,5.5vw,6.5rem)',
            lineHeight:0.88, letterSpacing:'-0.035em',
            color:'#e8e6e3', margin:'0 0 36px 0',
          }}>
            DIS<span style={{ color:'#38bdf8' }}>PLA</span>CED<br />SUPPORT
          </h2>
          <p className="glow-text" style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
            color:'#3a3a3a', lineHeight:1.8,
            borderLeft:'2px solid #38bdf8', paddingLeft:'18px', margin:0,
          }}>
            When preventative measures fail and conflict results in displacement, PANAH activates as a critical humanitarian logistics hub — ensuring dignity, identity, and reunification for those separated from home.
          </p>
        </div>
        <div className="fade-in" style={{ background:'#040404', padding:'36px 36px', display:'flex', flexDirection:'column', gap:'16px' }}>
          {/* P-ID */}
          <div style={{ display:'flex', gap:'20px', alignItems:'center', marginBottom:'8px' }}>
            <div style={{ width:'72px', height:'72px', border:'1px solid rgba(56,189,248,0.25)', display:'flex', alignItems:'center', justifyContent:'center', background:'#050a0a', flexShrink:0 }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,7px)', gap:'1px' }}>
                {Array.from({length:49}).map((_,i)=>(
                  <div key={i} style={{ width:'7px', height:'7px', background:[0,1,2,7,8,9,14,16,23,24,25,32,39,40,41,42,43,47,48].includes(i)?'#38bdf8':'transparent' }} />
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'16px', color:'#e8e6e3', marginBottom:'4px' }}>P-ID System</div>
              <p className="glow-text" style={{ color:'#444', fontSize:'12px', lineHeight:1.65, margin:0 }}>Digital Identity Token — scan at any kiosk for medical history, ration entitlements, status.</p>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'#38bdf8', letterSpacing:'0.12em' }}>ENCRYPTED · PRIVACY-FIRST · EPHEMERAL</span>
            </div>
          </div>
          {/* Reunification stats — magnetic */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1px', background:'#111' }}>
            {[
              {val:'2,341',label:'Matched',color:'#00d084',mag:mag1},
              {val:'184',label:'Searching',color:'#f59e0b',mag:mag2},
              {val:'98.2%',label:'Match Rate',color:'#38bdf8',mag:mag3},
            ].map(m => (
              <div key={m.label} style={{ background:'#050505', padding:'20px 16px', textAlign:'center' }}>
                <div ref={m.mag.ref} onMouseMove={m.mag.onMouseMove} onMouseLeave={m.mag.onMouseLeave} style={{
                  fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,2.5vw,2.8rem)',
                  lineHeight:0.9, color:m.color, marginBottom:'6px', display:'inline-block',
                  transition:'transform 0.18s ease, filter 0.18s ease, text-shadow 0.18s ease', cursor:'default',
                }}>{m.val}</div>
                <div className="label-mono">{m.label}</div>
              </div>
            ))}
          </div>
          {/* Scheme tags */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#111' }}>
            {SCHEMES.map(s => (
              <div key={s.title} className="row-item" style={{ background:'#050505', padding:'14px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'11px', color:'#e8e6e3' }}>{s.title}</span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:s.color, border:`1px solid ${s.color}40`, padding:'1px 5px' }}>{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Relief camp table ── */}
      <div className="fade-in" style={{ borderTop:'1px solid #0d0d0d' }}>
        <div style={{ padding:'12px 24px', borderBottom:'1px solid #111', display:'grid', gridTemplateColumns:'1fr 160px 60px 80px 80px 60px', gap:'8px' }}>
          {['Camp Name','Sector','Dist','Capacity','Security','Status'].map(h => (
            <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', letterSpacing:'0.2em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>
        {CAMPS.map(c => (
          <div key={c.name} className="row-item" style={{
            padding:'14px 24px', borderBottom:'1px solid #0c0c0c',
            display:'grid', gridTemplateColumns:'1fr 160px 60px 80px 80px 60px', alignItems:'center', gap:'8px',
          }}>
            <span className="glow-text" style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#e8e6e3' }}>{c.name}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555' }}>{c.sector}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#38bdf8' }}>{c.dist}</span>
            <div>
              <div className="pillar-bar"><div className="pillar-bar-fill" style={{ width:`${c.capacity}%`, background:c.capacity>85?'#f59e0b':'#00d084' }} /></div>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'#444' }}>{c.capacity}%</span>
            </div>
            <div>
              <div className="pillar-bar"><div className="pillar-bar-fill" style={{ width:`${c.security}%`, background:'#38bdf8' }} /></div>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'#444' }}>{c.security}%</span>
            </div>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:c.status==='OPEN'?'#00d084':'#f59e0b' }}>{c.status}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
