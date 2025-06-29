import { getChar } from '@/helpers';
import { ACTIONS, useChess } from './ChessProvider';
import Piece from './Piece';
import { Chess, type Square } from 'chess.js';

interface ISquare {
  rank: { r: number; i: number };
  file: { f: number; j: number };
  piece?: string;
}

export default function Square({ file, rank }: ISquare) {
  const { fen, chosenSquare, dispatch } = useChess();
  const { r, i } = rank;
  const { f, j } = file;
  const isDark = (i + j) % 2 === 1;
  const isFirstFile = i === 7;
  const isFirstRank = j === 0;

  const pieceOnSquare = () => {
    const chess = new Chess(fen);
    const board = chess.board();
    const p = board[i][j];
    if (!p) return '';
    return p.color + p.type;
  };

  const handleSquareClick = () => {
    const square = (getChar(f) + r) as Square;

    if (chosenSquare.square && chosenSquare.moves?.map((m) => m.to).includes(square)) {
      dispatch({ type: ACTIONS.MOVE, payload: { from: chosenSquare.square, to: getChar(f) + r } });
      return;
    }

    dispatch({ type: ACTIONS.CHOOSE_SQUARE, payload: { chosenSquare: square } });
  };

  const getSquareColor = (isDark: boolean) => (isDark ? '--dark-square' : '--light-square');

  return (
    <div
      onClick={() => handleSquareClick()}
      key={`${r}${f}`}
      className={`relative flex items-center justify-center text-xs bg-[var(${getSquareColor(isDark)})]`}
    >
      {isFirstRank && <span className={`absolute top-0 left-0 text-(${getSquareColor(!isDark)}) m-1`}>{r}</span>}
      {isFirstFile && (
        <span className={`absolute bottom-0 right-0 text-(${getSquareColor(!isDark)}) m-1`}>{getChar(f)}</span>
      )}
      <Piece type={pieceOnSquare()} />
      {chosenSquare.moves.map((m) => m.to).includes((getChar(f) + r) as Square) && <Indicator type={'move'} />}
    </div>
  );
}

interface IIndicator {
  type: 'capture' | 'move';
}

function Indicator({ type }: IIndicator) {
  switch (type) {
    case 'capture':
      return (
        <span className='absolute w-10 h-10 rounded-full border-2 border-gray-500 bg-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-70' />
      );

    case 'move':
      return (
        <span className='absolute w-4 h-4 rounded-full bg-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-70'></span>
      );

    default:
      break;
  }
}
