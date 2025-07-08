import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { type Chess as ChessType } from 'chess.js';
import { ChessProvider } from '@/components/chessboard/ChessProvider';
import Chessboard, { type ChessboardHandle } from '@/components/chessboard/Chessboard';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function Play() {
  const [chessInfo, setChessInfo] = useState<ChessType | null>(null);
  const chessRef = useRef<ChessboardHandle | null>(null);

  const [whiteTime, setWhiteTime] = useState(5 * 60);
  const [blackTime, setBlackTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState<'w' | 'b' | 'd' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer
  useEffect(() => {
    if (!isRunning || winner || !chessInfo) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      if (chessInfo.turn() === 'w') setWhiteTime((t) => Math.max(0, t - 1));
      else setBlackTime((t) => Math.max(0, t - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, winner, chessInfo]);

  // Detect timeout
  useEffect(() => {
    if (whiteTime === 0 && !winner) setWinner('b');
    if (blackTime === 0 && !winner) setWinner('w');
  }, [whiteTime, blackTime, winner]);

  // Detect winner
  useEffect(() => {
    if (chessInfo?.isCheckmate() && !winner) setWinner(chessInfo?.turn());
  }, [chessInfo, winner]);

  // Detect draw/stalemate/insufficient material
  useEffect(() => {
    if (chessInfo?.isDraw() || chessInfo?.isStalemate() || (chessInfo?.isInsufficientMaterial() && !winner)) {
      setWinner('d');
    }
  }, [chessInfo, winner]);

  const handleNewGame = () => {
    setWhiteTime(5 * 60);
    setBlackTime(5 * 60);
    setIsRunning(false);
    setWinner(null);
    setChessInfo(null);
    chessRef.current?.resetGame();
  };

  const handlePauseResume = () => setIsRunning((r) => !r);

  return (
    <>
      <div className='flex flex-col items-center mb-4 gap-2'>
        <div className='flex gap-2'>
          <Button onClick={handleNewGame}>New Game</Button>
          <Button onClick={handlePauseResume}>{isRunning ? 'Pause' : 'Resume'}</Button>
        </div>
        <div className='flex gap-8 mt-2'>
          <div className={`flex flex-col items-center ${chessInfo?.turn() === 'w' ? 'font-bold' : ''}`}>
            <span className='font-semibold'>White</span>
            <span className='text-2xl font-mono'>{formatTime(whiteTime)}</span>
          </div>
          <div className={`flex flex-col items-center ${chessInfo?.turn() === 'b' ? 'font-bold' : ''}`}>
            <span className='font-semibold'>Black</span>
            <span className='text-2xl font-mono'>{formatTime(blackTime)}</span>
          </div>
        </div>
      </div>
      <ChessProvider>
        <Chessboard setChessInfo={setChessInfo} ref={chessRef} />
      </ChessProvider>
      {/* <Chess setChessInfo={setChessInfo} /> */}
      {winner && (
        <div className='fixed inset-0 bg-opacity-60 flex items-center justify-center z-50'>
          <div className='rounded-lg shadow-lg p-8 text-2xl font-bold'>
            {winner === 'w' && 'White wins!'}
            {winner === 'b' && 'Black wins!'}
            {winner === 'd' && 'Draw!'}
          </div>
        </div>
      )}
    </>
  );
}
