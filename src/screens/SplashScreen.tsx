import React from 'react';

interface Props {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: Props) {
  return (
    <div className="screen" style={{ background: '#0a0a0a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', pointerEvents: 'none' }} />

      {/* Logo */}
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginBottom: 60 }}>
        {/* FC mark */}
        <div style={{ position: 'relative' }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'pulse-ring 2.5s ease infinite' }} />
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(0,200,150,0.08)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'pulse-ring 2.5s ease infinite 0.4s' }} />
          <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, #00C896 0%, #00a07a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, boxShadow: '0 8px 32px rgba(0,200,150,0.4)' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: '#000', letterSpacing: '-0.04em' }}>FC</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.03em', marginBottom: 8 }}>
            FormCoach
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#85948c', lineHeight: 1.5, maxWidth: 240, textAlign: 'center' }}>
            The AI coach that actually knows you
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: 60, left: 32, right: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn-primary" onClick={onStart} style={{ boxShadow: '0 4px 24px rgba(0,200,150,0.3)' }}>
          Get Started
        </button>
        <button className="btn-ghost" style={{ color: '#85948c' }}>
          Sign in
        </button>
      </div>

      {/* Fine print */}
      <p style={{ position: 'absolute', bottom: 24, fontSize: 11, color: '#3c4a43', fontFamily: "'JetBrains Mono', monospace" }}>
        Trusted by 32,000+ athletes
      </p>
    </div>
  );
}
