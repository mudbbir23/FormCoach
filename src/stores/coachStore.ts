import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

interface CoachStore {
  messages: Message[];
  isThinking: boolean;
  dailyNote: string;
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  setThinking: (v: boolean) => void;
  setDailyNote: (note: string) => void;
  clearMessages: () => void;
  updateLastMessage: (content: string) => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hey Marcus 👋 Ready to get after it today? You've been on a 3-week streak — that's the best run you've had since we started. Upper body push is on the plan. How are you feeling?",
    timestamp: new Date(Date.now() - 60000),
  },
];

export const useCoachStore = create<CoachStore>((set) => ({
  messages: INITIAL_MESSAGES,
  isThinking: false,
  dailyNote: "You've hit 3 weeks straight — your bench is up 12%. Keep going.",

  addMessage: (msg) => set((s) => ({
    messages: [...s.messages, { ...msg, id: Date.now().toString(), timestamp: new Date() }],
  })),

  setThinking: (v) => set({ isThinking: v }),
  setDailyNote: (note) => set({ dailyNote: note }),
  clearMessages: () => set({ messages: INITIAL_MESSAGES }),

  updateLastMessage: (content) => set((s) => {
    const messages = [...s.messages];
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      messages[messages.length - 1] = { ...messages[messages.length - 1], content, streaming: false };
    }
    return { messages };
  }),
}));
