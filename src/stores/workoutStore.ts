import { create } from 'zustand';

export interface SetLog {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  rir: number;
  logged: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  targetSets: number;
  targetRepsMin: number;
  targetRepsMax: number;
  targetWeight: number;
  restSeconds: number;
  sets: SetLog[];
  completed: boolean;
  skipped: boolean;
}

export interface ActiveWorkout {
  id: string;
  name: string;
  type: string;
  exercises: WorkoutExercise[];
  startedAt: Date;
  checkIn: {
    energy: number;
    sleep: number;
    stress: string;
    soreness: string[];
  } | null;
}

export interface CompletedWorkout {
  id: string;
  name: string;
  type: string;
  completedAt: Date;
  duration: number;
  totalVolume: number;
  avgRPE: number;
  exercisesCompleted: number;
  coachNote: string;
}

interface WorkoutStore {
  activeWorkout: ActiveWorkout | null;
  currentExerciseIndex: number;
  history: CompletedWorkout[];
  personalRecords: Record<string, { weight: number; reps: number; date: string }>;
  checkIn: ActiveWorkout['checkIn'];
  startWorkout: (workout: Omit<ActiveWorkout, 'startedAt'>) => void;
  setCheckIn: (ci: ActiveWorkout['checkIn']) => void;
  logSet: (exerciseIndex: number, setIndex: number, data: { reps: number; weight: number; rir: number }) => void;
  nextExercise: () => void;
  prevExercise: () => void;
  skipExercise: (index: number) => void;
  completeWorkout: () => void;
  clearWorkout: () => void;
}

const MOCK_HISTORY: CompletedWorkout[] = [
  { id: '1', name: 'Upper Body Push', type: 'push', completedAt: new Date(Date.now() - 2 * 86400000), duration: 47 * 60, totalVolume: 8240, avgRPE: 7.5, exercisesCompleted: 6, coachNote: 'Solid push session. Bench went up 2.5kg.' },
  { id: '2', name: 'Leg Day', type: 'legs', completedAt: new Date(Date.now() - 4 * 86400000), duration: 52 * 60, totalVolume: 14800, avgRPE: 8.2, exercisesCompleted: 6, coachNote: 'Squat PR! 105kg×5. Keep this momentum.' },
  { id: '3', name: 'Upper Body Pull', type: 'pull', completedAt: new Date(Date.now() - 7 * 86400000), duration: 44 * 60, totalVolume: 7100, avgRPE: 7.0, exercisesCompleted: 5, coachNote: 'Good lat work. Focus on mind-muscle connection.' },
  { id: '4', name: 'Full Body', type: 'full_body', completedAt: new Date(Date.now() - 9 * 86400000), duration: 58 * 60, totalVolume: 11200, avgRPE: 8.0, exercisesCompleted: 6, coachNote: 'Excellent volume. You\'re building great consistency.' },
  { id: '5', name: 'Upper Body Push', type: 'push', completedAt: new Date(Date.now() - 11 * 86400000), duration: 50 * 60, totalVolume: 7980, avgRPE: 7.8, exercisesCompleted: 6, coachNote: 'Strong effort.' },
  { id: '6', name: 'Leg Day', type: 'legs', completedAt: new Date(Date.now() - 14 * 86400000), duration: 53 * 60, totalVolume: 13400, avgRPE: 7.5, exercisesCompleted: 6, coachNote: 'RDL form is improving.' },
];

const MOCK_PRS = {
  'bench-press': { weight: 85, reps: 5, date: '2025-05-14' },
  'squat': { weight: 105, reps: 5, date: '2025-05-13' },
  'deadlift': { weight: 130, reps: 3, date: '2025-05-08' },
  'overhead-press': { weight: 62.5, reps: 6, date: '2025-05-10' },
  'pull-up': { weight: 0, reps: 12, date: '2025-05-12' },
  'bent-over-row': { weight: 75, reps: 8, date: '2025-05-11' },
};

