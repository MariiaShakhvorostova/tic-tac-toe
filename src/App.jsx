import React, { useState, useEffect } from "react";
import PlayerSide from "./components/playerSide/PlayerSide";
import GameBoard from "./components/gameBoard/GameBoard";
import Button from "./components/button/Button/";
import "./App.css";
import {
  selectGameStatusPlayerX,
  selectGameStatusPlayerO,
  selectPlayerXScore,
  selectPlayerOScore,
  resetGame,
  newGame,
  selectIsDraw,
} from "./store/slices/gameSlice";
import { useSelector, useDispatch } from "react-redux";

export const GameContext = React.createContext({
  currentPlayer: "X",
  switchPlayer: () => {},
});

const App = () => {
  const dispatch = useDispatch();
  const playerXScore = useSelector(selectPlayerXScore);
  const playerOScore = useSelector(selectPlayerOScore);
  const statusX = useSelector(selectGameStatusPlayerX);
  const status0 = useSelector(selectGameStatusPlayerO);
  const isDraw = useSelector(selectIsDraw);

  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isPlayerXBoardLocked, setIsPlayerXBoardLocked] = useState(false);
  const [isPlayer0BoardLocked, setIsPlayer0BoardLocked] = useState(true);

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
    setIsPlayerXBoardLocked(!isPlayerXBoardLocked);
    setIsPlayer0BoardLocked(!isPlayer0BoardLocked);
  };

  useEffect(() => {
    if (playerXScore !== 0 || playerOScore !== 0) {
      setTimeout(() => {
        dispatch(newGame());
      }, 6000);
    }
  }, [playerXScore, playerOScore]);

  useEffect(() => {
    if (isDraw) {
      setTimeout(() => {
        dispatch(newGame());
      }, 6000);
    }
  }, [isDraw, dispatch]);

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        switchPlayer,
        statusX,
        status0,
      }}
    >
      <div className="main">
        <Button resetGameStatus={() => dispatch(resetGame())}>Reset</Button>
        <div className="app">
          <div className="Pl1">
            <p
              className={`status ${status0.includes("win") ? "green" : ""}`}
              style={{ color: status0.includes("lost") ? "red" : "" }}
            >
              {status0}
            </p>

            <GameBoard isLocked={isPlayer0BoardLocked} />
            <PlayerSide
              className="player-o-side"
              sender="pl2"
              imgClassName="player-o-img"
            />
          </div>
          <div className="vert-line"></div>
          <div className="Pl2">
            <p
              className={`status ${statusX.includes("lost") ? "red" : ""}`}
              style={{ color: statusX.includes("win") ? "green" : "" }}
            >
              {statusX}
            </p>

            <GameBoard isLocked={isPlayerXBoardLocked} />
            <PlayerSide
              className="player-x-side"
              sender="pl1"
              imgClassName="player-x-img"
            />
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default App;
