import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function FormCheckResultsScreen({ onBack }: Props) {
  return (
    <div style={{ padding: '24px 20px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#e5e2e1', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em' }}>Form Check Results</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c' }}>Barbell Squat Analysis</p>
        </div>
      </div>

      {/* Main Score Area */}
      <div style={{ background: '#1C1B1B', borderRadius: 20, padding: 24, textAlign: 'center', marginBottom: 24, border: '1px solid #2a2a2a' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', color: '#00C896', marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700 }}>8<span style={{ fontSize: 16, color: '#85948c' }}>/8</span></span>
        </div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: '#e5e2e1', marginBottom: 8 }}>Reps Detected</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#85948c' }}>All expected reps were successfully identified. Overall form score: 82/100.</p>
      </div>

      <h4 className="section-label" style={{ marginBottom: 16 }}>Top Issues</h4>

      {/* Issues List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        
        {/* Issue 1 */}
        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px' }}>
          <div style={{ color: '#F5A623', marginTop: 2 }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h5 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#e5e2e1', marginBottom: 6 }}>Heel Lift</h5>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c', lineHeight: 1.5 }}>
              Keep heels grounded during the deepest part of the squat.
            </p>
          </div>
        </div>

        {/* Issue 2 */}
        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px' }}>
          <div style={{ color: '#E5534B', marginTop: 2 }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h5 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#e5e2e1', marginBottom: 6 }}>Chest Drop</h5>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c', lineHeight: 1.5 }}>
              Chest dipped slightly on reps 6 and 7.
            </p>
          </div>
        </div>

        {/* Positive Note */}
        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', borderColor: 'rgba(0,200,150,0.3)', background: 'rgba(0,200,150,0.03)' }}>
          <div style={{ color: '#00C896', marginTop: 2 }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h5 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#e5e2e1', marginBottom: 6 }}>Great Depth</h5>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#85948c', lineHeight: 1.5 }}>
              Great depth overall. Focus on ankle mobility to keep those heels down, and you'll hit 90+ score next time.
            </p>
          </div>
        </div>
      </div>

      {/* Replay Video CTA */}
      <div style={{ marginTop: 24 }}>
        <button className="btn-secondary">
          <PlayCircle size={18} /> Review Recorded Video
        </button>
      </div>
    </div>
  );
}
