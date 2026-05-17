import React, { useState } from 'react';
import { useUserStore, type Equipment } from '../../stores/userStore';

const EQUIPMENT: { id: Equipment; emoji: string; label: string }[] = [
  { id: 'bodyweight', emoji: '🤸', label: 'Bodyweight' },
  { id: 'dumbbells', emoji: '🏋️', label: 'Dumbbells' },
  { id: 'barbell', emoji: '📊', label: 'Barbell + Rack' },
  { id: 'cables', emoji: '🔗', label: 'Cables' },
  { id: 'full_gym', emoji: '🏢', label: 'Full Gym' },
  { id: 'bands', emoji: '🎯', label: 'Resistance Bands' },
  { id: 'kettlebells', emoji: '⚙️', label: 'Kettlebells' },
];

interface Props { onNext: () => void; onBack: () => void; }

export default function EquipmentScreen({ onNext, onBack }: Props) {
  const { profile, setEquipment } = useUserStore();
  const [selected, setSelected] = useState<Equipment[]>(profile.equipment);

  const toggle = (e: Equipment) =>
    setSelected(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);

  return (
    <div className="screen" style={{ padding: '0 20px 100px' }}>
      <div style={{ height: 2, background: '#2a2a2a' }}>
        <div style={{ height: 2, width: '50%', background: '#00C896' }} />
      </div>
      <div style={{ padding: '32px 0 28px' }}>
        <p className="section-label" style={{ marginBottom: 12, color: '#00C896' }}>Step 3 of 6</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: '#e5e2e1', lineHeight: '32px', letterSpacing: '-0.02em', marginBottom: 8 }}>
          What do you<br />have access to?
        </h1>
        <p style={{ fontSize: 15, color: '#85948c' }}>Select everything available. Your workouts will match.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {EQUIPMENT.map(eq => (
          <div
            key={eq.id}
            onClick={() => toggle(eq.id)}
            style={{
              background: selected.includes(eq.id) ? 'rgba(0,200,150,0.1)' : '#1C1B1B',
              border: `1.5px solid ${selected.includes(eq.id) ? '#00C896' : '#2a2a2a'}`,
              borderRadius: 14,
              padding: '16px 14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 24 }}>{eq.emoji}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: selected.includes(eq.id) ? '#00C896' : '#e5e2e1' }}>{eq.label}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: '0 0 auto', width: 52, padding: '13px 0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button className="btn-primary" onClick={() => { setEquipment(selected); onNext(); }} style={{ flex: 1 }} disabled={selected.length === 0}>
          Continue
        </button>
      </div>
    </div>
  );
}
