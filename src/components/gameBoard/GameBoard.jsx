import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGameBoard,
  makeMove,
  selectWinningCombination,
} from "../../store/slices/gameSlice";
import { GameContext } from "../../App";
import styles from "./styles.module.css";

const GameBoard = ({ isLocked }) => {
  const { switchPlayer } = useContext(GameContext);
  const board = useSelector(selectGameBoard);
  const winningCombination = useSelector(selectWinningCombination);
  const dispatch = useDispatch();
  const [showLines, setShowLines] = useState(false);

  const handleCellClick = (row, col) => {
    if (!isLocked && !winningCombination.winner) {
      dispatch(makeMove({ row, col }));
      switchPlayer();
    }
  };

  useEffect(() => {
    if (winningCombination && winningCombination.line) {
      setShowLines(true);
      setTimeout(() => {
        setShowLines(false);
      }, 2000);
    }
  }, [winningCombination]);

  const lineOrientation = () => {
    if (!winningCombination || !winningCombination.line) return "";

    const lineStr = winningCombination.line.toString();

    const verticalPlusLines = ["0,1,2", "3,4,5", "6,7,8"];
    const diagonalLine = "0,4,8";
    const diagonalRevLine = "2,4,6";

    if (verticalPlusLines.includes(lineStr)) return "vertical-plus";
    if (lineStr === diagonalLine) return "diagonal";
    if (lineStr === diagonalRevLine) return "diagonal-rev";

    return "";
  };

  return (
    <div className={styles["wrap"]}>
      <div className={styles["game-board"]}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              const isWinningCell =
                winningCombination &&
                winningCombination.line &&
                winningCombination.line.includes(colIndex * 3 + rowIndex);
              return (
                <div
                  key={colIndex}
                  className={`cell ${cell} ${isWinningCell ? "winning" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && <img src={`src/assets/img/${cell}.png`} />}
                  {isWinningCell && (
                    <div
                      className={`win-line ${
                        showLines ? "active" : ""
                      } ${lineOrientation()}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default GameBoard;
