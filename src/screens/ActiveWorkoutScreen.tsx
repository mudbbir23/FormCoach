import React, { useState, useEffect } from 'react';
import { useWorkoutStore } from '../stores/workoutStore';
import { useUserStore } from '../stores/userStore';
import { EXERCISE_MAP } from '../constants/exercises';

interface Props {
  onComplete: () => void;
  onBack: () => void;
  onFormCheck: (exerciseId: string) => void;
}

function RestTimer({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRemaining(r => { if (r <= 1) { clearInterval(t); onDone(); return 0; } return r - 1; }), 1000);
    return () => clearInterval(t);
  }, []);
  const pct = ((seconds - remaining) / seconds) * 100;
  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
  return (
    <div style={{ padding: '14px 20px', background: '#1C1B1B', borderTop: '1px solid #2a2a2a', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <p className="section-label">Rest Timer</p>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: remaining <= 10 ? '#F5A623' : '#e5e2e1' }}>{mm}:{ss.toString().padStart(2,'0')}</span>
      </div>
      <div style={{ height: 3, background: '#2a2a2a', marginBottom: 8 }}>
        <div style={{ height: '100%', background: remaining <= 10 ? '#F5A623' : '#00C896', width: `${pct}%`, transition: 'width 1s linear' }} />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[-15, +15, +30].map(d => (
          <button key={d} onClick={() => setRemaining(r => Math.max(0, r + d))} style={{ flex: 1, background: '#2a2a2a', border: 'none', borderRadius: 7, padding: '5px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#bbcac1', cursor: 'pointer' }}>{d > 0 ? '+' : ''}{d}s</button>
        ))}
        <button onClick={onDone} style={{ flex: 1, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.3)', borderRadius: 7, padding: '5px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00C896', cursor: 'pointer' }}>Skip</button>
      </div>
    </div>
  );
}

const COACH_CUES: Record<string, string> = {
  'incline-db-press': 'Retract shoulder blades. 2-second descent.',
  'bench-press': 'Drive feet into floor. Bar to lower chest, explode up.',
  'overhead-press': 'Core braced. Press straight overhead.',
  'lateral-raises': 'Lead with elbows. Stop at shoulder height.',
  'tricep-pushdown': 'Lock elbows at sides. Full extension.',
  'cable-crossover': 'Feel the stretch. Squeeze at the center.',
  'squat': 'Knees track toes. Chest tall through the whole rep.',
  'deadlift': 'Push the floor away. Keep bar close to body.',
  'pull-up': 'Dead hang start. Chest to bar.',
  'bent-over-row': 'Hinge 45°. Pull bar to lower chest.',
};

