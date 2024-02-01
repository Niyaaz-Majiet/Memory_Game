import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./game_complete.module.css";
import RootLayout from "../layout";

const GameComplete = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gameData, setGameData] = useState({
    playerOneScore: null,
    playerTwoScore: null,
    playerOne: "",
    playerTwo: "",
    loaded: false,
  });

  useEffect(() => {
    const playerOneScore = searchParams?.get("playerOneScore") || null;
    const playerTwoScore = searchParams?.get("playerTwoScore") || null;
    const playerOne = searchParams?.get("playerOne") || "";
    const playerTwo = searchParams?.get("playerTwo") || "";

    if (
      playerOne.trim() == "" &&
      playerTwo.trim() == "" &&
      playerOneScore == null &&
      playerTwoScore == null
    ) {
      alert("Select Players Before You Can Finish A Game");
      router.push("/");
    } else {
      setGameData({
        playerOneScore: Number(playerOneScore),
        playerTwoScore: Number(playerTwoScore),
        playerOne,
        playerTwo,
        loaded: true,
      });
    }
  }, []);

  return (
    <>
      <RootLayout>
        <div className={styles.page}>Game Complete Page</div>
      </RootLayout>
    </>
  );
};

export default GameComplete;
