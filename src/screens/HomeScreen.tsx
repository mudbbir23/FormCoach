import React, { useState, useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { useWorkoutStore, DEFAULT_WORKOUT } from '../stores/workoutStore';
import { useCoachStore } from '../stores/coachStore';
import { EXERCISE_MAP } from '../constants/exercises';
import { DAILY_NOTES } from '../lib/ai/coach';
import CheckInModal from '../components/coach/CheckInModal';

type Tab = 'home' | 'workout' | 'coach' | 'progress';

interface Props {
  onNavigate: (screen: string) => void;
}

// Muscle heatmap SVG
function MuscleHeatmap() {
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
      {/* Front */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c', marginBottom: 6, letterSpacing: '0.06em' }}>FRONT</p>
        <svg width="80" height="120" viewBox="0 0 80 120">
          {/* Head */}
          <ellipse cx="40" cy="10" rx="9" ry="10" fill="#2a2a2a" />
          {/* Neck */}
          <rect x="36" y="19" width="8" height="6" rx="2" fill="#2a2a2a" />
          {/* Chest */}
          <ellipse cx="40" cy="35" rx="18" ry="12" fill="#00C896" fillOpacity="0.6" />
          {/* Shoulders */}
          <ellipse cx="22" cy="30" rx="8" ry="6" fill="#E5534B" fillOpacity="0.7" />
          <ellipse cx="58" cy="30" rx="8" ry="6" fill="#E5534B" fillOpacity="0.7" />
          {/* Core */}
          <rect x="28" y="44" width="24" height="20" rx="4" fill="#2a2a2a" />
          {/* Arms */}
          <rect x="12" y="33" width="10" height="28" rx="5" fill="#2a2a2a" />
          <rect x="58" y="33" width="10" height="28" rx="5" fill="#2a2a2a" />
          {/* Forearms */}
          <rect x="11" y="62" width="9" height="22" rx="4" fill="#2a2a2a" />
          <rect x="60" y="62" width="9" height="22" rx="4" fill="#2a2a2a" />
          {/* Quads */}
          <ellipse cx="33" cy="85" rx="10" ry="16" fill="#00C896" fillOpacity="0.5" />
          <ellipse cx="47" cy="85" rx="10" ry="16" fill="#00C896" fillOpacity="0.5" />
          {/* Knees */}
          <ellipse cx="33" cy="101" rx="7" ry="5" fill="#2a2a2a" />
          <ellipse cx="47" cy="101" rx="7" ry="5" fill="#2a2a2a" />
          {/* Shins */}
          <rect x="27" y="106" width="12" height="14" rx="4" fill="#2a2a2a" />
          <rect x="41" y="106" width="12" height="14" rx="4" fill="#2a2a2a" />
        </svg>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[{ color: '#00C896', label: 'Trained' }, { color: '#F5A623', label: 'Warm' }, { color: '#E5534B', label: 'Sore' }, { color: '#2a2a2a', label: 'Rested' }].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c' }}>{l.label}</span>
          </div>
        ))}
      </div>
      {/* Back */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c', marginBottom: 6, letterSpacing: '0.06em' }}>BACK</p>
        <svg width="80" height="120" viewBox="0 0 80 120">
          <ellipse cx="40" cy="10" rx="9" ry="10" fill="#2a2a2a" />
          <rect x="36" y="19" width="8" height="6" rx="2" fill="#2a2a2a" />
          {/* Traps */}
          <ellipse cx="40" cy="28" rx="18" ry="8" fill="#F5A623" fillOpacity="0.5" />
          {/* Rear delts */}
          <ellipse cx="22" cy="29" rx="8" ry="6" fill="#E5534B" fillOpacity="0.5" />
          <ellipse cx="58" cy="29" rx="8" ry="6" fill="#E5534B" fillOpacity="0.5" />
          {/* Lats */}
          <ellipse cx="29" cy="44" rx="10" ry="14" fill="#F5A623" fillOpacity="0.6" />
          <ellipse cx="51" cy="44" rx="10" ry="14" fill="#F5A623" fillOpacity="0.6" />
          {/* Lower back */}
          <rect x="30" y="55" width="20" height="12" rx="4" fill="#2a2a2a" />
          {/* Triceps */}
          <rect x="12" y="33" width="10" height="28" rx="5" fill="#2a2a2a" />
          <rect x="58" y="33" width="10" height="28" rx="5" fill="#2a2a2a" />
          {/* Glutes */}
          <ellipse cx="33" cy="73" rx="12" ry="10" fill="#00C896" fillOpacity="0.6" />
          <ellipse cx="47" cy="73" rx="12" ry="10" fill="#00C896" fillOpacity="0.6" />
          {/* Hamstrings */}
          <ellipse cx="33" cy="90" rx="10" ry="14" fill="#F5A623" fillOpacity="0.4" />
          <ellipse cx="47" cy="90" rx="10" ry="14" fill="#F5A623" fillOpacity="0.4" />
          {/* Calves */}
          <rect x="27" y="106" width="12" height="14" rx="4" fill="#2a2a2a" />
          <rect x="41" y="106" width="12" height="14" rx="4" fill="#2a2a2a" />
        </svg>
      </div>
    </div>
  );
}

