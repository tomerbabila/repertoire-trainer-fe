import { getChar } from '@/helpers';
import { ACTIONS, useChess } from './ChessProvider';
import Piece from './Piece';
import { type Square as ChessSquare } from 'chess.js';
import { useDrop } from 'react-dnd';

interface SquareProps {
  rank: { r: number; i: number };
  file: { f: number; j: number };
}

export default function Square({ file, rank }: SquareProps) {
  const { chosenSquare, dispatch, chess } = useChess();
  const { r, i } = rank;
  const { f, j } = file;
  const isDark = (i + j) % 2 === 1;
  const isFirstFile = i === 7;
  const isFirstRank = j === 0;

  // Helper: get piece type at this square
  const getPieceType = () => {
    const board = chess.board();
    const p = board[i][j];
    if (!p) return '';
    return p.color + p.type;
  };

  // Helper: get square name (e.g. 'e4')
  const getSquareName = () => (getChar(f) + r) as ChessSquare;
  const squareName = getSquareName();

  // DnD drop logic
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    drop: (item: { type: string; square: string }) => {
      if (item.square !== squareName) {
        dispatch({ type: ACTIONS.MOVE, payload: { from: item.square, to: squareName } });
      }
    },
    canDrop: () => true,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    // Show indicators on drag start
    hover: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        // Only show indicators for the piece being dragged
        if (getPieceType() && getPieceType()[0] === chess.turn()) {
          if (!chosenSquare.square || chosenSquare.square !== squareName) {
            dispatch({ type: ACTIONS.CHOOSE_SQUARE, payload: { chosenSquare: squareName } });
          }
        }
      }
    },
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

  const getSquareColor = (isDark: boolean) => (isDark ? '--dark-square' : '--light-square');

  return (
    <div
      ref={drop as unknown as React.RefCallback<HTMLDivElement>}
      onClick={handleSquareClick}
      className={`relative flex items-center justify-center text-xs bg-[var(${getSquareColor(isDark)})]`}
    >
      {isFirstRank && <span className={`absolute top-0 left-0 text-(${getSquareColor(!isDark)}) m-1`}>{r}</span>}
      {isFirstFile && (
        <span className={`absolute bottom-0 right-0 text-(${getSquareColor(!isDark)}) m-1`}>{getChar(f)}</span>
      )}
      <Piece type={getPieceType()} square={squareName} />
      {/* Show indicator if this square is a move option from the currently chosen square */}
      {chosenSquare.square && chosenSquare.moves.some((m) => m.to === squareName) && (
        <Indicator
          type={chosenSquare.moves.find((m) => m.to === squareName)?.flags.includes('c') ? 'capture' : 'move'}
        />
      )}
      {isOver && canDrop && <div className='absolute inset-0 bg-green-300 opacity-20 pointer-events-none' />}
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
