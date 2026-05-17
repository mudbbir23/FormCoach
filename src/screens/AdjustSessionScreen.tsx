import React from 'react';
import { ArrowLeft, RefreshCw, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSwap: (exerciseId: string) => void;
}

export default function AdjustSessionScreen({ onBack, onSwap }: Props) {
  return (
    <div style={{ padding: '24px 20px', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#e5e2e1', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em' }}>Adjust Session</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c' }}>Leg Day — Strength Focus</p>
        </div>
      </div>

      {/* Routine */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        
        {/* Exercise 1 */}
        <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#e5e2e1', marginBottom: 4 }}>Barbell Squat</h3>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', letterSpacing: '0.04em' }}>4 SETS × 6 REPS</p>
            </div>
            <button 
              onClick={() => onSwap('squat')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#e5e2e1', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600 }}
            >
              <RefreshCw size={12} /> SWAP
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(0,200,150,0.1)', borderLeft: '2px solid #00C896', padding: '10px 12px', borderRadius: '0 8px 8px 0' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#000' }} />
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#e5e2e1', fontStyle: 'italic', lineHeight: 1.4 }}>
              "Swapping for Goblet Squats is a smart move if your lower back feels tight today. Focus on vertical torso positioning."
            </p>
          </div>
        </div>

        {/* Exercise 2 */}
        <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#e5e2e1', marginBottom: 4 }}>Romanian Deadlift</h3>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', letterSpacing: '0.04em' }}>3 SETS × 10 REPS</p>
            </div>
            <button 
              onClick={() => onSwap('rdl')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#85948c', cursor: 'pointer' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Exercise 3 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#e5e2e1', marginBottom: 4 }}>Leg Extensions</h3>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', letterSpacing: '0.04em' }}>3 SETS × 12 REPS</p>
            </div>
            <button 
              onClick={() => onSwap('leg-extension')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#85948c', cursor: 'pointer' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      <div style={{ marginTop: 40 }}>
        <button className="btn-primary" onClick={onBack}>
          Confirm Adjustments
        </button>
      </div>
    </div>
  );
}
