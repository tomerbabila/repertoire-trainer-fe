import { getChar } from '@/helpers';

export default function Chessboard() {
  const ranks = Array(8)
    .fill(null)
    .map((_, i) => 8 - i);
  const files = Array(8)
    .fill(null)
    .map((_, i) => i + 1);

  const getSquareColor = (isDark: boolean) => (isDark ? 'bg-[var(--dark-square)]' : 'bg-[var(--light-square)]');

  return (
    <div className='border w-full max-w-[400px] p-2 box-border'>
      <div className='grid grid-cols-8 grid-rows-8 w-full h-full aspect-square'>
        {ranks.map((rank, i) =>
          files.map((file, j) => {
            const isDark = (i + j) % 2 === 1;
            const isFirstFile = i === 7;
            const isFirstRank = j === 0;

            return (
              <div
                key={`${rank}${file}`}
                className={`relative flex items-center justify-center text-xs ${getSquareColor(isDark)}`}
              >
                {isFirstRank && <span className='absolute top-0 left-0 text-[10px] text-gray-700 m-1'>{rank}</span>}

                {isFirstFile && (
                  <span className='absolute bottom-0 right-0 text-[10px] text-gray-700 m-1'>{getChar(file)}</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
