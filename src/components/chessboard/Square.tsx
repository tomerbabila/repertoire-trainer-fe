import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { getChar } from '@/helpers';
import { ACTIONS, useChess } from './ChessProvider';
import Piece from './Piece';
import { type Square as ChessSquare } from 'chess.js';

interface SquareProps {
  rank: { rankNum: number; rankIdx: number };
  file: { fileNum: number; fileIdx: number };
}

export default function Square({ file, rank }: SquareProps) {
  const { chosenSquare, dispatch, chess } = useChess();

  const { rankNum, rankIdx } = rank;
  const { fileNum, fileIdx } = file;

  const isDark = useMemo(() => (rankIdx + fileIdx) % 2 === 1, [rankIdx, fileIdx]);
  const isFirstFile = useMemo(() => rankIdx === 7, [rankIdx]);
  const isFirstRank = useMemo(() => fileIdx === 0, [fileIdx]);
  const bgColor = useMemo(() => (isDark ? 'bg-[var(--dark-square)]' : 'bg-[var(--light-square)]'), [isDark]);
  const textColor = useMemo(() => (!isDark ? 'text-[var(--dark-square)]' : 'text-[var(--light-square)]'), [isDark]);

  const getPieceType = () => {
    const board = chess.board();
    const piece = board[rankIdx][fileIdx];
    if (!piece) return '';
    return piece.color + piece.type;
  };

  const getSquareName = () => (getChar(fileNum) + rankNum) as ChessSquare;
  const squareName = getSquareName();

  // DnD drop logic
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    canDrop: (item: { type: string; square: string }) => {
      if (!item || !item.square) return false;
      // Use chosenSquare.moves if the dragged piece is the selected one
      if (chosenSquare.square === item.square && chosenSquare.moves) {
        return chosenSquare.moves.some((m) => m.to === squareName);
      }
      // Otherwise, fallback to not allowing drop
      return false;
    },
    drop: (item: { type: string; square: string }) => {
      if (chosenSquare.square === item.square && chosenSquare.moves) {
        if (chosenSquare.moves.some((m) => m.to === squareName)) {
          dispatch({ type: ACTIONS.MOVE, payload: { from: item.square, to: squareName } });
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Click logic for moving or clearing indicators
  const handleSquareClick = () => {
    // If a piece is selected and this square is a valid move, move the piece
    if (chosenSquare.square && chosenSquare.moves?.some((m) => m.to === squareName)) {
      dispatch({ type: ACTIONS.MOVE, payload: { from: chosenSquare.square, to: squareName } });
      return;
    }
    // If clicking on a piece of the current turn, select it
    const piece = getPieceType();
    if (piece && piece[0] === chess.turn()) {
      dispatch({ type: ACTIONS.CHOOSE_SQUARE, payload: { chosenSquare: squareName } });
    } else {
      // Otherwise, clear selection
      dispatch({ type: ACTIONS.CHOOSE_SQUARE, payload: { chosenSquare: null } });
    }
  };

  return (
    <div
      ref={drop as unknown as React.RefCallback<HTMLDivElement>}
      onClick={handleSquareClick}
      className={`relative flex items-center justify-center text-xs ${bgColor}`}
    >
      {isFirstRank && <span className={`absolute top-0 left-0 m-1 ${textColor}`}>{rankNum}</span>}
      {isFirstFile && <span className={`absolute bottom-0 right-0 m-1 ${textColor}`}>{getChar(fileNum)}</span>}
      <Piece type={getPieceType()} square={squareName} />
      {chosenSquare.square && chosenSquare.moves.some((m) => m.to === squareName) && (
        <Indicator
          type={chosenSquare.moves.find((m) => m.to === squareName)?.flags.includes('c') ? 'capture' : 'move'}
        />
      )}
      {chosenSquare.square && isOver && canDrop && (
        <div className='absolute inset-0 bg-green-300 opacity-50 pointer-events-none' />
      )}
    </div>
  );
}

interface IndicatorProps {
  type: 'capture' | 'move';
}

function Indicator({ type }: IndicatorProps) {
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
      return null;
  }
}
