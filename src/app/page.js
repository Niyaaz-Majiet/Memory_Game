"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [players, updatePlayers] = useState({
    p_one: "",
    p_two: "",
  });

  function onPlayerChange(e) {
    updatePlayers({
      ...players,
      [e.target.name]: e.target.value,
    });
  }

  function startGame() {
    console.log("Start Game");
    router.push(
      `/game-portal?playerOne=${players.p_one}&playerTwo=${players.p_two}`
    );
  }

  return (
    <>
      <div>Home Page</div>
      <div className={styles.container}>
        <div>
          <label htmlFor="p_one">
            Player 1
            <input
              id="p_one"
              name="p_one"
              value={players.p_one}
              onChange={(e) => onPlayerChange(e)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="p_two">
            Player 2
            <input
              id="p_two"
              name="p_two"
              value={players.p_two}
              onChange={(e) => onPlayerChange(e)}
            />
          </label>
        </div>
      </div>
      <button onClick={() => startGame()}>Start</button>
    </>
  );
}
