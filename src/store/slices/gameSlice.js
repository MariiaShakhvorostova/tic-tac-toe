import { createSlice } from "@reduxjs/toolkit";

export const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      board[a % 3][Math.floor(a / 3)] !== "" &&
      board[a % 3][Math.floor(a / 3)] === board[b % 3][Math.floor(b / 3)] &&
      board[a % 3][Math.floor(a / 3)] === board[c % 3][Math.floor(c / 3)]
    ) {
      return { winner: board[a % 3][Math.floor(a / 3)], line: lines[i] };
    }
  }

  return { winner: null, line: null };
};

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentPlayer: "X",
    gameBoard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    playerXScore: 0,
    playerOScore: 0,
    gameStatusPlayerX: "Game started! Your turn:",
    gameStatusPlayerO: "Game started! Wait your opponent.",
    isDraw: false,
    winningCombination: { winner: null, line: null },
  },
  reducers: {
    makeMove: (state, action) => {
      const { row, col } = action.payload;
      if (!state.gameBoard[row][col]) {
        state.gameBoard[row][col] = state.currentPlayer;
        const gameBoardArray = state.gameBoard.map((row) => [...row]);
        const { winner, line } = calculateWinner(gameBoardArray);
        const isWinner = winner !== null;
        const isDraw =
          !isWinner &&
          gameBoardArray.every((row) => row.every((cell) => cell !== ""));

        if (isWinner) {
          handleWin(state, winner, line);
        } else if (isDraw) {
          handleDraw(state);
        } else {
          handlePlayerSwitch(state);
        }
      }
    },
    resetGame: (state) => {
      state.playerXScore = 0;
      state.playerOScore = 0;
      resetGameState(state);
    },
    newGame: (state) => resetGameState(state),
  },
});

const handleWin = (state, winner, line) => {
  if (winner === "X") {
    state.playerXScore++;
    state.gameStatusPlayerX = "You win!";
    state.gameStatusPlayerO = "You lost!";
  } else {
    state.playerOScore++;
    state.gameStatusPlayerO = "You win!";
    state.gameStatusPlayerX = "You lost!";
  }
  state.winningCombination = { winner, line };
};

const handleDraw = (state) => {
  {
    state.isDraw = true;
    state.gameStatusPlayerX = "Draw!";
    state.gameStatusPlayerO = "Draw!";
    state.gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }
};

const handlePlayerSwitch = (state) => {
  state.currentPlayer = state.currentPlayer === "X" ? "0" : "X";
  state.gameStatusPlayerX =
    state.currentPlayer === "X" ? "Your turn:" : "Wait your opponent.";
  state.gameStatusPlayerO =
    state.currentPlayer === "0" ? "Your turn:" : "Wait your opponent.";
  state.opponentBoardLocked = false;
};

const resetGameState = (state) => {
  state.gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  state.currentPlayer = "X";
  state.gameStatusPlayerX = "Game started! Your turn:";
  state.gameStatusPlayerO = "Game started! Wait your opponent.";
  state.isDraw = false;
  state.winningCombination = { winner: null, line: null };
};

export const { makeMove, resetGame, newGame } = gameSlice.actions;

export const selectGameBoard = (state) => state.game.gameBoard;
export const selectPlayerXScore = (state) => state.game.playerXScore;
export const selectPlayerOScore = (state) => state.game.playerOScore;
export const selectCurrentPlayer = (state) => state.game.currentPlayer;
export const selectGameStatusPlayerX = (state) => state.game.gameStatusPlayerX;
export const selectGameStatusPlayerO = (state) => state.game.gameStatusPlayerO;
export const selectIsDraw = (state) => state.game.isDraw;
export const selectWinningCombination = (state) =>
  state.game.winningCombination;

export default gameSlice.reducer;
