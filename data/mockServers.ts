import type { Game, Server } from './types';

const simpleIcon = (slug: string): { type: 'svg'; uri: string } => ({
  type: 'svg',
  uri: `https://cdn.simpleicons.org/${slug}/ffffff`,
});

const glyphIcon = (name: string): { type: 'glyph'; name: string } => ({ type: 'glyph', name });

export const games: Record<string, Game> = {
  lol: { id: 'lol', name: 'League of Legends', color: '#1F8A6E', icon: simpleIcon('leagueoflegends') },
  cod: { id: 'cod', name: 'Call of Duty', color: '#3B3F45', icon: glyphIcon('pistol') },
  csgo: { id: 'csgo', name: 'CS:GO', color: '#C9A227', icon: simpleIcon('counterstrike') },
  apex: { id: 'apex', name: 'Apex Legends', color: '#D3373C', icon: glyphIcon('target') },
  valorant: { id: 'valorant', name: 'Valorant', color: '#FF4655', icon: simpleIcon('valorant') },
  minecraft: { id: 'minecraft', name: 'Minecraft', color: '#5D8A3A', icon: glyphIcon('minecraft') },
  battlefield: { id: 'battlefield', name: 'Battlefield', color: '#4A5A3C', icon: glyphIcon('tank') },
};

const players = (seed: number, names: [string, 'disponivel' | 'ocupado'][]) =>
  names.map(([name, status], i) => ({
    id: `p${seed}${i}`,
    name,
    avatarUrl: `https://i.pravatar.cc/300?img=${((seed + i - 1) % 70) + 1}`,
    status,
  }));

export const mockServers: Server[] = [
  {
    id: 's-lol',
    name: 'Lendários',
    gameId: 'lol',
    role: 'administrador',
    players: players(20, [
      ['Tiago Luchtenberg', 'disponivel'],
      ['Rodrigo Gonçalves', 'ocupado'],
      ['Diego Fernandes', 'ocupado'],
    ]),
  },
  {
    id: 's-cod',
    name: 'Yeah, Boy',
    gameId: 'cod',
    role: 'convidado',
    players: players(30, [
      ['Marcelo Souza', 'disponivel'],
      ['Bianca Nogueira', 'disponivel'],
      ['Felipe Ramos', 'ocupado'],
    ]),
  },
  {
    id: 's-csgo',
    name: 'Rumo ao topo',
    gameId: 'csgo',
    role: 'administrador',
    players: players(40, [
      ['Lucas Prado', 'disponivel'],
      ['Henrique Alves', 'ocupado'],
    ]),
  },
  {
    id: 's-apex',
    name: 'Bora queimar tudo',
    gameId: 'apex',
    role: 'convidado',
    players: players(50, [
      ['Carla Menezes', 'disponivel'],
      ['Vitor Hugo', 'disponivel'],
      ['Paula Regina', 'ocupado'],
    ]),
  },
  {
    id: 's-valorant',
    name: 'Valorosos',
    gameId: 'valorant',
    role: 'convidado',
    players: players(60, [
      ['Bruno Castro', 'disponivel'],
      ['Amanda Rocha', 'ocupado'],
      ['Igor Teixeira', 'disponivel'],
    ]),
  },
  {
    id: 's-minecraft',
    name: 'Construtores',
    gameId: 'minecraft',
    role: 'convidado',
    players: players(70, [
      ['Sofia Barros', 'disponivel'],
      ['Rafael Dias', 'disponivel'],
    ]),
  },
  {
    id: 's-battlefield',
    name: 'Bottle Insane',
    gameId: 'battlefield',
    role: 'convidado',
    players: players(80, [
      ['Eduardo Lima', 'ocupado'],
      ['Camila Freitas', 'disponivel'],
    ]),
  },
];

export const getServerById = (id: string) => mockServers.find((s) => s.id === id);
export const getGameById = (id: string) => games[id];
