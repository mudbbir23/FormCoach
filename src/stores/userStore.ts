import { create } from 'zustand';

export type Goal = 'build_muscle' | 'lose_fat' | 'get_stronger' | 'improve_endurance' | 'stay_active';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'bodyweight' | 'dumbbells' | 'barbell' | 'cables' | 'full_gym' | 'bands' | 'kettlebells';
export type WorkoutTime = 'morning' | 'lunch' | 'evening';

export interface UserProfile {
  name: string;
  coachName: string;
  goals: Goal[];
  experience: ExperienceLevel;
  equipment: Equipment[];
  injuries: string[];
  schedule: {
    days: string[];
    time: WorkoutTime;
  };
  onboardingComplete: boolean;
}

interface UserStore {
  profile: UserProfile;
  setName: (name: string) => void;
  setCoachName: (name: string) => void;
  setGoals: (goals: Goal[]) => void;
  setExperience: (level: ExperienceLevel) => void;
  setEquipment: (equipment: Equipment[]) => void;
  setInjuries: (injuries: string[]) => void;
  setSchedule: (schedule: UserProfile['schedule']) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: {
    name: 'Marcus',
    coachName: 'FormCoach',
    goals: ['build_muscle'],
    experience: 'intermediate',
    equipment: ['dumbbells', 'barbell'],
    injuries: [],
    schedule: { days: ['monday', 'wednesday', 'friday'], time: 'morning' },
    onboardingComplete: false,
  },
  setName: (name) => set((s) => ({ profile: { ...s.profile, name } })),
  setCoachName: (coachName) => set((s) => ({ profile: { ...s.profile, coachName } })),
  setGoals: (goals) => set((s) => ({ profile: { ...s.profile, goals } })),
  setExperience: (experience) => set((s) => ({ profile: { ...s.profile, experience } })),
  setEquipment: (equipment) => set((s) => ({ profile: { ...s.profile, equipment } })),
  setInjuries: (injuries) => set((s) => ({ profile: { ...s.profile, injuries } })),
  setSchedule: (schedule) => set((s) => ({ profile: { ...s.profile, schedule } })),
  completeOnboarding: () => set((s) => ({ profile: { ...s.profile, onboardingComplete: true } })),
}));
