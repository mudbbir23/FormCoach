import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';

const INJURY_TAGS = ['Lower Back', 'Knee', 'Shoulder', 'Wrist', 'Hip', 'Neck', 'Ankle', 'Elbow'];

interface Props { onNext: () => void; onBack: () => void; }

export default function InjuriesScreen({ onNext, onBack }: Props) {
  const { setInjuries } = useUserStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const noInjuries = selected.includes('none');

  const toggle = (t: string) => {
    if (t === 'none') { setSelected(['none']); return; }
    setSelected(prev => {
      const without = prev.filter(x => x !== 'none');
      return without.includes(t) ? without.filter(x => x !== t) : [...without, t];
    });
  };

  return (
    <div className="screen" style={{ padding: '0 20px 100px' }}>
      <div style={{ height: 2, background: '#2a2a2a' }}>
        <div style={{ height: 2, width: '83%', background: '#00C896' }} />
      </div>
      <div style={{ padding: '32px 0 28px' }}>
        <p className="section-label" style={{ marginBottom: 12, color: '#00C896' }}>Step 5 of 6</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: '#e5e2e1', lineHeight: '32px', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Any injuries or<br />limitations?
        </h1>
        <p style={{ fontSize: 15, color: '#85948c', lineHeight: '22px' }}>
          Your coach will work around these — not ignore them.
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {INJURY_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: `1.5px solid ${selected.includes(tag) ? '#E5534B' : '#2a2a2a'}`,
              background: selected.includes(tag) ? 'rgba(229,83,75,0.12)' : '#1C1B1B',
              color: selected.includes(tag) ? '#E5534B' : '#85948c',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={() => toggle('none')}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: `1.5px solid ${noInjuries ? '#00C896' : '#2a2a2a'}`,
            background: noInjuries ? 'rgba(0,200,150,0.1)' : '#1C1B1B',
            color: noInjuries ? '#00C896' : '#85948c',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          ✓ None
        </button>
      </div>

      {/* Note */}
      {!noInjuries && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#85948c', marginBottom: 8 }}>Additional notes (optional)</p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="e.g. Lower back flares up with heavy deadlifts, okay with lighter loads"
            rows={3}
            style={{
              width: '100%',
              background: '#0a0a0a',
              border: '1px solid #2a2a2a',
              borderRadius: 12,
              padding: '12px 14px',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#e5e2e1',
              resize: 'none',
              outline: 'none',
              lineHeight: '20px',
            }}
            onFocus={e => (e.target.style.borderColor = '#00C896')}
            onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
          />
        </div>
      )}

      {/* Coach note */}
      <div style={{ background: 'rgba(0,200,150,0.06)', border: '1px solid rgba(0,200,150,0.2)', borderLeft: '2px solid #00C896', borderRadius: 12, padding: '12px 14px' }}>
        <p style={{ fontSize: 13, color: '#bbcac1', lineHeight: '18px' }}>
          🛡️ <strong style={{ color: '#00C896' }}>Your coach reads this before every session</strong> and substitutes exercises that may aggravate these areas.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: '0 0 auto', width: 52, padding: '13px 0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button className="btn-primary" onClick={() => { setInjuries(selected); onNext(); }} style={{ flex: 1 }}>
          Continue
        </button>
      </div>
    </div>
  );
}
