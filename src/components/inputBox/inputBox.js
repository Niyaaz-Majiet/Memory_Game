import Image from "next/image";
import styles from "./input_box.module.css";

const InputBox = ({ id, name, value, placeHolder, handleChange }) => {
  return (
    <input
      className={styles.input}
      id={id}
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default InputBox;
