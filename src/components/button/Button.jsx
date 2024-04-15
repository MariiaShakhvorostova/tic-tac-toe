import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlayerXScore,
  selectPlayerOScore,
} from "../../store/slices/gameSlice";
import { resetGame } from "../../store/slices/gameSlice";
import styles from "./styles.module.css";

const Button = ({ children, resetGameStatus }) => {
  const playerXScore = useSelector(selectPlayerXScore);
  const playerOScore = useSelector(selectPlayerOScore);
  const dispatch = useDispatch();

  const handleResetGame = () => {
    dispatch(resetGame());
    resetGameStatus();
  };

  return (
    <div className={styles["nav"]}>
      <div className={styles["common-score"]}>
        <p>Player 1</p>
        <div className={styles["score-reset"]}>
          <h3>
            Score: {playerOScore}:{playerXScore}
          </h3>
          <button onClick={handleResetGame}>{children}</button>
        </div>
        <p>Player 2</p>
      </div>
      <div className={styles["line"]}></div>
    </div>
  );
};

export default Button;
