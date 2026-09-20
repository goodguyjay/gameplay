import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { seedMatches } from '../data/mockMatches';
import type { ScheduledMatch } from '../data/types';

interface MatchesState {
  matches: ScheduledMatch[];
  hasHydrated: boolean;
  addMatch: (match: Omit<ScheduledMatch, 'id'>) => void;
  getMatchById: (id: string) => ScheduledMatch | undefined;
}

export const useMatchesStore = create<MatchesState>()(
  persist(
    (set, get) => ({
      matches: seedMatches,
      hasHydrated: false,
      addMatch: (match) =>
        set((state) => ({
          matches: [
            { ...match, id: `m-${Date.now()}` },
            ...state.matches,
          ],
        })),
      getMatchById: (id) => get().matches.find((m) => m.id === id),
    }),
    {
      name: 'gameplay-matches',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useMatchesStore.setState({ hasHydrated: true });
      },
    }
  )
);
