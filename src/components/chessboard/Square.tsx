import { getChar } from '@/helpers';

interface ISquare {
  rank: { r: number; i: number };
  file: { f: number; j: number };
  children?: React.ReactNode;
}

export default function Square({ file, rank, children }: ISquare) {
  const { r, i } = rank;
  const { f, j } = file;
  const isDark = (i + j) % 2 === 1;
  const isFirstFile = i === 7;
  const isFirstRank = j === 0;

  const getSquareColor = (isDark: boolean) => (isDark ? 'bg-[var(--dark-square)]' : 'bg-[var(--light-square)]');

  return (
    <div key={`${r}${f}`} className={`relative flex items-center justify-center text-xs ${getSquareColor(isDark)}`}>
      {isFirstRank && <span className='absolute top-0 left-0 text-[10px] text-gray-700 m-1'>{r}</span>}
      {isFirstFile && <span className='absolute bottom-0 right-0 text-[10px] text-gray-700 m-1'>{getChar(f)}</span>}
      {children}
    </div>
  );
}
