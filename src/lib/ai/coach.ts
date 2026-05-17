// Mock AI Coach — simulates Claude API responses with realistic fitness coaching
const COACH_RESPONSES = {
  bench: [
    "Your bench has been trending up nicely — 80kg feels solid based on your last few sessions. Focus on controlled descent this time, 2-3 seconds down. That's where the real gains are built.",
    "For bench, keep your shoulder blades pinched back throughout the entire set. You mentioned some shoulder discomfort last week — if you feel any clicking, reduce the weight by 5kg immediately.",
  ],
  squat: [
    "Squats today — remember your depth cue. You were hitting parallel consistently last session. Drive through your heels and think 'knees out' on the way up.",
    "Based on your check-in, I've kept squats in but we'll manage volume. Your 3×8 target stands, but stop at RPE 8 — don't push to failure with the fatigue you reported.",
  ],
  form: [
    "Your depth is improving — you hit parallel on 7 of 10 reps in the last session. The main thing to watch is your right knee caving slightly on the way up. Think 'spread the floor' with your feet.",
    "Good session. The left shoulder positioning was better than last week. Keep that lat engagement cue — it's making a real difference to your stability.",
  ],
  general: [
    "Three weeks straight, Marcus — that's your longest streak since we started. You're past the drop-off point where most people quit. Don't stop now.",
    "Your volume is up 18% month-over-month while your RPE has stayed flat. That's exactly what progressive overload looks like. The work is paying off.",
    "Sleep data is showing you're averaging 6.2 hours this week. That's limiting your recovery. Even 45 extra minutes would meaningfully impact your next session.",
    "I noticed you've been skipping the finisher sets lately. I get it — they're brutal. But that's where a lot of your hypertrophy gains are coming from. Let's talk about it.",
  ],
  injury: [
    "Shoulder clicking during pressing is worth taking seriously. Let's sub the overhead press for face pulls and dumbbell lateral raises today — same deltoid stimulus, much less joint stress.",
    "For the lower back sensitivity you mentioned, we'll skip the barbell RDLs and use the dumbbell version with a shorter range of motion. Your lower back should be feeling it tomorrow, not during.",
  ],
  checkin: [
    "Got it. I've adjusted today's session — lighter on the legs since they're sore. Let's focus on upper body today. Volume is down 20% but quality stays the same.",
    "Low energy plus 5 hours sleep — I'm cutting the heavy compound sets in half and adding 5 minutes of activation work to get you moving. Quality over quantity today.",
    "You're stressed and under-recovered. I'm keeping the session but we're treating this as a movement day — moderate weight, focus on technique, no grinding. In and out in 35 minutes.",
  ],
  diet: [
    "Post-workout nutrition: you want 40-50g of protein within 2 hours. A chicken breast or Greek yogurt + protein shake combo works great. Don't overthink it.",
    "Based on your muscle-building goal, you need to be in a slight caloric surplus — roughly 200-300 calories above maintenance. If you're not tracking, just make sure every meal has a palm-sized protein source.",
  ],
  plan: [
    "Here's a 4-week block based on your equipment and experience:\n\n**Week 1-2:** Foundation phase. 3 days/week, moderate volume, focus on form.\n**Week 3:** Volume week. Add one extra set per exercise.\n**Week 4:** Deload. 60% of normal volume, same frequency.\n\nWant me to build out the detailed sessions?",
  ],
};

function getCoachResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes('bench') || lower.includes('chest') || lower.includes('press')) {
    return COACH_RESPONSES.bench[Math.floor(Math.random() * COACH_RESPONSES.bench.length)];
  }
  if (lower.includes('squat') || lower.includes('legs') || lower.includes('knee')) {
    return COACH_RESPONSES.squat[Math.floor(Math.random() * COACH_RESPONSES.squat.length)];
  }
  if (lower.includes('form') || lower.includes('technique') || lower.includes('depth')) {
    return COACH_RESPONSES.form[Math.floor(Math.random() * COACH_RESPONSES.form.length)];
  }
  if (lower.includes('shoulder') || lower.includes('back') || lower.includes('pain') || lower.includes('hurt') || lower.includes('click')) {
    return COACH_RESPONSES.injury[Math.floor(Math.random() * COACH_RESPONSES.injury.length)];
  }
  if (lower.includes('eat') || lower.includes('food') || lower.includes('protein') || lower.includes('diet') || lower.includes('nutrition')) {
    return COACH_RESPONSES.diet[Math.floor(Math.random() * COACH_RESPONSES.diet.length)];
  }
  if (lower.includes('plan') || lower.includes('program') || lower.includes('week') || lower.includes('4 week')) {
    return COACH_RESPONSES.plan[0];
  }
  return COACH_RESPONSES.general[Math.floor(Math.random() * COACH_RESPONSES.general.length)];
}

export async function streamCoachResponse(
  userMessage: string,
  onChunk: (text: string) => void,
  onDone: () => void
): Promise<void> {
  const fullResponse = getCoachResponse(userMessage);
  const words = fullResponse.split(' ');

  let accumulated = '';
  for (let i = 0; i < words.length; i++) {
    await new Promise(r => setTimeout(r, 40 + Math.random() * 40));
    accumulated += (i === 0 ? '' : ' ') + words[i];
    onChunk(accumulated);
  }
  onDone();
}

export const DAILY_NOTES = [
  "You've hit 3 weeks straight — your bench is up 12%. Keep going.",
  "Sleep data shows you averaged 6.8h this week. Recovery is solid — expect a strong session.",
  "Volume is up 18% this month while RPE stayed flat. That's progressive overload working.",
  "Last Tuesday's squat PR still stands at 105kg. Today's a good day to build on that.",
  "Your consistency score hit 87% this month — highest ever. Don't break the chain.",
];

export const WORKOUT_VOICE_CUES = {
  start: (exerciseName: string, name: string) =>
    `Alright ${name}, let's get into it. Starting with ${exerciseName} — lock in your form from rep one.`,
  setComplete: (restSeconds: number) =>
    `Nice work. Rest for ${restSeconds} seconds, then we're going again.`,
  pr: (exerciseName: string, weight: number, reps: number) =>
    `That's a new personal best on ${exerciseName} — ${weight}kg for ${reps} reps. Lock that in.`,
  lastExercise: () => `Last one. Make it count.`,
  skip: () => `Noted — I'll remember you had trouble with that today.`,
};
