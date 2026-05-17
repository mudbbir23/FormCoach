import React, { useState } from 'react';
import { useUserStore, type Goal } from '../../stores/userStore';

interface GoalOption { id: Goal; emoji: string; title: string; desc: string; }
const GOALS: GoalOption[] = [
  { id: 'build_muscle', emoji: '💪', title: 'Build Muscle', desc: 'Pack on lean mass and improve your physique' },
  { id: 'lose_fat', emoji: '🔥', title: 'Lose Fat', desc: 'Burn body fat while preserving muscle' },
  { id: 'get_stronger', emoji: '🏋️', title: 'Get Stronger', desc: 'Increase your 1-rep max on key lifts' },
  { id: 'improve_endurance', emoji: '🏃', title: 'Improve Endurance', desc: 'Build your cardiovascular capacity' },
  { id: 'stay_active', emoji: '⚡', title: 'Stay Active', desc: 'Move consistently and feel better daily' },
];

interface Props { onNext: () => void; }

export default function GoalsScreen({ onNext }: Props) {
  const { profile, setGoals } = useUserStore();
  const [selected, setSelected] = useState<Goal[]>(profile.goals);

  const toggle = (g: Goal) => {
    setSelected(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );
  };

  const handleNext = () => { setGoals(selected); onNext(); };

  return (
    <div className="screen" style={{ padding: '0 20px 100px' }}>
      {/* Progress bar */}
      <div style={{ height: 2, background: '#2a2a2a', marginBottom: 0 }}>
        <div style={{ height: 2, width: '16%', background: '#00C896' }} />
      </div>

      {/* Header */}
      <div style={{ padding: '32px 0 28px' }}>
        <p className="section-label" style={{ marginBottom: 12, color: '#00C896' }}>Step 1 of 6</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: '#e5e2e1', lineHeight: '32px', letterSpacing: '-0.02em', marginBottom: 8 }}>
          What's your<br />main goal?
        </h1>
        <p style={{ fontSize: 15, color: '#85948c', lineHeight: '22px' }}>
          Choose all that apply. Your coach will weight them.
        </p>
      </div>

      {/* Goal cards */}
      <div className="onboarding-cards">
        {GOALS.map(g => (
          <div
            key={g.id}
            className={`goal-card ${selected.includes(g.id) ? 'selected' : ''}`}
            onClick={() => toggle(g.id)}
          >
            <div className="goal-icon">{g.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: selected.includes(g.id) ? '#00C896' : '#e5e2e1', marginBottom: 3 }}>{g.title}</div>
              <div style={{ fontSize: 13, color: '#85948c', lineHeight: '18px' }}>{g.desc}</div>
            </div>
            {selected.includes(g.id) && (
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next */}
      <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20 }}>
        <button className="btn-primary" onClick={handleNext} disabled={selected.length === 0} style={{ opacity: selected.length === 0 ? 0.4 : 1 }}>
          Continue
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
