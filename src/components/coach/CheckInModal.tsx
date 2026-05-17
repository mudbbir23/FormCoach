import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useWorkoutStore } from '../../stores/workoutStore';
import { EXERCISE_MAP } from '../../constants/exercises';

interface Props {
  onClose: () => void;
  onStart: () => void;
}

const ENERGY_EMOJIS = [
  { v: 1, emoji: '😴', label: 'Wiped' },
  { v: 2, emoji: '😐', label: 'Meh' },
  { v: 3, emoji: '🙂', label: 'Okay' },
  { v: 4, emoji: '💪', label: 'Good' },
  { v: 5, emoji: '🔥', label: 'Locked' },
];

const SORENESS_PARTS = ['Shoulders', 'Chest', 'Back', 'Arms', 'Core', 'Quads', 'Hamstrings', 'Glutes'];
const STRESS = ['Low', 'Medium', 'High', 'Overwhelmed'] as const;

export default function CheckInModal({ onClose, onStart }: Props) {
  const { profile } = useUserStore();
  const { setCheckIn } = useWorkoutStore();
  const [step, setStep] = useState(1);
  const [energy, setEnergy] = useState(3);
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState<string>('Low');
  const [soreness, setSoreness] = useState<string[]>([]);
  const [showAdjustment, setShowAdjustment] = useState(false);

  const toggleSoreness = (p: string) =>
    setSoreness(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const handleSubmit = () => {
    setCheckIn({ energy, sleep, stress, soreness });

    // Show AI adjustment message briefly
    setShowAdjustment(true);
    setTimeout(() => { onStart(); }, 2500);
  };

  const getAdjustmentMsg = () => {
    if (energy <= 2) return `Got it. I've reduced volume by 20% and swapped heavy compounds for isolation work. Quality over quantity today, ${profile.name}.`;
    if (soreness.some(s => ['Quads', 'Hamstrings', 'Glutes'].includes(s))) return `Got it — legs are feeling it. I've shifted today's session to focus on upper body. Your legs will thank you.`;
    if (stress === 'High' || stress === 'Overwhelmed') return `High stress day noted. I've added a 5-min breathing warmup and pulled back the intensity. Let's make this a movement session.`;
    return `Looks like a solid training day. Plan stays as-is — you're ready to push. Let's go, ${profile.name}.`;
  };

  if (showAdjustment) {
    return (
      <div className="overlay">
        <div className="sheet fade-in" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#00C896' }}>FC</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#e5e2e1', lineHeight: '24px' }}>
              {getAdjustmentMsg()}
            </p>
          </div>
          <div style={{ height: 2, background: '#2a2a2a', borderRadius: 2 }}>
            <div style={{ height: '100%', background: '#00C896', borderRadius: 2, animation: 'progress-fill 2.3s linear forwards', '--target-width': '100%' } as React.CSSProperties} />
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#85948c', marginTop: 10, fontFamily: "'JetBrains Mono', monospace" }}>Starting session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '85%', overflowY: 'auto' }}>
        {/* Handle */}
        <div style={{ width: 36, height: 4, background: '#2a2a2a', borderRadius: 2, margin: '0 auto 20px' }} />

        {/* Progress */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ flex: 1, height: 2, borderRadius: 1, background: s <= step ? '#00C896' : '#2a2a2a' }} />
          ))}
        </div>

        {/* Step 1 — Energy */}
        {step === 1 && (
          <div className="fade-in">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, color: '#e5e2e1', marginBottom: 6 }}>How's your energy?</h3>
            <p style={{ fontSize: 14, color: '#85948c', marginBottom: 20 }}>Be honest — your coach adjusts the session based on this.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginBottom: 28 }}>
              {ENERGY_EMOJIS.map(e => (
                <div key={e.v} onClick={() => setEnergy(e.v)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <div className={`emoji-btn ${energy === e.v ? 'selected' : ''}`}>{e.emoji}</div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: energy === e.v ? '#00C896' : '#85948c', fontWeight: 500 }}>{e.label}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setStep(2)}>Next →</button>
          </div>
        )}

        {/* Step 2 — Sleep */}
        {step === 2 && (
          <div className="fade-in">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, color: '#e5e2e1', marginBottom: 6 }}>Sleep last night?</h3>
            <p style={{ fontSize: 14, color: '#85948c', marginBottom: 24 }}>Recovery directly affects your performance ceiling.</p>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 40, fontWeight: 700, color: '#00C896' }}>{sleep}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#85948c' }}> hrs</span>
            </div>
            <input type="range" min={4} max={10} step={0.5} value={sleep} onChange={e => setSleep(Number(e.target.value))} style={{ marginBottom: 8 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c' }}>4h</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c' }}>10h</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: '0 0 48px', padding: 0 }}>←</button>
              <button className="btn-primary" onClick={() => setStep(3)} style={{ flex: 1 }}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Stress */}
        {step === 3 && (
          <div className="fade-in">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, color: '#e5e2e1', marginBottom: 6 }}>Stress level?</h3>
            <p style={{ fontSize: 14, color: '#85948c', marginBottom: 20 }}>Cortisol affects recovery and strength output.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {STRESS.map(s => (
                <button key={s} onClick={() => setStress(s)} style={{ background: stress === s ? 'rgba(0,200,150,0.08)' : 'transparent', border: `1px solid ${stress === s ? '#00C896' : '#2a2a2a'}`, borderRadius: 10, padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: stress === s ? '#00C896' : '#e5e2e1', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: '0 0 48px', padding: 0 }}>←</button>
              <button className="btn-primary" onClick={() => setStep(4)} style={{ flex: 1 }}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 4 — Soreness */}
        {step === 4 && (
          <div className="fade-in">
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, color: '#e5e2e1', marginBottom: 6 }}>Any soreness?</h3>
            <p style={{ fontSize: 14, color: '#85948c', marginBottom: 20 }}>Your coach will work around sore areas when possible.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {SORENESS_PARTS.map(p => (
                <button key={p} onClick={() => toggleSoreness(p)} style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${soreness.includes(p) ? '#F5A623' : '#2a2a2a'}`, background: soreness.includes(p) ? 'rgba(245,166,35,0.1)' : 'transparent', color: soreness.includes(p) ? '#F5A623' : '#85948c', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {p}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setStep(3)} style={{ flex: '0 0 48px', padding: 0 }}>←</button>
              <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, background: '#00C896', boxShadow: '0 4px 20px rgba(0,200,150,0.3)' }}>
                Start Session 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
