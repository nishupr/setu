import { useEffect, useRef } from 'react'

const ARCHIVES = [
  { id:'DA-001', title:'Voices of Amritsar',  lang:'Punjabi', year:'1947–1984', type:'Personal Narrative', dur:'18:42' },
  { id:'DA-002', title:'Dhaka Memories',       lang:'Bengali', year:'1971',      type:'Personal Narrative', dur:'24:10' },
  { id:'DA-003', title:'The Reconcilers of Bhiwandi', lang:'Marathi', year:'1984–1992', type:'Peacemaker Archive', dur:'31:05' },
  { id:'DA-004', title:'Letters from Hyderabad',lang:'Urdu',    year:'1948',      type:'Historical Document', dur:'09:57' },
]

export default function Dastaan() {
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

    const pins = [
      {x:25,y:38,label:'Punjab',count:187},{x:35,y:50,label:'Delhi',count:312},
      {x:55,y:62,label:'Bihar',count:224},{x:70,y:72,label:'W.Bengal',count:298},
      {x:30,y:72,label:'M.P.',count:156},{x:55,y:82,label:'Odisha',count:119},
      {x:40,y:88,label:'Maharashtra',count:267},{x:50,y:93,label:'Telangana',count:134},
      {x:30,y:97,label:'Kerala',count:178},
    ]
    const pts = [
      [0.42,0.05],[0.55,0.08],[0.65,0.12],[0.75,0.20],[0.80,0.30],[0.82,0.45],
      [0.78,0.55],[0.72,0.65],[0.75,0.75],[0.68,0.85],[0.60,0.90],[0.52,0.95],
      [0.45,0.98],[0.38,0.95],[0.30,0.90],[0.22,0.82],[0.18,0.72],[0.20,0.60],
      [0.15,0.48],[0.18,0.35],[0.22,0.22],[0.30,0.12],[0.38,0.07],
    ]

    function draw() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.fillStyle='#050805'; ctx.fillRect(0,0,W,H); t += 0.012

      ctx.strokeStyle='rgba(245,158,11,0.04)'; ctx.lineWidth=0.5
      for (let x=0;x<W;x+=28){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
      for (let y=0;y<H;y+=28){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}

      ctx.beginPath()
      pts.forEach(([px,py],i)=>{
        const x=px*W,y=py*H; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
      })
      ctx.closePath(); ctx.strokeStyle='rgba(245,158,11,0.18)'; ctx.lineWidth=1; ctx.stroke()
      ctx.fillStyle='rgba(245,158,11,0.02)'; ctx.fill()

      pins.forEach((pin,i) => {
        const px=(pin.x/100)*W, py=(pin.y/100)*H
        const pulse = 1+Math.sin(t*1.5+i*0.8)*0.25
        const glow = ctx.createRadialGradient(px,py,0,px,py,16*pulse)
        glow.addColorStop(0,'rgba(245,158,11,0.5)'); glow.addColorStop(1,'rgba(245,158,11,0)')
        ctx.beginPath(); ctx.arc(px,py,16*pulse,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill()
        ctx.beginPath(); ctx.arc(px,py,3,0,Math.PI*2); ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="dastaan" style={{ padding:0, background:'#000', overflow:'hidden' }}>

      <div className="fade-in section-bar">
        <div className="section-bar-line" style={{ background:'linear-gradient(90deg,transparent 0%,#f59e0b 50%,transparent 100%)' }} />
        <span className="section-bar-index" style={{ color:'rgba(245,158,11,0.6)', textShadow:'0 0 12px rgba(245,158,11,0.4)' }}>06 — Dastaan</span>
        <div className="section-bar-rule" style={{ background:'linear-gradient(90deg,rgba(245,158,11,0.18),transparent)' }} />
        <span className="section-bar-sub">MEMORY ARCHIVE · STORY · दास्तान</span>
      </div>

      {/* ── Headline + Map split ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'#0d0d0d', marginBottom:'1px' }}>
        <div className="fade-in" style={{ background:'#060606', padding:'52px 44px' }}>
          <h2 style={{
            fontFamily:'Syne,sans-serif', fontWeight:800,
            fontSize:'clamp(3.5rem,5.5vw,6.5rem)',
            lineHeight:0.88, letterSpacing:'-0.035em',
            color:'#e8e6e3', margin:'0 0 36px 0',
          }}>
            MEM<span style={{ color:'#f59e0b' }}>ORY</span><br />ARCHIVE
          </h2>
          <p className="glow-text" style={{
            fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
            color:'#3a3a3a', lineHeight:1.8,
            borderLeft:'2px solid #f59e0b', paddingLeft:'18px', margin:'0 0 32px 0',
          }}>
            Unhealed historical trauma is often the fuel for future conflicts. DASTAAN archives and acknowledges the past — providing closure and educating future generations through 2,450+ geographically pinned stories across 22 languages.
          </p>
          {/* Stats row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#111' }}>
            {[{val:'2,450+',label:'Stories'},{val:'22',label:'Languages'},{val:'80yrs',label:'Spanning'},{val:'412',label:'Pending'}].map(s => (
              <div key={s.label} style={{ background:'#050505', padding:'18px 12px', textAlign:'center' }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'22px', color:'#f59e0b', marginBottom:'4px' }}>{s.val}</div>
                <div className="label-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="fade-in" style={{ background:'#040404', padding:0, position:'relative' }}>
          <div style={{ position:'absolute', top:'12px', left:'16px', fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#f59e0b', letterSpacing:'0.2em', zIndex:2 }}>
            INTERACTIVE NARRATIVE MAP
          </div>
          <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block', minHeight:'380px' }} />
        </div>
      </div>

      {/* ── Audio archive table ── */}
      <div className="fade-in" style={{ borderTop:'1px solid #0d0d0d' }}>
        <div style={{ padding:'12px 24px', borderBottom:'1px solid #111', display:'grid', gridTemplateColumns:'1fr 80px 100px 120px 60px 50px', gap:'8px' }}>
          {['Title','Language','Period','Type','Duration','ID'].map(h => (
            <span key={h} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#2a2a2a', letterSpacing:'0.2em', textTransform:'uppercase' }}>{h}</span>
          ))}
        </div>
        {ARCHIVES.map(a => (
          <div key={a.id} className="row-item" style={{
            padding:'14px 24px', borderBottom:'1px solid #0c0c0c',
            display:'grid', gridTemplateColumns:'1fr 80px 100px 120px 60px 50px', alignItems:'center', gap:'8px',
          }}>
            <span className="glow-text" style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'13px', color:'#e8e6e3' }}>{a.title}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#555' }}>{a.lang}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#444' }}>{a.year}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'rgba(167,139,250,0.5)' }}>{a.type}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#555' }}>{a.dur}</span>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', color:'#333' }}>{a.id}</span>
          </div>
        ))}
        <div style={{ padding:'16px 24px', display:'flex', gap:'12px', alignItems:'center' }}>
          <div className="btn-primary" style={{ fontSize:'10px', padding:'8px 16px' }}>Submit Your Story</div>
          <span className="glow-text" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'#333', letterSpacing:'0.1em' }}>All submissions undergo ethical review</span>
        </div>
      </div>
    </section>
  )
}