export default function ActiveWorkoutScreen({ onComplete, onBack, onFormCheck }: Props) {
  const { activeWorkout, currentExerciseIndex, logSet, nextExercise, prevExercise, skipExercise, completeWorkout } = useWorkoutStore();
  const [resting, setResting] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatReply, setChatReply] = useState('');
  const [editReps, setEditReps] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState<number | null>(null);
  const [editRIR, setEditRIR] = useState<number | null>(null);

  if (!activeWorkout) return <div className="screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><button className="btn-primary" onClick={onBack}>Go Back</button></div>;

  const ex = activeWorkout.exercises[currentExerciseIndex];
  const exercise = EXERCISE_MAP[ex?.exerciseId] || { name: 'Exercise', formCues: [], hasFormCheck: false, id: '' };
  const set = ex?.sets[currentSet];
  const reps = editReps ?? set?.reps ?? 10;
  const weight = editWeight ?? set?.weight ?? 20;
  const rir = editRIR ?? set?.rir ?? 2;
  const completedSets = ex?.sets.filter(s => s.logged).length ?? 0;
  const totalSets = ex?.sets.length ?? 4;
  const isLastExercise = currentExerciseIndex === activeWorkout.exercises.length - 1;

  const handleLogSet = () => {
    logSet(currentExerciseIndex, currentSet, { reps, weight, rir });
    if (currentSet + 1 < totalSets) { setCurrentSet(currentSet + 1); setResting(true); }
    else { setResting(false); setCurrentSet(0); setTimeout(() => nextExercise(), 300); }
    setEditReps(null); setEditWeight(null); setEditRIR(null);
  };

  const coachCue = COACH_CUES[ex?.exerciseId] || exercise.formCues?.[0] || 'Focus on full range of motion.';
  const emoji = ex?.exerciseId?.includes('press') ? '💪' : ex?.exerciseId?.includes('pull') || ex?.exerciseId?.includes('row') ? '🔗' : ex?.exerciseId?.includes('squat') || ex?.exerciseId?.includes('lunge') ? '🦵' : ex?.exerciseId?.includes('deadlift') ? '🏋️' : '⚡';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#131313', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid #1E1E1E', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#85948c', cursor: 'pointer', padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: '#e5e2e1' }}>{activeWorkout.name}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c' }}>Exercise {currentExerciseIndex + 1} of {activeWorkout.exercises.length}</p>
          </div>
          <button onClick={() => setShowChat(true)} style={{ background: 'none', border: 'none', color: '#85948c', cursor: 'pointer', fontSize: 18 }}>💬</button>
          {isLastExercise && <button onClick={() => { completeWorkout(); onComplete(); }} style={{ background: '#00C896', color: '#000', border: 'none', borderRadius: 8, padding: '5px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>FINISH</button>}
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {activeWorkout.exercises.map((e, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: e.completed ? '#00C896' : e.skipped ? '#2a2a2a' : i === currentExerciseIndex ? 'rgba(0,200,150,0.5)' : '#2a2a2a' }} />
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 6 }}>{exercise.name}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {(exercise.muscles || []).slice(0, 2).map(m => <span key={m} className="badge badge-muted" style={{ textTransform: 'capitalize' }}>{m.replace('_', ' ')}</span>)}
          </div>
        </div>

        {/* Illustration */}
        <div style={{ background: '#1C1B1B', borderRadius: 14, height: 100, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2a2a2a' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{emoji}</div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#85948c', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Target: {ex?.targetRepsMin}–{ex?.targetRepsMax} @ {ex?.targetWeight}kg</p>
          </div>
        </div>

        {/* Set progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', whiteSpace: 'nowrap' }}>SET {completedSets + 1}/{totalSets}</span>
          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
            {ex?.sets.map((s, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: s.logged ? '#00C896' : i === currentSet ? 'rgba(0,200,150,0.4)' : '#2a2a2a' }} />)}
          </div>
        </div>

        {/* Set logger */}
        <div className="set-grid" style={{ marginBottom: 14 }}>
          {[
            { label: 'Reps', value: reps, onMinus: () => setEditReps(Math.max(1, reps - 1)), onPlus: () => setEditReps(reps + 1), color: '#e5e2e1' },
            { label: 'KG', value: weight, onMinus: () => setEditWeight(Math.max(0, weight - 2.5)), onPlus: () => setEditWeight(weight + 2.5), color: '#e5e2e1' },
            { label: 'RIR', value: rir, onMinus: () => setEditRIR(Math.max(0, rir - 1)), onPlus: () => setEditRIR(rir + 1), color: rir <= 1 ? '#E5534B' : rir <= 2 ? '#F5A623' : '#e5e2e1' },
          ].map(cell => (
            <div key={cell.label} className="set-cell">
              <div className="set-cell-label">{cell.label}</div>
              <div className="set-cell-value" style={{ color: cell.color, fontSize: 20 }}>{cell.value}</div>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 5 }}>
                <button onClick={cell.onMinus} style={{ width: 22, height: 22, borderRadius: 5, background: '#2a2a2a', border: 'none', color: '#bbcac1', cursor: 'pointer', fontSize: 13 }}>−</button>
                <button onClick={cell.onPlus} style={{ width: 22, height: 22, borderRadius: 5, background: '#2a2a2a', border: 'none', color: '#bbcac1', cursor: 'pointer', fontSize: 13 }}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button className="btn-primary" onClick={handleLogSet} style={{ flex: 1, padding: '13px' }}>Log Set ✓</button>
          {exercise.hasFormCheck && (
            <button className="btn-secondary" onClick={() => onFormCheck(ex.exerciseId)} style={{ width: 48, padding: 0, flexShrink: 0, fontSize: 18 }}>📸</button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {currentExerciseIndex > 0 && <button className="btn-ghost" onClick={() => { prevExercise(); setCurrentSet(0); }} style={{ flex: 1, fontSize: 13 }}>← Prev</button>}
          {!isLastExercise && <button className="btn-ghost" onClick={() => { skipExercise(currentExerciseIndex); setCurrentSet(0); }} style={{ flex: 1, fontSize: 13, color: '#85948c' }}>Skip →</button>}
        </div>
      </div>

      {/* Footer */}
      {resting
        ? <RestTimer seconds={ex?.restSeconds ?? 90} onDone={() => setResting(false)} />
        : <div style={{ padding: '10px 16px 12px', background: 'rgba(0,200,150,0.04)', borderTop: '1px solid #1E1E1E', flexShrink: 0, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '1.5px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fontWeight: 700, color: '#00C896' }}>FC</span>
            </div>
            <p style={{ fontSize: 13, color: '#bbcac1', lineHeight: '19px', fontStyle: 'italic' }}>"{coachCue}"</p>
          </div>
      }

      {/* Chat sheet */}
      {showChat && (
        <div className="overlay">
          <div className="sheet">
            <div style={{ width: 36, height: 4, background: '#2a2a2a', borderRadius: 2, margin: '0 auto 14px' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: '#e5e2e1', marginBottom: 10 }}>Ask your coach</p>
            {chatReply && <div style={{ background: '#1C1B1B', borderRadius: 12, padding: '10px 12px', marginBottom: 10, borderLeft: '2px solid #00C896' }}><p style={{ fontSize: 13, color: '#bbcac1', lineHeight: '19px' }}>{chatReply}</p></div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {['My shoulder is clicking', 'Add one more set?', 'Running short on time', 'Substitute this'].map(s => (
                <button key={s} onClick={() => setChatMsg(s)} style={{ padding: '5px 10px', borderRadius: 7, border: `1px solid ${chatMsg === s ? '#00C896' : '#2a2a2a'}`, background: chatMsg === s ? 'rgba(0,200,150,0.1)' : 'transparent', color: chatMsg === s ? '#00C896' : '#85948c', fontSize: 12, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} className="input-field" placeholder="Ask anything..." style={{ flex: 1, padding: '10px 12px' }} />
              <button onClick={() => {
                const r: Record<string, string> = {
                  'My shoulder is clicking': 'Sub press for cable laterals + face pulls today. Same muscle, zero joint stress.',
                  'Add one more set?': `RIR ${rir} — you have juice. One more set, same weight.`,
                  'Running short on time': 'Cutting rest to 60s and dropping the finisher. You\'ll still hit the main lifts.',
                  'Substitute this': `For ${exercise.name}: try dumbbell variation — same muscle, easier setup.`,
                };
                setChatReply(r[chatMsg] || 'Noted. I\'ll factor this in for next session.');
              }} className="btn-primary" style={{ width: 42, padding: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
              </button>
            </div>
            <button className="btn-ghost" onClick={() => { setShowChat(false); setChatReply(''); setChatMsg(''); }} style={{ width: '100%', marginTop: 8 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
