import React, { useState } from 'react';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function SignupScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Typically we'd register the user here. For prototype, we go to onboarding.
      onNavigate('onboarding-intro');
    }
  };

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', padding: '0 20px', justifyContent: 'center' }}>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'rgba(0,200,150,0.1)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: '#00C896' }}>FC</span>
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Start your transformation
          </h1>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#85948c' }}>
            Precision coaching for the elite athlete.
          </p>
        </div>

        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', marginBottom: 8, display: 'block' }}>EMAIL</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="athlete@example.com"
              style={{ width: '100%', background: '#1C1B1B', border: '1px solid #2a2a2a', borderRadius: 12, padding: '14px 16px', color: '#e5e2e1', fontFamily: "'Inter', sans-serif", fontSize: 15 }}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c', marginBottom: 8, display: 'block' }}>PASSWORD</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', background: '#1C1B1B', border: '1px solid #2a2a2a', borderRadius: 12, padding: '14px 16px', color: '#e5e2e1', fontFamily: "'Inter', sans-serif", fontSize: 15 }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: 8, padding: '16px', fontSize: 16 }}>
            Join FormCoach
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c' }}>
            Already have an account?{' '}
            <span onClick={() => onNavigate('login')} style={{ color: '#00C896', fontWeight: 600, cursor: 'pointer' }}>Login</span>
          </p>
        </div>

        {/* Coach Insight */}
        <div style={{ marginTop: 40, background: 'rgba(0,200,150,0.06)', borderLeft: '2px solid #00C896', borderRadius: 12, padding: '16px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#bbcac1', lineHeight: '20px' }}>
            <strong style={{ color: '#00C896' }}>Coach Insight:</strong> Joining FormCoach is the first step toward high-fidelity tracking of your biometric progress and mechanical efficiency.
          </p>
        </div>
      </div>

      <div style={{ padding: '24px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#555' }}>
          By joining, you agree to our <span style={{ textDecoration: 'underline' }}>Terms of Service</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
        </p>
      </div>

    </div>
  );
}
