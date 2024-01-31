import Image from "next/image";
import styles from "./card.module.css";

const Card = ({ flipped, hide, rank, type, toggleCardState }) => {
  if (hide) {
    return <div className={styles.hidden}>Hidden</div>;
  } else {
    return (
      <Image
        alt={`${type}-${rank}`}
        src={flipped ? `/cards/${type}/${rank}.svg` : "/cards/Card_Back.svg"}
        width={72}
        height={100}
        onClick={() => toggleCardState()}
        priority={true}
      />
    );
  }
};

export default Card;
