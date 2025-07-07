import React from 'react';
import { pieceMap } from '@/assets';

interface PromotionProps {
  color: 'w' | 'b';
  onSelect: (piece: 'q' | 'r' | 'b' | 'n') => void;
  style?: React.CSSProperties;
}

export default function Promotion({ color, onSelect }: PromotionProps) {
  return (
    <div className='absolute z-50 bg-[var(--promotion-bg)] border flex flex-row p-2 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
      {(['q', 'r', 'b', 'n'] as const).map((piece) => (
        <button
          key={piece}
          className='hover:bg-[var(--promotion-hover)] p-1 flex items-center justify-center'
          onClick={() => onSelect(piece)}
        >
          <img src={pieceMap[color + piece]} alt={piece} className='w-8 h-8' />
        </button>
      ))}
    </div>
  );
}
