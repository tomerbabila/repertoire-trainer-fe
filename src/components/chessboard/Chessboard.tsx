import Piece from './Piece';
import Square from './Square';

export default function Chessboard() {
  const ranks = Array(8)
    .fill(null)
    .map((_, i) => 8 - i);
  const files = Array(8)
    .fill(null)
    .map((_, i) => i + 1);

  // TODO: replace with context
  const board: (string | null)[][] = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  return (
    <div className='border w-full max-w-[400px] p-2 box-border rounded-md'>
      <div className='grid grid-cols-8 grid-rows-8 w-full h-full aspect-square'>
        {ranks.map((rank, i) =>
          files.map((file, j) => {
            const piece = board[i][j];
            return (
              <Square rank={{ r: rank, i: i }} file={{ f: file, j: j }}>
                {piece && <Piece type={piece} />}
              </Square>
            );
          })
        )}
      </div>
    </div>
  );
}