const DEFAULT_WORKOUT: Omit<ActiveWorkout, 'startedAt'> = {
  id: 'w1',
  name: 'Upper Body Push',
  type: 'push',
  checkIn: null,
  exercises: [
    {
      exerciseId: 'incline-db-press',
      targetSets: 4,
      targetRepsMin: 8,
      targetRepsMax: 12,
      targetWeight: 28,
      restSeconds: 90,
      sets: [
        { id: 's1', setNumber: 1, reps: 10, weight: 28, rir: 2, logged: false },
        { id: 's2', setNumber: 2, reps: 10, weight: 28, rir: 2, logged: false },
        { id: 's3', setNumber: 3, reps: 10, weight: 28, rir: 2, logged: false },
        { id: 's4', setNumber: 4, reps: 10, weight: 28, rir: 2, logged: false },
      ],
      completed: false, skipped: false,
    },
    {
      exerciseId: 'bench-press',
      targetSets: 4,
      targetRepsMin: 6,
      targetRepsMax: 8,
      targetWeight: 80,
      restSeconds: 120,
      sets: [
        { id: 's5', setNumber: 1, reps: 7, weight: 80, rir: 2, logged: false },
        { id: 's6', setNumber: 2, reps: 7, weight: 80, rir: 2, logged: false },
        { id: 's7', setNumber: 3, reps: 7, weight: 80, rir: 2, logged: false },
        { id: 's8', setNumber: 4, reps: 7, weight: 80, rir: 2, logged: false },
      ],
      completed: false, skipped: false,
    },
    {
      exerciseId: 'overhead-press',
      targetSets: 3,
      targetRepsMin: 8,
      targetRepsMax: 10,
      targetWeight: 55,
      restSeconds: 90,
      sets: [
        { id: 's9', setNumber: 1, reps: 9, weight: 55, rir: 2, logged: false },
        { id: 's10', setNumber: 2, reps: 9, weight: 55, rir: 2, logged: false },
        { id: 's11', setNumber: 3, reps: 9, weight: 55, rir: 2, logged: false },
      ],
      completed: false, skipped: false,
    },
    {
      exerciseId: 'lateral-raises',
      targetSets: 3,
      targetRepsMin: 12,
      targetRepsMax: 15,
      targetWeight: 12,
      restSeconds: 60,
      sets: [
        { id: 's12', setNumber: 1, reps: 13, weight: 12, rir: 2, logged: false },
        { id: 's13', setNumber: 2, reps: 13, weight: 12, rir: 2, logged: false },
        { id: 's14', setNumber: 3, reps: 13, weight: 12, rir: 2, logged: false },
      ],
      completed: false, skipped: false,
    },
    {
      exerciseId: 'tricep-pushdown',
      targetSets: 3,
      targetRepsMin: 12,
      targetRepsMax: 15,
      targetWeight: 35,
      restSeconds: 60,
      sets: [
        { id: 's15', setNumber: 1, reps: 13, weight: 35, rir: 2, logged: false },
        { id: 's16', setNumber: 2, reps: 13, weight: 35, rir: 2, logged: false },
        { id: 's17', setNumber: 3, reps: 13, weight: 35, rir: 2, logged: false },
      ],
      completed: false, skipped: false,
    },
    {
      exerciseId: 'cable-crossover',
      targetSets: 3,
      targetRepsMin: 12,
      targetRepsMax: 15,
      targetWeight: 15,
      restSeconds: 60,
      sets: [
        { id: 's18', setNumber: 1, reps: 13, weight: 15, rir: 2, logged: false },
        { id: 's19', setNumber: 2, reps: 13, weight: 15, rir: 2, logged: false },
        { id: 's20', setNumber: 3, reps: 13, weight: 15, rir: 2, logged: false },
      ],
      completed: false, skipped: false,
    },
  ],
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  activeWorkout: null,
  currentExerciseIndex: 0,
  history: MOCK_HISTORY,
  personalRecords: MOCK_PRS,
  checkIn: null,

  startWorkout: (workout) => set({
    activeWorkout: { ...workout, startedAt: new Date() },
    currentExerciseIndex: 0,
  }),

  setCheckIn: (ci) => set((s) => ({
    checkIn: ci,
    activeWorkout: s.activeWorkout ? { ...s.activeWorkout, checkIn: ci } : null,
  })),

  logSet: (exerciseIndex, setIndex, data) => set((s) => {
    if (!s.activeWorkout) return s;
    const exercises = [...s.activeWorkout.exercises];
    const exercise = { ...exercises[exerciseIndex] };
    const sets = [...exercise.sets];
    sets[setIndex] = { ...sets[setIndex], ...data, logged: true };
    const allLogged = sets.every(st => st.logged);
    exercises[exerciseIndex] = { ...exercise, sets, completed: allLogged };
    return { activeWorkout: { ...s.activeWorkout, exercises } };
  }),

  nextExercise: () => set((s) => ({
    currentExerciseIndex: Math.min(s.currentExerciseIndex + 1, (s.activeWorkout?.exercises.length ?? 1) - 1),
  })),
  prevExercise: () => set((s) => ({
    currentExerciseIndex: Math.max(s.currentExerciseIndex - 1, 0),
  })),
  skipExercise: (index) => set((s) => {
    if (!s.activeWorkout) return s;
    const exercises = [...s.activeWorkout.exercises];
    exercises[index] = { ...exercises[index], skipped: true };
    return {
      activeWorkout: { ...s.activeWorkout, exercises },
      currentExerciseIndex: Math.min(s.currentExerciseIndex + 1, exercises.length - 1),
    };
  }),

  completeWorkout: () => set((s) => {
    if (!s.activeWorkout) return s;
    const completed: CompletedWorkout = {
      id: Date.now().toString(),
      name: s.activeWorkout.name,
      type: s.activeWorkout.type,
      completedAt: new Date(),
      duration: Math.round((Date.now() - s.activeWorkout.startedAt.getTime()) / 1000),
      totalVolume: s.activeWorkout.exercises.reduce((total, ex) =>
        total + ex.sets.filter(st => st.logged).reduce((v, st) => v + st.reps * st.weight, 0), 0),
      avgRPE: 7.5,
      exercisesCompleted: s.activeWorkout.exercises.filter(ex => ex.completed).length,
      coachNote: 'Great effort today. Your consistency is building something real.',
    };
    return { history: [completed, ...s.history], activeWorkout: null, currentExerciseIndex: 0 };
  }),

  clearWorkout: () => set({ activeWorkout: null, currentExerciseIndex: 0 }),
}));

export { DEFAULT_WORKOUT };
