import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HistoryItem {
  id: string;
  type: 'seminar' | 'robotics';
  timestamp: number;
  title: string;
  studentNames: string[];
  paperData: any;
  studentData: any;
}

interface HistoryState {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (item) => set((state) => ({
        history: [
          {
            ...item,
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
          },
          ...state.history,
        ].slice(0, 20), // keep only last 20 items
      })),
      removeHistory: (id) => set((state) => ({
        history: state.history.filter((h) => h.id !== id),
      })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'kse-synopsis-history',
    }
  )
);
