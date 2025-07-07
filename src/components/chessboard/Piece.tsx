// White Pieces
import whiteP from '@/assets/wp.png';
import whiteR from '@/assets/wr.png';
import whiteN from '@/assets/wn.png';
import whiteB from '@/assets/wb.png';
import whiteQ from '@/assets/wq.png';
import whiteK from '@/assets/wk.png';
// Black Pieces
import blackP from '@/assets/bp.png';
import blackR from '@/assets/br.png';
import blackN from '@/assets/bn.png';
import blackB from '@/assets/bb.png';
import blackQ from '@/assets/bq.png';
import blackK from '@/assets/bk.png';
import { useDrag } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';
import { useChess, ACTIONS } from './ChessProvider';
import { type Square as ChessSquare } from 'chess.js';
import { useEffect, useRef } from 'react';

const pieceMap: Record<string, string> = {
  wp: whiteP,
  wr: whiteR,
  wn: whiteN,
  wb: whiteB,
  wq: whiteQ,
  wk: whiteK,
  bp: blackP,
  br: blackR,
  bn: blackN,
  bb: blackB,
  bq: blackQ,
  bk: blackK,
};

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
