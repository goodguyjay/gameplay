export type MatchCategory = 'ranqueada' | 'duelo1x1' | 'diversao';

export type PlayerStatus = 'disponivel' | 'ocupado';

export type MatchRole = 'anfitriao' | 'visitante';

export type GameId =
  | 'lol'
  | 'cod'
  | 'csgo'
  | 'apex'
  | 'valorant'
  | 'minecraft'
  | 'battlefield';

export type GameIcon =
  | { type: 'svg'; uri: string }
  | { type: 'glyph'; name: string };

export interface Game {
  id: GameId;
  name: string;
  color: string;
  icon: GameIcon;
}

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  status: PlayerStatus;
}

export interface Server {
  id: string;
  name: string;
  gameId: GameId;
  role: 'administrador' | 'convidado';
  players: Player[];
}

export interface ScheduledMatch {
  id: string;
  title: string;
  category: MatchCategory;
  gameId: GameId;
  serverId: string;
  day: string;
  month: string;
  hour: string;
  minute: string;
  description: string;
  role: MatchRole;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
