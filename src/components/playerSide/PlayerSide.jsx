import Chat from "../chat/Chat";
import styles from "./styles.module.css";

const PlayerSide = ({ className, sender, imgClassName }) => {
  return (
    <div className={styles[{ className }]}>
      <div className={styles["img-cont"]}>
        <div className={styles[{ imgClassName }]}></div>
      </div>
      <Chat sender={sender} />
    </div>
  );
};

export default PlayerSide;
