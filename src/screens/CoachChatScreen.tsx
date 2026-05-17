import React, { useState, useRef, useEffect } from 'react';
import { useCoachStore } from '../stores/coachStore';
import { useUserStore } from '../stores/userStore';
import { streamCoachResponse } from '../lib/ai/coach';

const SUGGESTED = [
  "Why isn't my bench increasing?",
  "Can I work out with a sore back?",
  "Build me a 4-week plan",
  "What should I eat after training?",
];

export default function CoachChatScreen() {
  const { profile } = useUserStore();
  const { messages, isThinking, addMessage, setThinking, updateLastMessage } = useCoachStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setInput('');
    addMessage({ role: 'user', content: text });
    setThinking(true);

    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    setThinking(false);
    addMessage({ role: 'assistant', content: '', streaming: true });

    await streamCoachResponse(
      text,
      (chunk) => updateLastMessage(chunk),
      () => {}
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#131313' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid #1E1E1E', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: '#00C896' }}>FC</span>
            </div>
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, borderRadius: '50%', background: '#00C896', border: '2px solid #131313' }} />
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: '#e5e2e1' }}>{profile.coachName}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#00C896' }}>● Online · Full memory mode</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <span className="badge badge-green" style={{ fontSize: 10 }}>PRO</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-scroll">
        {/* Suggested prompts if conversation is short */}
        {messages.length <= 1 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#85948c', letterSpacing: '0.06em', marginBottom: 10, textTransform: 'uppercase' }}>Suggested</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {SUGGESTED.map(s => (
                <button key={s} onClick={() => send(s)} style={{ background: '#1C1B1B', border: '1px solid #2a2a2a', borderRadius: 10, padding: '10px 14px', textAlign: 'left', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#bbcac1', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#00C896')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fade-in 0.3s ease' }}>
            {msg.role === 'assistant' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '1.5px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 2 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fontWeight: 700, color: '#00C896' }}>FC</span>
              </div>
            )}
            <div style={{ maxWidth: '78%' }}>
              <div className={msg.role === 'user' ? 'bubble-user' : 'bubble-coach'} style={{ whiteSpace: 'pre-wrap', lineHeight: '22px' }}>
                {msg.content || (msg.streaming ? <span style={{ color: '#85948c' }}>▋</span> : '')}
                {msg.streaming && msg.content && <span style={{ animation: 'blink 0.7s ease infinite', marginLeft: 1 }}>▋</span>}
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#85948c', marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, animation: 'fade-in 0.3s ease' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '1.5px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fontWeight: 700, color: '#00C896' }}>FC</span>
            </div>
            <div className="bubble-coach" style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '14px 16px' }}>
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ padding: '10px 16px 20px', borderTop: '1px solid #1E1E1E', flexShrink: 0, background: '#131313' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div style={{ flex: 1, background: '#1C1B1B', border: '1px solid #2a2a2a', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}
            onFocus={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#00C896')}
            onBlur={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#2a2a2a')}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
              placeholder={`Message ${profile.coachName}...`}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#e5e2e1' }}
            />
          </div>
          <button onClick={() => send(input)} disabled={!input.trim()} style={{ width: 44, height: 44, borderRadius: '50%', background: input.trim() ? '#00C896' : '#2a2a2a', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.2s', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#000' : '#85948c'} strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
