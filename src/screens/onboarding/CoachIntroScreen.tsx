import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/userStore';

interface Props { onComplete: () => void; onBack: () => void; }

export default function CoachIntroScreen({ onComplete, onBack }: Props) {
  const { profile, setName, setCoachName, completeOnboarding } = useUserStore();
  const [name, setNameLocal] = useState(profile.name);
  const [coachName, setCoachNameLocal] = useState('FormCoach');
  const [step, setStep] = useState<'name' | 'coach' | 'intro' | 'ready'>('name');
  const [speechText, setSpeechText] = useState('');
  const [charIdx, setCharIdx] = useState(0);

  const introText = `Hey ${name || 'there'}, I'm ${coachName}. I've looked at your goals and I'm building something around you — not a generic plan. Every session will be tailored to how you feel, what you've done, and where you're headed. Let's start.`;

  useEffect(() => {
    if (step === 'intro') {
      setSpeechText('');
      setCharIdx(0);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'intro' && charIdx < introText.length) {
      const t = setTimeout(() => {
        setSpeechText(introText.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else if (step === 'intro' && charIdx >= introText.length) {
      setTimeout(() => setStep('ready'), 600);
    }
  }, [step, charIdx, introText]);

  const handleComplete = () => {
    setName(name || 'Athlete');
    setCoachName(coachName || 'FormCoach');
    completeOnboarding();
    onComplete();
  };

  return (
    <div className="screen" style={{ padding: '0 20px 100px' }}>
      <div style={{ height: 2, background: '#2a2a2a' }}>
        <div style={{ height: 2, width: '100%', background: '#00C896' }} />
      </div>

      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0 32px' }}>
        <div style={{ position: 'relative', marginBottom: 20 }}>
          {[80, 64, 48].map((size, i) => (
            <div key={size} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: '1.5px solid rgba(0,200,150,0.3)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: `pulse-ring 2s ease ${i * 0.3}s infinite` }} />
          ))}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,200,150,0.2) 0%, rgba(0,200,150,0.05) 100%)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, boxShadow: '0 0 32px rgba(0,200,150,0.2)' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: '#00C896' }}>FC</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      {step === 'name' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <p className="section-label" style={{ marginBottom: 12, color: '#00C896' }}>Step 6 of 6</p>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em', marginBottom: 8 }}>What's your name?</h1>
            <p style={{ fontSize: 15, color: '#85948c' }}>Your coach will use this to personalize everything.</p>
          </div>
          <input className="input-field" value={name} onChange={e => setNameLocal(e.target.value)} placeholder="First name" style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }} />
          <button className="btn-primary" onClick={() => setStep('coach')} disabled={!name.trim()}>
            Next →
          </button>
          <button className="btn-ghost" onClick={onBack} style={{ textAlign: 'center' }}>← Back</button>
        </div>
      )}

      {step === 'coach' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em', marginBottom: 8 }}>Name your coach</h1>
            <p style={{ fontSize: 15, color: '#85948c' }}>Optional. Leave blank for "FormCoach".</p>
          </div>
          <input className="input-field" value={coachName} onChange={e => setCoachNameLocal(e.target.value)} placeholder="FormCoach" style={{ textAlign: 'center', fontSize: 18, fontWeight: 600 }} />
          <button className="btn-primary" onClick={() => setStep('intro')}>
            Meet Your Coach →
          </button>
        </div>
      )}

      {(step === 'intro' || step === 'ready') && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#00C896', textTransform: 'uppercase', marginBottom: 12 }}>{coachName}</p>
          </div>
          <div style={{ background: '#1C1B1B', border: '1px solid #2a2a2a', borderRadius: 16, borderBottomLeftRadius: 4, padding: '16px 18px', minHeight: 100 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#e5e2e1', lineHeight: '26px' }}>
              {speechText}
              {step === 'intro' && <span style={{ animation: 'blink 0.8s ease infinite', display: 'inline-block', width: 2, height: 18, background: '#00C896', marginLeft: 2, verticalAlign: 'middle' }} />}
            </p>
          </div>

          {step === 'ready' && (
            <button className="btn-primary" onClick={handleComplete} style={{ boxShadow: '0 4px 24px rgba(0,200,150,0.3)' }}>
              Let's Start Training 🔥
            </button>
          )}
        </div>
      )}
    </div>
  );
}
