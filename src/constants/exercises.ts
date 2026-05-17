// Exercise library — 80 exercises (representative subset)
export interface Exercise {
  id: string;
  name: string;
  muscles: string[];
  equipment: string[];
  category: 'push' | 'pull' | 'legs' | 'core' | 'cardio' | 'shoulders';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  formCues: string[];
  hasFormCheck?: boolean;
}

export const EXERCISES: Exercise[] = [
  // PUSH
  { id: 'bench-press', name: 'Barbell Bench Press', muscles: ['chest', 'triceps', 'shoulders'], equipment: ['barbell'], category: 'push', difficulty: 'intermediate', formCues: ['Retract shoulder blades', 'Drive feet into floor', 'Lower bar to lower chest'], hasFormCheck: true },
  { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscles: ['upper_chest', 'shoulders', 'triceps'], equipment: ['dumbbells'], category: 'push', difficulty: 'beginner', formCues: ['45° angle', 'Elbows at 75°', 'Slow lowering phase'], hasFormCheck: true },
  { id: 'overhead-press', name: 'Overhead Press', muscles: ['shoulders', 'triceps', 'upper_back'], equipment: ['barbell'], category: 'shoulders', difficulty: 'intermediate', formCues: ['Core tight', 'Bar over heels', 'Lock out overhead'], hasFormCheck: true },
  { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', muscles: ['shoulders', 'triceps'], equipment: ['dumbbells'], category: 'shoulders', difficulty: 'beginner', formCues: ['Arms at 90° at bottom', 'Full lockout at top'] },
  { id: 'push-up', name: 'Push Up', muscles: ['chest', 'triceps', 'shoulders'], equipment: [], category: 'push', difficulty: 'beginner', formCues: ['Straight line from head to heels', 'Lower chest to floor', 'Elbows at 45°'] },
  { id: 'dips', name: 'Chest Dips', muscles: ['chest', 'triceps'], equipment: [], category: 'push', difficulty: 'intermediate', formCues: ['Lean forward for chest', 'Full range of motion', 'Control descent'] },
  { id: 'cable-crossover', name: 'Cable Crossover', muscles: ['chest'], equipment: ['cables'], category: 'push', difficulty: 'beginner', formCues: ['Feel the stretch', 'Cross at the bottom', 'Slight elbow bend'] },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', muscles: ['triceps'], equipment: ['cables'], category: 'push', difficulty: 'beginner', formCues: ['Lock elbows at sides', 'Full extension', 'Control the up'] },
  { id: 'close-grip-bench', name: 'Close Grip Bench Press', muscles: ['triceps', 'chest'], equipment: ['barbell'], category: 'push', difficulty: 'intermediate', formCues: ['Hands shoulder-width', 'Keep elbows tucked', 'Full lockout'] },
  { id: 'lateral-raises', name: 'Lateral Raises', muscles: ['shoulders'], equipment: ['dumbbells'], category: 'shoulders', difficulty: 'beginner', formCues: ['Slight forward lean', 'Lead with elbows', 'Stop at shoulder height'] },
  { id: 'front-raises', name: 'Front Raises', muscles: ['anterior_deltoid'], equipment: ['dumbbells'], category: 'shoulders', difficulty: 'beginner', formCues: ['Controlled motion', 'Shoulder height only', 'Keep core engaged'] },
  { id: 'arnold-press', name: 'Arnold Press', muscles: ['shoulders', 'triceps'], equipment: ['dumbbells'], category: 'shoulders', difficulty: 'intermediate', formCues: ['Full rotation', 'Start with palms facing you', 'Full extension'] },

  // PULL
  { id: 'pull-up', name: 'Pull Up', muscles: ['lats', 'biceps', 'upper_back'], equipment: [], category: 'pull', difficulty: 'intermediate', formCues: ['Dead hang start', 'Chest to bar', 'Control descent'], hasFormCheck: true },
  { id: 'lat-pulldown', name: 'Lat Pulldown', muscles: ['lats', 'biceps'], equipment: ['cables'], category: 'pull', difficulty: 'beginner', formCues: ['Pull to upper chest', 'Lean back slightly', 'Squeeze at bottom'] },
  { id: 'bent-over-row', name: 'Bent Over Row', muscles: ['lats', 'upper_back', 'biceps'], equipment: ['barbell'], category: 'pull', difficulty: 'intermediate', formCues: ['45° torso angle', 'Pull to lower chest', 'Keep lower back neutral'], hasFormCheck: true },
  { id: 'db-row', name: 'Dumbbell Row', muscles: ['lats', 'upper_back', 'biceps'], equipment: ['dumbbells'], category: 'pull', difficulty: 'beginner', formCues: ['Full stretch at bottom', 'Elbow close to body', 'Rotate at top'] },
  { id: 'seated-cable-row', name: 'Seated Cable Row', muscles: ['lats', 'upper_back', 'biceps'], equipment: ['cables'], category: 'pull', difficulty: 'beginner', formCues: ['Keep chest up', 'Squeeze shoulder blades', 'Controlled return'] },
  { id: 'face-pull', name: 'Face Pull', muscles: ['rear_deltoid', 'upper_back', 'rotator_cuff'], equipment: ['cables'], category: 'pull', difficulty: 'beginner', formCues: ['Pull to forehead', 'External rotation', 'Squeeze rear delts'] },
  { id: 'bicep-curl', name: 'Barbell Bicep Curl', muscles: ['biceps'], equipment: ['barbell'], category: 'pull', difficulty: 'beginner', formCues: ['No swinging', 'Full range of motion', 'Slow eccentric'] },
  { id: 'hammer-curl', name: 'Hammer Curl', muscles: ['biceps', 'brachialis'], equipment: ['dumbbells'], category: 'pull', difficulty: 'beginner', formCues: ['Neutral grip throughout', 'Pinch at top', 'Control down'] },
  { id: 'preacher-curl', name: 'Preacher Curl', muscles: ['biceps'], equipment: ['barbell'], category: 'pull', difficulty: 'beginner', formCues: ['Full stretch at bottom', 'No momentum', 'Squeeze at top'] },

  // LEGS
  { id: 'squat', name: 'Back Squat', muscles: ['quads', 'glutes', 'hamstrings'], equipment: ['barbell'], category: 'legs', difficulty: 'intermediate', formCues: ['Break at hips and knees simultaneously', 'Knees track toes', 'Hit parallel'], hasFormCheck: true },
  { id: 'deadlift', name: 'Conventional Deadlift', muscles: ['hamstrings', 'glutes', 'lower_back', 'lats'], equipment: ['barbell'], category: 'legs', difficulty: 'advanced', formCues: ['Bar over mid-foot', 'Big chest, lat squeeze', 'Push floor away'], hasFormCheck: true },
  { id: 'rdl', name: 'Romanian Deadlift', muscles: ['hamstrings', 'glutes'], equipment: ['barbell'], category: 'legs', difficulty: 'intermediate', formCues: ['Slight knee bend', 'Bar stays close to body', 'Feel hamstring stretch'], hasFormCheck: true },
  { id: 'leg-press', name: 'Leg Press', muscles: ['quads', 'glutes'], equipment: ['machines'], category: 'legs', difficulty: 'beginner', formCues: ['Full depth', 'Feet shoulder-width', 'Don\'t lock knees'] },
  { id: 'lunges', name: 'Walking Lunges', muscles: ['quads', 'glutes', 'hamstrings'], equipment: [], category: 'legs', difficulty: 'beginner', formCues: ['Back knee nearly touches floor', 'Front knee over toes', 'Upright torso'], hasFormCheck: true },
  { id: 'hip-thrust', name: 'Hip Thrust', muscles: ['glutes', 'hamstrings'], equipment: ['barbell'], category: 'legs', difficulty: 'beginner', formCues: ['Full hip extension', 'Squeeze glutes at top', 'Chin to chest'], hasFormCheck: true },
  { id: 'leg-curl', name: 'Leg Curl', muscles: ['hamstrings'], equipment: ['machines'], category: 'legs', difficulty: 'beginner', formCues: ['Full range', 'Control extension', 'Don\'t arch lower back'] },
  { id: 'leg-extension', name: 'Leg Extension', muscles: ['quads'], equipment: ['machines'], category: 'legs', difficulty: 'beginner', formCues: ['Full lockout', 'Slow down', 'Toes neutral'] },
  { id: 'calf-raise', name: 'Standing Calf Raise', muscles: ['calves'], equipment: [], category: 'legs', difficulty: 'beginner', formCues: ['Full range', 'Hold at top', 'Slow down'] },
  { id: 'goblet-squat', name: 'Goblet Squat', muscles: ['quads', 'glutes'], equipment: ['dumbbells', 'kettlebell'], category: 'legs', difficulty: 'beginner', formCues: ['Elbows inside knees', 'Chest tall', 'Deep squat'] },
  { id: 'sumo-deadlift', name: 'Sumo Deadlift', muscles: ['glutes', 'quads', 'hamstrings'], equipment: ['barbell'], category: 'legs', difficulty: 'intermediate', formCues: ['Wide stance', 'Toes pointed out 45°', 'Hips to bar'] },

  // CORE
  { id: 'plank', name: 'Plank', muscles: ['core', 'transverse_abdominis'], equipment: [], category: 'core', difficulty: 'beginner', formCues: ['Neutral spine', 'Don\'t let hips sag', 'Squeeze glutes'] },
  { id: 'ab-crunch', name: 'Ab Crunch', muscles: ['abs'], equipment: [], category: 'core', difficulty: 'beginner', formCues: ['Don\'t pull neck', 'Curl up not sit up', 'Exhale at top'] },
  { id: 'leg-raise', name: 'Hanging Leg Raise', muscles: ['lower_abs', 'hip_flexors'], equipment: [], category: 'core', difficulty: 'intermediate', formCues: ['Posterior pelvic tilt', 'Control descent', 'No swinging'] },
  { id: 'russian-twist', name: 'Russian Twist', muscles: ['obliques', 'abs'], equipment: [], category: 'core', difficulty: 'beginner', formCues: ['Feet off floor', 'Rotate torso not arms', 'Control movement'] },
  { id: 'cable-crunch', name: 'Cable Crunch', muscles: ['abs'], equipment: ['cables'], category: 'core', difficulty: 'beginner', formCues: ['Hips back', 'Crunch down with abs', 'Controlled return'] },
];

export const EXERCISE_MAP: Record<string, Exercise> = Object.fromEntries(EXERCISES.map(e => [e.id, e]));

export const WORKOUT_TEMPLATES = {
  push: {
    name: 'Upper Body Push',
    type: 'push' as const,
    exercises: ['incline-db-press', 'bench-press', 'overhead-press', 'lateral-raises', 'tricep-pushdown', 'cable-crossover'],
    duration: 50,
  },
  pull: {
    name: 'Upper Body Pull',
    type: 'pull' as const,
    exercises: ['pull-up', 'bent-over-row', 'lat-pulldown', 'face-pull', 'bicep-curl', 'hammer-curl'],
    duration: 45,
  },
  legs: {
    name: 'Leg Day',
    type: 'legs' as const,
    exercises: ['squat', 'rdl', 'leg-press', 'lunges', 'leg-curl', 'calf-raise'],
    duration: 55,
  },
  full_body: {
    name: 'Full Body',
    type: 'full_body' as const,
    exercises: ['squat', 'bench-press', 'bent-over-row', 'overhead-press', 'bicep-curl', 'plank'],
    duration: 60,
  },
};
