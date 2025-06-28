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

const pieceMap: Record<string, string> = {
  P: whiteP,
  R: whiteR,
  N: whiteN,
  B: whiteB,
  Q: whiteQ,
  K: whiteK,
  p: blackP,
  r: blackR,
  n: blackN,
  b: blackB,
  q: blackQ,
  k: blackK,
};

interface IPiece {
  type: string;
}

export default function Piece({ type }: IPiece) {
  const src = pieceMap[type];
  if (!src) return null;

  return <img src={src} alt={type} className='w-full h-full object-contain' />;
}
