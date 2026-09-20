import type { MatchCategory } from './types';

export const categories: { id: MatchCategory; label: string; icon: string }[] = [
  { id: 'ranqueada', label: 'Ranqueada', icon: 'trophy' },
  { id: 'duelo1x1', label: 'Duelo 1x1', icon: 'sword-cross' },
  { id: 'diversao', label: 'Diversão', icon: 'emoticon-happy' },
];

export const categoryLabel = (id: MatchCategory) =>
  categories.find((c) => c.id === id)?.label ?? id;
