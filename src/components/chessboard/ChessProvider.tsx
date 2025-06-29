import { createContext, useReducer, useContext, useMemo } from 'react';
import { Chess, Move, type Square } from 'chess.js';

interface State {
  chess: Chess;
  fen: string;
  moveIndex: number;
  playerColor: 'w' | 'b';
  chosenSquare: { square: Square | null; moves: Move[] };
}

export const enum ACTIONS {
  INIT = 'init',
  MOVE = 'move',
  RESET = 'reset',
  CHOOSE_SQUARE = 'choose_square',
}

type Action =
  | { type: ACTIONS.INIT; payload: { playerColor: 'w' | 'b' } }
  | { type: ACTIONS.MOVE; payload: { from: string; to: string } }
  | { type: ACTIONS.RESET }
  | { type: ACTIONS.CHOOSE_SQUARE; payload: { chosenSquare: Square } };

function getInitialState(): State {
  const chess = new Chess();
  return {
    chess: new Chess(),
    fen: chess.fen(),
    moveIndex: 0,
    playerColor: 'w',
    chosenSquare: { square: null, moves: [] },
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.INIT: {
      const { playerColor } = action.payload;

      return {
        ...getInitialState(),
        playerColor: playerColor,
      };
    }

    case ACTIONS.MOVE: {
      const newChess = cloneChessInstance(state.chess);
      const { from, to } = action.payload;
      const move = newChess.move({ from, to });

      if (!move) return state;

      return {
        ...state,
        chess: newChess,
        fen: newChess.fen(),
        moveIndex: state.moveIndex + 1,
        chosenSquare: { square: null, moves: [] },
      };
    }

    case ACTIONS.RESET: {
      return getInitialState();
    }

    case ACTIONS.CHOOSE_SQUARE: {
      const newChess = cloneChessInstance(state.chess);
      const { chosenSquare } = action.payload;
      const chosenSquareData = newChess.get(chosenSquare);

      if (newChess.turn() !== chosenSquareData?.color) return state;

      const moves = newChess.moves({ square: chosenSquare, verbose: true });

      if (!moves.length) return { ...state, chosenSquare: { square: null, moves: [] } };

      return { ...state, chess: newChess, chosenSquare: { square: chosenSquare, moves: moves } };
    }

    default:
      return state;
  }
}

function cloneChessInstance(original: Chess): Chess {
  const clone = new Chess();
  clone.loadPgn(original.pgn()); // restores board, history, turns, etc.
  return clone;
}

const ChessContext = createContext<
  | (State & {
      dispatch: React.Dispatch<Action>;
    })
  | undefined
>(undefined);

export function ChessProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>;
}

export function useChess() {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error('useChess must be used inside ChessProvider');
  }
  return context;
}
