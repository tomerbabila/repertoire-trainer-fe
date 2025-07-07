import Square from './Square';
import { ACTIONS, useChess } from './ChessProvider';
import { useCallback, useEffect } from 'react';
import Promotion from './Promotion';

const BOARD_SIZE = 8;
const getRanks = () => Array.from({ length: BOARD_SIZE }, (_, i) => 8 - i);
const getFiles = () => Array.from({ length: BOARD_SIZE }, (_, i) => i + 1);

export default function Chessboard() {
  const { dispatch, pendingPromotion } = useChess();

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT, payload: { playerColor: 'w' } });
  }, [dispatch]);

  const ranks = getRanks();
  const files = getFiles();

  const handlePromotion = useCallback(
    (piece: 'b' | 'q' | 'r' | 'n') => {
      if (!pendingPromotion) return;
      dispatch({
        type: ACTIONS.MOVE,
        payload: {
          from: pendingPromotion.from,
          to: pendingPromotion.to,
          promotion: piece,
        },
      });
      dispatch({ type: ACTIONS.PENDING_PROMOTION, payload: null });
    },
    [pendingPromotion, dispatch]
  );

  return (
    <div className='border w-full max-w-[400px] p-2 box-border rounded-md'>
      <div className='grid grid-cols-8 grid-rows-8 w-full h-full aspect-square relative'>
        {ranks.map((rankNum, rankIdx) => {
          return files.map((fileNum, fileIdx) => (
            <Square key={`${rankNum}${fileNum}`} rank={{ rankNum, rankIdx }} file={{ fileNum, fileIdx }} />
          ));
        })}
        {pendingPromotion && <Promotion color={pendingPromotion.color} onSelect={handlePromotion} />}
      </div>
    </div>
  );
}
