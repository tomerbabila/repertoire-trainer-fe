import { DndProvider } from 'react-dnd';
import { ChessProvider } from './ChessProvider';
import Chessboard from './Chessboard';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Chess() {
  return (
    <ChessProvider>
      <DndProvider backend={HTML5Backend}>
        <Chessboard />
      </DndProvider>
    </ChessProvider>
  );
}
