export default function MobileBlock() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
      <div style={{ width: '40px', height: '40px', background: '#00d4aa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: '#000' }}>S</span>
      </div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '32px', color: '#e8e6e3', marginBottom: '8px' }}>SETU</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#00d4aa', letterSpacing: '0.2em', marginBottom: '32px' }}>PEACE INTELLIGENCE PLATFORM</div>
      <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px', marginBottom: '24px' }}>
        SETU is optimized for desktop intelligence environments. Please access on a screen wider than 1024px for the full experience.
      </p>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.15em' }}>
        PEACE INTELLIGENCE UNIT · 2026
      </div>
    </div>
  )
}
