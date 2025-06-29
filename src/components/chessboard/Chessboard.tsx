import Square from './Square';
import { ACTIONS, useChess } from './ChessProvider';
import { useEffect } from 'react';

export default function Chessboard() {
  const { dispatch } = useChess();
  //   TODO: add chess object to context

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT, payload: { playerColor: 'w' } });
  }, []);

  const ranks = Array(8)
    .fill(null)
    .map((_, i) => 8 - i);
  const files = Array(8)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <div className='border w-full max-w-[400px] p-2 box-border rounded-md'>
      <div className='grid grid-cols-8 grid-rows-8 w-full h-full aspect-square'>
        {ranks.map((rank, i) =>
          files.map((file, j) => {
            return <Square key={`${rank}${file}`} rank={{ r: rank, i: i }} file={{ f: file, j: j }} />;
          })
        )}
      </div>
    </div>
  );
}
