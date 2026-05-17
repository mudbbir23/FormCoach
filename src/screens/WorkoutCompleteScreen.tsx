import React, { useState } from 'react';
import { useWorkoutStore } from '../stores/workoutStore';

export default function WorkoutCompleteScreen({ onHome }: { onHome: () => void }) {
  const { history } = useWorkoutStore();
  const latest = history[0];
  const [showShare, setShowShare] = useState(false);

  if (!latest) return null;

  const mins = Math.round(latest.duration / 60);
  const volume = (latest.totalVolume / 1000).toFixed(1);

  const DEBRIEF_MSGS = [
    `Strong session today. ${latest.exercisesCompleted} exercises hit, volume was solid. Your consistency this week is exactly what builds long-term progress.`,
    `Completed ${latest.exercisesCompleted} exercises in ${mins} minutes — efficient and focused. Keep that energy going into your next session.`,
    `Good work finishing strong. Volume of ${volume}t and avg RPE of ${latest.avgRPE} tells me you pushed hard but kept your head in it.`,
  ];
  const debriefMsg = DEBRIEF_MSGS[Math.floor(Math.random() * DEBRIEF_MSGS.length)];

  const NEXT_SUGGESTIONS = [
    { label: 'Recovery walk', desc: '20–30 min light movement', icon: '🚶' },
    { label: 'Protein window', desc: '40g protein in the next 2 hours', icon: '🥩' },
    { label: 'Sleep target', desc: '7.5–8h tonight for optimal recovery', icon: '😴' },
  ];

  return (
    <div className="screen" style={{ paddingBottom: 16 }}>
      {/* Hero */}
      <div style={{ padding: '32px 20px 0', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%)', top: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 52, marginBottom: 12 }}>🏆</div>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.02em', marginBottom: 6 }}>
          Session Complete
        </h1>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#00C896' }}>{latest.name}</p>
      </div>

      {/* Stats */}
      <div style={{ padding: '24px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { icon: '⏱', label: 'Duration', value: `${mins}`, unit: 'min' },
          { icon: '🏋️', label: 'Total Volume', value: volume, unit: 'tonnes' },
          { icon: '💪', label: 'Exercises', value: `${latest.exercisesCompleted}`, unit: 'done' },
          { icon: '🎯', label: 'Avg RPE', value: `${latest.avgRPE}`, unit: '/10' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '16px 12px' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: '#00C896' }}>
              {s.value}<span style={{ fontSize: 12, color: '#85948c' }}>{s.unit}</span>
            </div>
            <div className="section-label" style={{ marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Coach debrief */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ background: '#1C1B1B', borderLeft: '2px solid #00C896', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '1.5px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: '#00C896' }}>FC</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#bbcac1', lineHeight: '22px' }}>
            "{debriefMsg}"
          </p>
        </div>
      </div>

      {/* Next steps */}
      <div style={{ padding: '16px 20px 0' }}>
        <p className="section-label" style={{ marginBottom: 12 }}>Now do this</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NEXT_SUGGESTIONS.map(s => (
            <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#e5e2e1' }}>{s.label}</p>
                <p style={{ fontSize: 13, color: '#85948c', marginTop: 2 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700, color: '#00C896', marginBottom: 4 }}>🔥 21</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#e5e2e1' }}>Day Streak</p>
          <p style={{ fontSize: 13, color: '#85948c', marginTop: 2 }}>Your longest ever. Don't stop now.</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '16px 20px 0', display: 'flex', gap: 10 }}>
        <button className="btn-primary" onClick={onHome} style={{ flex: 1 }}>
          Back to Home
        </button>
        <button className="btn-secondary" onClick={() => setShowShare(true)} style={{ width: 48, padding: 0, flexShrink: 0, fontSize: 18 }}>
          📤
        </button>
      </div>

      {showShare && (
        <div className="overlay" onClick={() => setShowShare(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: '#2a2a2a', borderRadius: 2, margin: '0 auto 16px' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: '#e5e2e1', marginBottom: 12 }}>Share Session</p>
            <div style={{ background: '#0a0a0a', borderRadius: 12, padding: '20px', textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#00C896', marginBottom: 8, letterSpacing: '0.06em' }}>FORMCOACH · {new Date().toLocaleDateString()}</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: '#e5e2e1', marginBottom: 8 }}>{latest.name}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
                <div><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: '#00C896' }}>{mins}min</div><div style={{ fontSize: 11, color: '#85948c' }}>Duration</div></div>
                <div><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: '#00C896' }}>{volume}t</div><div style={{ fontSize: 11, color: '#85948c' }}>Volume</div></div>
                <div><div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: '#00C896' }}>🔥21</div><div style={{ fontSize: 11, color: '#85948c' }}>Streak</div></div>
              </div>
            </div>
            <button className="btn-primary">Copy Image</button>
            <button className="btn-ghost" onClick={() => setShowShare(false)} style={{ width: '100%', marginTop: 8 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
