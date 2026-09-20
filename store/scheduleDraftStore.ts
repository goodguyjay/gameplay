import { create } from 'zustand';
import type { MatchCategory } from '../data/types';

interface ScheduleDraftState {
  category: MatchCategory | null;
  serverId: string | null;
  day: string;
  month: string;
  hour: string;
  minute: string;
  description: string;
  setCategory: (category: MatchCategory) => void;
  setServerId: (serverId: string) => void;
  setField: (field: 'day' | 'month' | 'hour' | 'minute' | 'description', value: string) => void;
  reset: () => void;
}

const initialState = {
  category: null as MatchCategory | null,
  serverId: null as string | null,
  day: '',
  month: '',
  hour: '',
  minute: '',
  description: '',
};

export const useScheduleDraftStore = create<ScheduleDraftState>()((set) => ({
  ...initialState,
  setCategory: (category) => set({ category }),
  setServerId: (serverId) => set({ serverId }),
  setField: (field, value) => set({ [field]: value }),
  reset: () => set(initialState),
}));
