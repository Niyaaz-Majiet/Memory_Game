import styles from "./display_button.module.css";

const DisplayButton = ({ text, handleClick,active = true }) => {
  return (
    <button className={active ? styles.btnStart : styles.btnStartInactive} onClick={() => handleClick()}>
      {text}
    </button>
  );
};

export default DisplayButton;
