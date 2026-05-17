import React, { useState } from 'react';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function LoginScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Mock login successful, go to dashboard
      onNavigate('home');
    }
  };

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', padding: '0 20px', justifyContent: 'center' }}>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(0,200,150,0.1)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: '#00C896' }}>FC</span>
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Welcome back
          </h1>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#85948c' }}>
            Continue your performance journey.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#85948c' }}>PASSWORD</label>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#00C896', cursor: 'pointer' }}>Forgot?</span>
            </div>
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
            Login
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c' }}>
            Don't have an account?{' '}
            <span onClick={() => onNavigate('signup')} style={{ color: '#00C896', fontWeight: 600, cursor: 'pointer' }}>Join</span>
          </p>
        </div>

        {/* Coach Quote */}
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#666', fontStyle: 'italic', lineHeight: '22px' }}>
            "Precision is the foundation of progress. Let's pick up where your last session left off."
          </p>
        </div>
      </div>
    </div>
  );
}
