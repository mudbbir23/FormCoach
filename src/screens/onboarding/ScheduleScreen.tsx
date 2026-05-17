import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const TIMES = [
  { id: 'morning', label: 'Morning', sub: 'Before 10am', emoji: '🌅' },
  { id: 'lunch', label: 'Lunch', sub: '11am – 2pm', emoji: '☀️' },
  { id: 'evening', label: 'Evening', sub: 'After 5pm', emoji: '🌙' },
] as const;

interface Props { onNext: () => void; onBack: () => void; }

export default function ScheduleScreen({ onNext, onBack }: Props) {
  const { profile, setSchedule } = useUserStore();
  const [days, setDays] = useState<string[]>(profile.schedule.days);
  const [time, setTime] = useState<'morning' | 'lunch' | 'evening'>(profile.schedule.time);

  const toggleDay = (d: string) =>
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  return (
    <div className="screen" style={{ padding: '0 20px 100px' }}>
      <div style={{ height: 2, background: '#2a2a2a' }}>
        <div style={{ height: 2, width: '66%', background: '#00C896' }} />
      </div>
      <div style={{ padding: '32px 0 28px' }}>
        <p className="section-label" style={{ marginBottom: 12, color: '#00C896' }}>Step 4 of 6</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: '#e5e2e1', lineHeight: '32px', letterSpacing: '-0.02em', marginBottom: 8 }}>
          When do you<br />train?
        </h1>
        <p style={{ fontSize: 15, color: '#85948c' }}>Your coach will schedule sessions around your life.</p>
      </div>

      {/* Days */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#85948c', marginBottom: 12 }}>Training Days</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
          {DAYS.map((d, i) => (
            <button
              key={d}
              onClick={() => toggleDay(DAY_KEYS[i])}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: `1.5px solid ${days.includes(DAY_KEYS[i]) ? '#00C896' : '#2a2a2a'}`,
                background: days.includes(DAY_KEYS[i]) ? 'rgba(0,200,150,0.1)' : '#1C1B1B',
                color: days.includes(DAY_KEYS[i]) ? '#00C896' : '#85948c',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 10, fontSize: 13, color: '#85948c', textAlign: 'center' }}>
          {days.length === 0 ? 'Select your training days' : `${days.length} day${days.length === 1 ? '' : 's'} per week`}
        </p>
      </div>

      {/* Time preference */}
      <div>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#85948c', marginBottom: 12 }}>Preferred Time</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TIMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTime(t.id)}
              style={{
                background: time === t.id ? 'rgba(0,200,150,0.08)' : '#1C1B1B',
                border: `1.5px solid ${time === t.id ? '#00C896' : '#2a2a2a'}`,
                borderRadius: 12,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 22 }}>{t.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: time === t.id ? '#00C896' : '#e5e2e1' }}>{t.label}</div>
                <div style={{ fontSize: 13, color: '#85948c' }}>{t.sub}</div>
              </div>
              {time === t.id && (
                <div style={{ marginLeft: 'auto', width: 22, height: 22, borderRadius: '50%', background: '#00C896', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', gap: 12 }}>
        <button className="btn-secondary" onClick={onBack} style={{ flex: '0 0 auto', width: 52, padding: '13px 0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button className="btn-primary" onClick={() => { setSchedule({ days, time }); onNext(); }} style={{ flex: 1 }} disabled={days.length === 0}>
          Continue
        </button>
      </div>
    </div>
  );
}
