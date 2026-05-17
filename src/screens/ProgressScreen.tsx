import React, { useState } from 'react';
import { useWorkoutStore } from '../stores/workoutStore';

type ProgressTab = 'strength' | 'body' | 'consistency';

const STRENGTH_DATA = [65, 70, 72.5, 75, 75, 77.5, 80, 80, 82.5, 85];
const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'];

function StrengthChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data) - 5;
  const h = 100;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: h, marginBottom: 4 }}>
        {data.map((v, i) => {
          const pct = ((v - min) / (max - min)) * 85 + 15;
          const isLast = i === data.length - 1;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
              {isLast && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#00C896', fontWeight: 700 }}>{v}</span>}
              <div style={{ width: '100%', height: `${pct}%`, borderRadius: '3px 3px 0 0', background: isLast ? '#00C896' : i >= 7 ? 'rgba(0,200,150,0.5)' : '#2a2a2a', transition: 'height 0.6s ease' }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {WEEKS.slice(0, data.length).map((w, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#85948c' }}>{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsistencyHeatmap() {
  const cells = Array.from({ length: 84 }, (_, i) => {
    const r = Math.random();
    if (r > 0.75) return 4;
    if (r > 0.6) return 3;
    if (r > 0.45) return 2;
    if (r > 0.3) return 1;
    return 0;
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
      {cells.map((level, i) => (
        <div key={i} className={`heatmap-cell level-${level}`} />
      ))}
    </div>
  );
}

export default function ProgressScreen() {
  const [tab, setTab] = useState<ProgressTab>('strength');
  const [selectedExercise, setSelectedExercise] = useState('bench-press');
  const { history, personalRecords } = useWorkoutStore();

  const totalVolume = history.reduce((sum, w) => sum + w.totalVolume, 0);
  const totalWorkouts = history.length;
  const consistencyScore = 87;

  return (
    <div className="screen" style={{ paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em', marginBottom: 4 }}>Progress</h1>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#85948c' }}>Last 12 weeks</p>
      </div>

      {/* Top stats */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Workouts', value: totalWorkouts, unit: '' },
          { label: 'Volume', value: Math.round(totalVolume / 1000), unit: 't' },
          { label: 'Streak', value: 21, unit: 'd' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: '#00C896' }}>{s.value}<span style={{ fontSize: 13, color: '#85948c' }}>{s.unit}</span></div>
            <div className="section-label" style={{ marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', background: '#1C1B1B', borderRadius: 10, padding: 3, gap: 2 }}>
          {(['strength', 'body', 'consistency'] as ProgressTab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '8px', borderRadius: 8, background: tab === t ? '#2a2a2a' : 'transparent', border: 'none', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: tab === t ? 600 : 400, color: tab === t ? '#e5e2e1' : '#85948c', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Strength tab */}
      {tab === 'strength' && (
        <div style={{ padding: '16px 20px 0' }}>
          {/* Exercise selector */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
            {['bench-press', 'squat', 'deadlift', 'overhead-press'].map(ex => (
              <button key={ex} onClick={() => setSelectedExercise(ex)} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${selectedExercise === ex ? '#00C896' : '#2a2a2a'}`, background: selectedExercise === ex ? 'rgba(0,200,150,0.1)' : '#1C1B1B', color: selectedExercise === ex ? '#00C896' : '#85948c', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {ex.replace(/-/g, ' ')}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: '#e5e2e1', textTransform: 'capitalize' }}>{selectedExercise.replace(/-/g, ' ')}</p>
                <p className="section-label" style={{ marginTop: 2 }}>Estimated 1RM · kg</p>
              </div>
              {personalRecords[selectedExercise] && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#00C896' }}>{personalRecords[selectedExercise].weight}kg</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#85948c' }}>PR · {personalRecords[selectedExercise].date}</div>
                </div>
              )}
            </div>
            <StrengthChart data={STRENGTH_DATA} label={selectedExercise} />
          </div>

          {/* PRs */}
          <p className="section-label" style={{ marginBottom: 10 }}>Personal Records</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(personalRecords).slice(0, 4).map(([ex, pr]) => (
              <div key={ex} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,200,150,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>🏆</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#e5e2e1', textTransform: 'capitalize' }}>{ex.replace(/-/g, ' ')}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', marginTop: 2 }}>{pr.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: '#00C896' }}>{pr.weight > 0 ? `${pr.weight}kg` : `BW`}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c' }}>×{pr.reps}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body tab */}
      {tab === 'body' && (
        <div style={{ padding: '16px 20px 0' }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Weight Log</p>
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: '#e5e2e1' }}>Body Weight</p>
                <p className="section-label" style={{ marginTop: 2 }}>12-week trend · kg</p>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: '#00C896' }}>78.4<span style={{ fontSize: 12, color: '#85948c' }}>kg</span></div>
            </div>
            <StrengthChart data={[80, 79.5, 79, 78.8, 78.8, 79, 78.5, 78.4, 78.4, 78.4]} label="weight" />
          </div>

          <p className="section-label" style={{ marginBottom: 12 }}>Measurements</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Chest', value: '102cm', trend: '+1' },
              { label: 'Waist', value: '82cm', trend: '-2' },
              { label: 'Arms', value: '38cm', trend: '+0.5' },
              { label: 'Thighs', value: '58cm', trend: '+1.5' },
            ].map(m => (
              <div key={m.label} className="card" style={{ padding: '12px 14px' }}>
                <p className="section-label" style={{ marginBottom: 6 }}>{m.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: '#e5e2e1' }}>{m.value}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: m.trend.startsWith('+') ? '#00C896' : '#E5534B' }}>{m.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consistency tab */}
      {tab === 'consistency' && (
        <div style={{ padding: '16px 20px 0' }}>
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: '#e5e2e1' }}>Consistency Score</p>
                <p className="section-label" style={{ marginTop: 2 }}>Last 12 weeks</p>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: '#00C896' }}>{consistencyScore}<span style={{ fontSize: 14, color: '#85948c' }}>/100</span></div>
            </div>
            <ConsistencyHeatmap />
            <div style={{ display: 'flex', gap: 4, marginTop: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#85948c' }}>Less</span>
              {[0, 1, 2, 3, 4].map(l => <div key={l} className={`heatmap-cell level-${l}`} style={{ width: 10, height: 10 }} />)}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#85948c' }}>More</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <div className="card" style={{ textAlign: 'center', padding: '14px 10px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: '#00C896' }}>21</div>
              <div className="section-label" style={{ marginTop: 4 }}>Current Streak</div>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '14px 10px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: '#e5e2e1' }}>24</div>
              <div className="section-label" style={{ marginTop: 4 }}>Longest Streak</div>
            </div>
          </div>

          <p className="section-label" style={{ marginBottom: 10 }}>Day of Week</p>
          <div className="card">
            {['Mon', 'Wed', 'Fri', 'Tue', 'Thu', 'Sat', 'Sun'].map((d, i) => {
              const pct = [95, 90, 88, 40, 35, 25, 10][i];
              return (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 6 ? 10 : 0 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', width: 28 }}>{d}</span>
                  <div style={{ flex: 1, height: 6, background: '#2a2a2a', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: pct > 70 ? '#00C896' : pct > 30 ? 'rgba(0,200,150,0.4)' : '#2a2a2a', borderRadius: 3, transition: 'width 0.6s ease' }} />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c', width: 28, textAlign: 'right' }}>{pct}%</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 14, background: 'rgba(0,200,150,0.06)', borderLeft: '2px solid #00C896', borderRadius: 12, padding: '12px 14px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#bbcac1', lineHeight: '19px' }}>
              📈 <strong style={{ color: '#00C896' }}>Coach insight:</strong> Your Monday–Wednesday–Friday pattern is locked in. The weekend sessions are bonus — keep them optional so they don't create guilt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
