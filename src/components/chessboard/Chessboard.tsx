import Square from './Square';
import { ACTIONS, useChess } from './ChessProvider';
import { useEffect } from 'react';

const BOARD_SIZE = 8;
const getRanks = () => Array.from({ length: BOARD_SIZE }, (_, i) => 8 - i);
const getFiles = () => Array.from({ length: BOARD_SIZE }, (_, i) => i + 1);

export default function Chessboard() {
  const { dispatch } = useChess();

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT, payload: { playerColor: 'w' } });
  }, [dispatch]);

  const ranks = getRanks();
  const files = getFiles();

  return (
    <div className='border w-full max-w-[400px] p-2 box-border rounded-md'>
      <div className='grid grid-cols-8 grid-rows-8 w-full h-full aspect-square'>
        {ranks.map((rankNum, rankIdx) => {
          return files.map((fileNum, fileIdx) => (
            <Square key={`${rankNum}${fileNum}`} rank={{ rankNum, rankIdx }} file={{ fileNum, fileIdx }} />
          ));
        })}
      </div>
    </div>
  );
}
