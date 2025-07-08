import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState, useRef, useEffect } from 'react';
import { type Chess as ChessType } from 'chess.js';
import { ChessProvider } from '@/components/chessboard/ChessProvider';
import Chessboard, { type ChessboardHandle } from '@/components/chessboard/Chessboard';
import Clock from '@/components/play/Clock';

export default function Play() {
  const [chessInfo, setChessInfo] = useState<ChessType | null>(null);
  const chessRef = useRef<ChessboardHandle | null>(null);

  const [whiteTime, setWhiteTime] = useState(5 * 60);
  const [blackTime, setBlackTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(true);
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
    <div className='flex flex-col items-center w-100 gap-2 py-10'>
      <h1 className='text-2xl font-bold mb-8'>Let's Play Chess!</h1>
      <div className='flex justify-between w-full gap-8 mt-2'>
        <Clock label='White' time={whiteTime} />
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handlePauseResume}>Pause</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Game Paused</DialogTitle>
            <DialogDescription>This game is currently paused. You can resume whenever you're ready.</DialogDescription>
            <DialogClose asChild>
              <Button onClick={handlePauseResume}>Resume</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Clock label='Black' time={blackTime} />
      </div>
      <ChessProvider>
        <Chessboard setChessInfo={setChessInfo} ref={chessRef} />
      </ChessProvider>

      <Dialog open={winner !== null}>
        <DialogContent>
          <DialogTitle>Game end!</DialogTitle>
          <DialogDescription>
            {winner === 'w' && 'White wins!'}
            {winner === 'b' && 'Black wins!'}
            {winner === 'd' && 'Draw!'}
          </DialogDescription>
          <DialogClose asChild>
            <Button onClick={handleNewGame}>New Game</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
