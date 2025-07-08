export const getChar = (i: number) => String.fromCharCode(i + 96);

export const initialBoard: (string | null)[][] = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

export const openings = [
  { name: 'Vienna Game', key: 'vienna-game', description: 'A flexible opening starting with 1.e4 e5 2.Nc3.' },
  {
    name: 'Vienna Gambit',
    key: 'vienna-gambit',
    description: 'A sharp gambit in the Vienna Game: 1.e4 e5 2.Nc3 Nf6 3.f4.',
  },
  { name: 'King’s Gambit Accepted', key: 'kga', description: 'A classic gambit: 1.e4 e5 2.f4 exf4.' },
  {
    name: 'King’s Gambit Declined',
    key: 'kgd',
    description: 'A solid response to the King’s Gambit: 1.e4 e5 2.f4 Bc5.',
  },
];

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
