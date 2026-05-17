import React, { useState } from 'react';
import { EXERCISE_MAP } from '../constants/exercises';

interface Props {
  onBack: () => void;
}

const MUSCLE_GROUPS = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
const EQUIPMENT = ['All', 'Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cables'];

const LIBRARY_EXERCISES = [
  { id: 'barbell-back-squat', level: 'ADVANCED', tags: ['Legs', 'Barbell'] },
  { id: 'incline-db-press', level: 'INTERMEDIATE', tags: ['Chest', 'Dumbbell'] },
  { id: 'deadlift', level: 'RECOMMENDED', tags: ['Back', 'Legs', 'Barbell'] },
  { id: 'pull-up', level: 'INTERMEDIATE', tags: ['Back', 'Bodyweight'] },
  { id: 'lateral-raise', level: 'BEGINNER', tags: ['Shoulders', 'Dumbbell'] },
];

export default function ExerciseLibraryScreen({ onBack }: Props) {
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [equipFilter, setEquipFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = LIBRARY_EXERCISES.filter(ex => {
    if (muscleFilter !== 'All' && !ex.tags.includes(muscleFilter)) return false;
    if (equipFilter !== 'All' && !ex.tags.includes(equipFilter)) return false;
    
    const data = EXERCISE_MAP[ex.id];
    if (search && data && !data.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button className="btn-secondary" onClick={onBack} style={{ width: 40, height: 40, padding: 0, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: '#e5e2e1' }}>Exercise Library</h1>
      </div>

      {/* Search & Filters */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85948c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 14, top: 13 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: '#1C1B1B', border: '1px solid #2a2a2a', borderRadius: 12, padding: '12px 16px 12px 42px', color: '#e5e2e1', fontFamily: "'Inter', sans-serif", fontSize: 15 }}
          />
        </div>

        <p className="section-label" style={{ marginBottom: 8 }}>Muscle Groups</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 8 }}>
          {MUSCLE_GROUPS.map(g => (
            <button key={g} onClick={() => setMuscleFilter(g)} style={{ padding: '6px 14px', borderRadius: 20, background: muscleFilter === g ? '#00C896' : '#1C1B1B', color: muscleFilter === g ? '#131313' : '#85948c', border: `1px solid ${muscleFilter === g ? '#00C896' : '#2a2a2a'}`, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, flexShrink: 0, transition: 'all 0.2s' }}>
              {g}
            </button>
          ))}
        </div>

        <p className="section-label" style={{ marginBottom: 8 }}>Equipment</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
          {EQUIPMENT.map(e => (
            <button key={e} onClick={() => setEquipFilter(e)} style={{ padding: '6px 14px', borderRadius: 20, background: equipFilter === e ? '#00C896' : '#1C1B1B', color: equipFilter === e ? '#131313' : '#85948c', border: `1px solid ${equipFilter === e ? '#00C896' : '#2a2a2a'}`, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, flexShrink: 0, transition: 'all 0.2s' }}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(ex => {
          const data = EXERCISE_MAP[ex.id];
          if (!data) return null;
          
          return (
            <div key={ex.id} className="card fade-in" style={{ padding: '16px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 12, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 24 }}>🏋️</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: '#e5e2e1' }}>{data.name}</h3>
                  <div style={{ background: ex.level === 'RECOMMENDED' ? 'rgba(0,200,150,0.1)' : 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: ex.level === 'RECOMMENDED' ? '#00C896' : '#85948c', fontWeight: 700 }}>{ex.level}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#85948c' }}>{ex.tags.join(' • ')}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
