import Image from "next/image";
import styles from "./score_block.module.css";

const ScoreBlock = ({ icon, player, score, place,winner }) => {
  return (
    <div className={winner ? styles.winnerContainer : styles.container}>
      <div className={styles.item}>
        <Image
          src={icon == "balloon" ? "/space_balloon.svg" : "/space_rocket.svg"}
          width={90}
          height={90}
        />
      </div>
      <div className={styles.item}>
        <p className={styles.text}><b>{place}</b></p>
      </div>
      <div className={styles.item}>
        <p className={styles.text}>{player}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.text}>Score : {score}</p>
      </div>
    </div>
  );
};

export default ScoreBlock;
