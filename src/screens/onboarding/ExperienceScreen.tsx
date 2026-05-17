import React, { useState } from 'react';
import { useUserStore, type ExperienceLevel } from '../../stores/userStore';

const LEVELS: { id: ExperienceLevel; title: string; sub: string; desc: string; emoji: string }[] = [
  { id: 'beginner', emoji: '🌱', title: 'Beginner', sub: 'Less than 1 year', desc: "Not sure about form yet. Learning the basics. Gym can feel intimidating sometimes." },
  { id: 'intermediate', emoji: '⚡', title: 'Intermediate', sub: '1–3 years', desc: "Comfortable with the main lifts. Starting to track progress. Know what progressive overload means." },
  { id: 'advanced', emoji: '🏆', title: 'Advanced', sub: '3+ years', desc: "Tracks every set. Runs periodized programs. Knows your exact 1RMs and pushes them." },
];

interface Props { onNext: () => void; onBack: () => void; }

export default function ExperienceScreen({ onNext, onBack }: Props) {
  const { profile, setExperience } = useUserStore();
  const [selected, setSelected] = useState<ExperienceLevel>(profile.experience);

  return (
    <div className="screen" style={{ padding: '0 20px 100px' }}>
      <div style={{ height: 2, background: '#2a2a2a' }}>
        <div style={{ height: 2, width: '33%', background: '#00C896' }} />
      </div>
      <div style={{ padding: '32px 0 28px' }}>
        <p className="section-label" style={{ marginBottom: 12, color: '#00C896' }}>Step 2 of 6</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: '#e5e2e1', lineHeight: '32px', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Where are you<br />right now?
        </h1>
        <p style={{ fontSize: 15, color: '#85948c' }}>Be honest — your coach adapts to you.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {LEVELS.map(l => (
          <div
            key={l.id}
            className={`goal-card ${selected === l.id ? 'selected' : ''}`}
            onClick={() => setSelected(l.id)}
            style={{ alignItems: 'flex-start' }}
          >
            <div style={{ fontSize: 28, marginTop: 2 }}>{l.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: selected === l.id ? '#00C896' : '#e5e2e1' }}>{l.title}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c' }}>{l.sub}</span>
              </div>
              <p style={{ fontSize: 13, color: '#85948c', lineHeight: '18px' }}>{l.desc}</p>
            </div>
            {selected === l.id && (
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: '0 0 auto', width: 52, padding: '13px 0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button className="btn-primary" onClick={() => { setExperience(selected); onNext(); }} style={{ flex: 1 }}>
          Continue
        </button>
      </div>
    </div>
  );
}