export default function HomeScreen({ onNavigate }: Props) {
  const { profile } = useUserStore();
  const { history, startWorkout } = useWorkoutStore();
  const { dailyNote } = useCoachStore();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  useEffect(() => { setTimeout(() => setNoteVisible(true), 300); }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const weekDone = 3;
  const weekTotal = 5;
  const todayWorkout = { name: 'Upper Body Push', exercises: 6, duration: 45, type: 'push' };

  const handleStartWorkout = () => setShowCheckIn(true);

  const handleCheckInComplete = () => {
    setShowCheckIn(false);
    startWorkout(DEFAULT_WORKOUT);
    onNavigate('active-workout');
  };

  return (
    <div className="screen" style={{ paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em' }}>
              {greeting}, {profile.name}
            </h1>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#85948c', marginTop: 2 }}>{today}</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#00C896' }}>FC</span>
            </div>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#00C896', border: '2px solid #131313', animation: 'pulse-dot 2s ease infinite' }} />
          </div>
        </div>
      </div>

      {/* Check-in card */}
      <div style={{ padding: '16px 20px 0' }}>
        <div onClick={() => setShowCheckIn(true)} style={{ background: 'rgba(0,200,150,0.06)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,200,150,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 18 }}>👋</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#e5e2e1', marginBottom: 2 }}>How are you feeling today?</p>
            <p style={{ fontSize: 12, color: '#85948c' }}>Tap to check in — your coach will adjust your session.</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#85948c" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      {/* Today's session */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p className="section-label">Today's Session</p>
          <span className="badge badge-green">Scheduled</span>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 700, color: '#e5e2e1', marginBottom: 4 }}>{todayWorkout.name}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#85948c' }}>
                  {todayWorkout.exercises} exercises · ~{todayWorkout.duration} min
                </p>
              </div>
              <div style={{ background: 'rgba(0,200,150,0.1)', borderRadius: 8, padding: '6px 10px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00C896', fontWeight: 600 }}>PUSH</span>
              </div>
            </div>

            {/* Exercise preview */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto' }}>
              {DEFAULT_WORKOUT.exercises.map(ex => {
                const e = EXERCISE_MAP[ex.exerciseId];
                return (
                  <div key={ex.exerciseId} style={{ background: '#2a2a2a', borderRadius: 8, padding: '5px 10px', flexShrink: 0 }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#bbcac1', whiteSpace: 'nowrap' }}>{e?.name.split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#2a2a2a' }} />

          {/* Actions */}
          <div style={{ display: 'flex', padding: '12px 16px', gap: 10 }}>
            <button className="btn-primary" onClick={handleStartWorkout} style={{ flex: 1, padding: '12px', fontSize: 15 }}>
              Start Workout
            </button>
            <button className="btn-secondary" style={{ width: 44, padding: 0, flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* This week */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p className="section-label">This Week</p>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#00C896', fontWeight: 600 }}>{weekDone}/{weekTotal}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {['M','T','W','T','F'].map((d, i) => (
            <div key={`${d}-${i}`} style={{ width: 32, height: 32, borderRadius: '50%', background: i < weekDone ? '#00C896' : i === weekDone ? '#1C1B1B' : '#1C1B1B', border: `1.5px solid ${i < weekDone ? '#00C896' : i === weekDone ? '#00C896' : '#2a2a2a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i < weekDone
                ? <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3.5 3.5L13 1" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: i === weekDone ? '#00C896' : '#85948c', fontWeight: 600 }}>{d}</span>
              }
            </div>
          ))}
          <div style={{ flex: 1, marginLeft: 4 }}>
            <div style={{ height: 3, background: '#2a2a2a', borderRadius: 2 }}>
              <div style={{ height: '100%', background: '#00C896', borderRadius: 2, width: `${(weekDone / weekTotal) * 100}%`, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Coach note */}
      {noteVisible && (
        <div style={{ padding: '20px 20px 0' }} className="fade-in">
          <p className="section-label" style={{ marginBottom: 10 }}>Coach Note</p>
          <div style={{ background: '#1C1B1B', borderLeft: '2px solid #00C896', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '1.5px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: '#00C896' }}>FC</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#bbcac1', lineHeight: '22px' }}>
              "{dailyNote}"
            </p>
          </div>
        </div>
      )}

      {/* Muscle status */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p className="section-label">Muscle Status</p>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c' }}>48h recovery</span>
        </div>
        <div className="card">
          <MuscleHeatmap />
        </div>
      </div>

      {/* Recent activity */}
      <div style={{ padding: '20px 20px 16px' }}>
        <p className="section-label" style={{ marginBottom: 12 }}>Recent Sessions</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history.slice(0, 3).map(w => (
            <div key={w.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: w.type === 'push' ? 'rgba(0,200,150,0.1)' : w.type === 'pull' ? 'rgba(74,158,248,0.1)' : 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 16 }}>{w.type === 'push' ? '💪' : w.type === 'legs' ? '🦵' : '🔗'}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#e5e2e1' }}>{w.name}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', marginTop: 2 }}>
                  {Math.round(w.duration / 60)} min · {(w.totalVolume / 1000).toFixed(1)}t volume
                </p>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c' }}>
                {Math.floor((Date.now() - w.completedAt.getTime()) / 86400000)}d ago
              </span>
            </div>
          ))}
        </div>
      </div>

      {showCheckIn && <CheckInModal onClose={() => setShowCheckIn(false)} onStart={handleCheckInComplete} />}
    </div>
  );
}
