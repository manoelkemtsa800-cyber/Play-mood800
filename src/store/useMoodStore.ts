import {create} from 'zustand';

interface Mood {
  id: string;
  name: string;
  emoji: string;
  colorHex: string;
}

interface MoodState {
  currentMood: Mood | null;
  setMood: (mood: Mood) => void;
  clearMood: () => void;
}

export const useMoodStore = create<MoodState>(set => ({
  currentMood: null,
  setMood: mood => set({currentMood: mood}),
  clearMood: () => set({currentMood: null}),
}));
