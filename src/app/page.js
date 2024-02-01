"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import InputBox from "@/components/inputBox/inputBox";
import DisplayButton from "@/components/button/displayButton";

const Home = () => {
  const router = useRouter();
  const [players, updatePlayers] = useState({
    p_one: "",
    p_two: "",
  });

  const onPlayerChange = (e) => {
    updatePlayers({
      ...players,
      [e.target.name]: e.target.value,
    });
  };

  const startGame = () => {
    if (players.p_one.trim() !== "" && players.p_two.trim() !== "") {
      router.push(
        `/game-portal?playerOne=${players.p_one}&playerTwo=${players.p_two}`
      );
    } else {
      alert("Please Enter Both Players Names.");
    }
  };

  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.header}>Memory</h1>
        <div className={styles.container}>
          <p className={styles.subHeader}>Are you ready to play?</p>
          <div className={styles.row}>
            <div className={styles.inputContainer}>
              <Image
                alt={`balloon`}
                src={`/space_balloon.svg`}
                width={100}
                height={100}
                priority={true}
                style={{ alignSelf: "center", marginBottom: "16px" }}
              />
              <InputBox
                id="p_one"
                name="p_one"
                value={players.p_one}
                placeHolder="Name of Player 1|"
                handleChange={onPlayerChange}
              />
            </div>

            <div className={styles.inputContainer}>
              <Image
                alt={`rocket`}
                src={`/space_rocket.svg`}
                width={100}
                height={100}
                priority={true}
                style={{ alignSelf: "center", marginBottom: "16px" }}
              />
              <InputBox
                id="p_two"
                name="p_two"
                value={players.p_two}
                placeHolder="Name of Player 2|"
                handleChange={onPlayerChange}
              />
            </div>
          </div>
          <DisplayButton text={"Let's Play"} handleClick={() => startGame()} />
        </div>
      </div>
    </>
  );
};

export default Home;
