import React, { useState } from 'react';
import { useUserStore } from './stores/userStore';

// Screens
import SplashScreen from './screens/SplashScreen';
import GoalsScreen from './screens/onboarding/GoalsScreen';
import ExperienceScreen from './screens/onboarding/ExperienceScreen';
import EquipmentScreen from './screens/onboarding/EquipmentScreen';
import ScheduleScreen from './screens/onboarding/ScheduleScreen';
import InjuriesScreen from './screens/onboarding/InjuriesScreen';
import CoachIntroScreen from './screens/onboarding/CoachIntroScreen';
import HomeScreen from './screens/HomeScreen';
import ActiveWorkoutScreen from './screens/ActiveWorkoutScreen';
import CoachChatScreen from './screens/CoachChatScreen';
import ProgressScreen from './screens/ProgressScreen';
import WorkoutCompleteScreen from './screens/WorkoutCompleteScreen';
import AdjustSessionScreen from './screens/AdjustSessionScreen';
import FormCheckResultsScreen from './screens/FormCheckResultsScreen';

type Screen =
  | 'splash'
  | 'onboarding-goals' | 'onboarding-experience' | 'onboarding-equipment'
  | 'onboarding-schedule' | 'onboarding-injuries' | 'onboarding-intro'
  | 'home' | 'active-workout' | 'coach' | 'progress' | 'workout-complete'
  | 'adjust-session' | 'form-check-results';

type Tab = 'home' | 'coach' | 'progress';

const NAV_ITEMS: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: 'home', label: 'Home',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#00C896' : 'none'} stroke={a ? '#00C896' : '#85948c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'coach', label: 'Coach',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#00C896' : 'none'} stroke={a ? '#00C896' : '#85948c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'progress', label: 'Progress',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#00C896' : '#85948c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

export default function App() {
  const { profile } = useUserStore();
  const [screen, setScreen] = useState<Screen>(
    profile.onboardingComplete ? 'home' : 'splash'
  );
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [formCheckExercise, setFormCheckExercise] = useState('');

  const navigate = (s: string) => setScreen(s as Screen);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setScreen(tab === 'home' ? 'home' : tab === 'coach' ? 'coach' : 'progress');
  };

  const isMainApp = ['home', 'coach', 'progress'].includes(screen);
  const isFullscreen = ['active-workout', 'workout-complete', 'adjust-session', 'form-check-results'].includes(screen);
  const showOnboarding = screen.startsWith('onboarding');

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen onStart={() => navigate('onboarding-goals')} />;
      case 'onboarding-goals': return <GoalsScreen onNext={() => navigate('onboarding-experience')} />;
      case 'onboarding-experience': return <ExperienceScreen onNext={() => navigate('onboarding-equipment')} onBack={() => navigate('onboarding-goals')} />;
      case 'onboarding-equipment': return <EquipmentScreen onNext={() => navigate('onboarding-schedule')} onBack={() => navigate('onboarding-experience')} />;
      case 'onboarding-schedule': return <ScheduleScreen onNext={() => navigate('onboarding-injuries')} onBack={() => navigate('onboarding-equipment')} />;
      case 'onboarding-injuries': return <InjuriesScreen onNext={() => navigate('onboarding-intro')} onBack={() => navigate('onboarding-schedule')} />;
      case 'onboarding-intro': return <CoachIntroScreen onComplete={() => navigate('home')} onBack={() => navigate('onboarding-injuries')} />;
      case 'home': return <HomeScreen onNavigate={navigate} />;
      case 'active-workout':
        return (
          <ActiveWorkoutScreen
            onComplete={() => navigate('workout-complete')}
            onBack={() => navigate('home')}
            onFormCheck={(exId) => { setFormCheckExercise(exId); navigate('form-check-results'); }}
          />
        );
      case 'form-check-results':
        return <FormCheckResultsScreen onBack={() => navigate('active-workout')} />;
      case 'adjust-session':
        return <AdjustSessionScreen onBack={() => navigate('home')} onSwap={() => {}} />;
      case 'workout-complete': return <WorkoutCompleteScreen onHome={() => { navigate('home'); setActiveTab('home'); }} />;
      case 'coach': return <CoachChatScreen />;
      case 'progress': return <ProgressScreen />;
      default: return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="device-frame">
      <div className="phone">
        {/* Status bar */}
        <div className="status-bar">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#bbcac1', fontWeight: 600 }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {/* Signal */}
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 10 }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: i < 3 ? '#bbcac1' : '#3c4a43' }} />
              ))}
            </div>
            {/* WiFi */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 4C3.3 1.7 6 .5 7 .5S10.7 1.7 13 4" stroke="#bbcac1" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M3 6.5C4.3 5.2 5.5 4.5 7 4.5S9.7 5.2 11 6.5" stroke="#bbcac1" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="7" cy="9" r="1" fill="#bbcac1"/>
            </svg>
            {/* Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 20, height: 10, borderRadius: 2, border: '1px solid #bbcac1', padding: '1px', position: 'relative' }}>
                <div style={{ width: '78%', height: '100%', background: '#00C896', borderRadius: 1 }} />
              </div>
              <div style={{ width: 2, height: 5, borderRadius: '0 1px 1px 0', background: '#bbcac1' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={isFullscreen ? 'content-fullscreen' : isMainApp ? 'content-with-nav' : 'content-onboarding'} style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="screen-transition" key={screen} style={{ height: '100%', overflowY: 'auto' }}>
            {renderScreen()}
          </div>
        </div>

        {/* Bottom Navigation (only for main app screens) */}
        {isMainApp && (
          <nav className="bottom-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                }}
              >
                {activeTab === item.id && (
                  <div style={{ position: 'absolute', top: -1, width: 28, height: 2, borderRadius: 1, background: '#00C896' }} />
                )}
                {item.icon(activeTab === item.id)}
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: activeTab === item.id ? 600 : 400, color: activeTab === item.id ? '#00C896' : '#85948c' }}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
