import Image from "next/image";
import styles from "./player_state_block.module.css";

const PlayerStateBlock = ({ altValue, srcString, player, score }) => {
  return (
    <div className={styles.playerInfo}>
    <Image
      alt={altValue}
      src={srcString}
      width={100}
      height={100}
      priority={true}
      style={{ alignSelf: "center", marginBottom: "16px" }}
    />
    <p className={styles.name}>{player}</p>
    <p className={styles.score}>{`Score : ${score}`}</p>
  </div>
  );
};

export default PlayerStateBlock;
