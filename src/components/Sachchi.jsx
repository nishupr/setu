import { useState } from 'react'

const CHECKS = {
  SACH: [
    { id:'SC-001', title:'Delhi Water Board Expansion Project', state:'Delhi', date:'2026-06-28', sources:'PIB, Times of India, DJB official', detail:'Budget of ₹4,200 crore officially approved. Construction begins Q3 2026.' },
    { id:'SC-002', title:'Election Commission Date Announcement', state:'Uttar Pradesh', date:'2026-06-25', sources:'ECI official website, PTI newswire', detail:'Dates confirmed per official ECI press release dated June 24.' },
    { id:'SC-003', title:'PM Relief Fund for Kerala Floods', state:'Kerala', date:'2026-06-20', sources:'PMO press release, NDRF official', detail:'₹500 crore released. Confirmed by Ministry of Home Affairs.' },
  ],
  GALAT: [
    { id:'GL-001', title:'"Army deployed in Howrah" viral video', state:'West Bengal', date:'2026-06-29', sources:'Ground reporters, West Bengal Police', detail:'Video is from 2019 CAA protests, not current. Police confirm no deployment.' },
    { id:'GL-002', title:'"UPI to be taxed 18% from July"', state:'National', date:'2026-06-27', sources:'RBI official, NPCI statement', detail:'Completely false. No such regulation exists. RBI denies outright.' },
    { id:'GL-003', title:'"Temple in Ayodhya attacked by mob"', state:'Uttar Pradesh', date:'2026-06-24', sources:'AltNews, BOOM FactCheck', detail:'Image is from Pakistan, 2021. No such incident occurred in Ayodhya.' },
  ],
  MISLEADING: [
    { id:'ML-001', title:'"Unemployment at 8%" — out of context', state:'National', date:'2026-06-28', sources:'CMIE data, ministry clarification', detail:'Figure is from 2022 quarterly report. Current rate stands at 6.1%.' },
    { id:'ML-002', title:'"Only X religion students get scholarships"', state:'Karnataka', date:'2026-06-22', sources:'Education Ministry data', detail:'True that scheme exists, but OBC/SC/ST students receive 4x more funding.' },
  ],
}

const TAB_COLORS = { SACH:'#00d084', GALAT:'#ff6b35', MISLEADING:'#f59e0b' }

export default function Sachchi() {
  const [tab, setTab] = useState('SACH')

  return (
    <section id="sachchi" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" style={{ background:'linear-gradient(90deg,transparent 0%,#00d084 50%,transparent 100%)' }} />
        <span className="section-bar-index" style={{ color:'rgba(0,208,132,0.6)', textShadow:'0 0 12px rgba(0,208,132,0.4)' }}>04 — Sachchi</span>
        <div className="section-bar-rule" style={{ background:'linear-gradient(90deg,rgba(0,208,132,0.18),transparent)' }} />
        <span className="section-bar-sub">MISINFORMATION KILLER · TRUTH · सच्ची</span>
      </div>

      {/* ── Headline + Deepfake Lab split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(3.5rem,5.5vw,6.5rem)',
            lineHeight:0.88, letterSpacing:'-0.035em',
            color:'#e8e6e3', margin:'0 0 36px 0',
          }}>
            MISINFO<br />
            <span style={{ color:'#00d084' }}>KILL</span>ER
          </h2>
          <p className="glow-text" style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
            color:'#3a3a3a', lineHeight:1.8,
            borderLeft:'2px solid #00d084', paddingLeft:'18px', margin:'0 0 32px 0',
          }}>
            The public-facing fact-checking engine of SETU. SACHCHI empowers citizens to verify the media they consume, breaking the viral chain of misinformation across 14 regional languages.
          </p>
          {/* Citizen tools */}
          <div className="fade-in stagger-reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#111' }}>
            {['Source Check','Reverse Lookup','Archive Tools','Linguistic Cues'].map(s => (
              <div key={s} className="row-item" style={{ background:'#050505', padding:'14px 18px', display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ width:'4px', height:'4px', background:'#00d084', display:'inline-block', flexShrink:0 }} />
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555', letterSpacing:'0.08em' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="fade-in" style={{ background:'#040404', padding:'36px 36px', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'16px', color:'#e8e6e3' }}>Deepfake Lab</span>
            <span className="tag-sach">ACTIVE</span>
          </div>
          {[
            { label:'Facial Muscle Analysis', score:94, color:'#00d084' },
            { label:'Respiratory Mismatch',   score:88, color:'#00d084' },
            { label:'Lighting Artifact Detect',score:76, color:'#f59e0b' },
            { label:'Audio-Video Sync',       score:91, color:'#00d084' },
          ].map(m => (
            <div key={m.label} style={{ marginBottom:'18px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                <span className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555', letterSpacing:'0.08em' }}>{m.label}</span>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:m.color }}>{m.score}%</span>
              </div>
              <div className="pillar-bar"><div className="pillar-bar-fill" style={{ width:`${m.score}%`, background:m.color }} /></div>
            </div>
          ))}
          <div style={{ marginTop:'auto', paddingTop:'20px', borderTop:'1px solid #1c1c1c', display:'flex', gap:'12px', alignItems:'center' }}>
            <div className="btn-outline" style={{ fontSize:'10px', padding:'8px 16px' }}>Upload Media</div>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333', letterSpacing:'0.1em' }}>Secure · Encrypted · Anonymous</span>
          </div>
        </div>
      </div>

      {/* ── Pratyaksh Database ── */}
      <div className="fade-in" style={{ borderTop:'1px solid #0d0d0d' }}>
        <div style={{ padding:'16px 24px', borderBottom:'1px solid #111', display:'flex', gap:'12px', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555', letterSpacing:'0.25em', textTransform:'uppercase' }}>THE PRATYAKSH DATABASE — LATEST CHECKS</span>
          <div style={{ display:'flex', gap:'2px' }}>
            {['SACH','GALAT','MISLEADING'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontFamily:'JetBrains Mono,monospace', fontSize:'10px', letterSpacing:'0.1em',
                padding:'6px 14px', border:`1px solid ${tab===t?TAB_COLORS[t]:'#1c1c1c'}`,
                background:tab===t?`${TAB_COLORS[t]}15`:'transparent',
                color:tab===t?TAB_COLORS[t]:'#444', cursor:'pointer', transition:'all 0.2s',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Alert table header */}
        <div style={{ padding:'8px 24px', borderBottom:'1px solid #111', display:'grid', gridTemplateColumns:'1fr 100px 90px 70px', gap:'8px' }}>
          {['Claim','State','Date','ID'].map(h => (
            <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', letterSpacing:'0.2em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>

        {CHECKS[tab].map((c,i) => (
          <div key={c.id} className="row-item" style={{
            padding:'16px 24px', borderBottom:'1px solid #0c0c0c',
            display:'grid', gridTemplateColumns:'1fr 100px 90px 70px',
            alignItems:'start', gap:'8px',
          }}>
            <div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'13px', color:'#e8e6e3', marginBottom:'6px' }}>{c.title}</div>
              <p className="glow-text" style={{ color:'#444', fontSize:'12px', lineHeight:1.6, margin:'0 0 4px 0' }}>{c.detail}</p>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333' }}>Sources: {c.sources}</span>
            </div>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555' }}>{c.state}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333' }}>{c.date}</span>
            <span className={`tag-${tab.toLowerCase()}`}>{tab}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
