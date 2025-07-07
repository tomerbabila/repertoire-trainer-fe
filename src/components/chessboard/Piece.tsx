import { useDrag } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';
import { useChess, ACTIONS } from './ChessProvider';
import { type Square as ChessSquare } from 'chess.js';
import { useEffect, useRef } from 'react';
import { pieceMap } from '@/assets';

interface PieceProps {
  type: string;
  square: string;
}

export default function Piece({ type, square }: PieceProps) {
  const src = pieceMap[type];
  const { chess, chosenSquare, dispatch } = useChess();
  const canDrag = !!type && type[0] === chess.turn();
  const imgRef = useRef<HTMLImageElement>(null);
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'piece',
    item: { type, square },
    canDrag: () => canDrag,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    // Hide default drag preview (square background) and show only the piece
    dragPreview(new Image());
  }, [dragPreview]);

  useEffect(() => {
    if (isDragging && chosenSquare.square !== square) {
      dispatch({ type: ACTIONS.CHOOSE_SQUARE, payload: { chosenSquare: square as ChessSquare } });
    }
  }, [isDragging, chosenSquare.square, square, dispatch]);

  if (!src) return null;

  return (
    <img
      ref={(node) => {
        drag(node);
        imgRef.current = node;
      }}
      src={src}
      alt={type}
      className={`absolute w-full h-full object-contain${isDragging ? ' opacity-50' : ''}`}
      style={{ cursor: canDrag ? 'grab' : 'not-allowed' }}
      draggable={false}
      onPointerDown={(e) => e.stopPropagation()}
    />
  );
}
