import { ChessProvider } from './ChessProvider';
import Chessboard from './Chessboard';

export default function Chess() {
  return (
    <ChessProvider>
      <Chessboard />
    </ChessProvider>
  );
}
