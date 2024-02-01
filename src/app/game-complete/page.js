"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import Image from "next/image";
import styles from "./game_complete.module.css";
import ScoreBlock from "@/components/scoreBlock/scoreBlock";

const GameComplete = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameData, setGameData] = useState({
    loaded: false,
    results: {
      winner: "",
      score: null,
      secondPlace: "",
      secondPlaceScore: null,
    },
  });

  useEffect(() => {
    const playerOneScore = searchParams?.get("playerOneScore") || null;
    const playerTwoScore = searchParams?.get("playerTwoScore") || null;
    const playerOne = searchParams?.get("playerOne") || "";
    const playerTwo = searchParams?.get("playerTwo") || "";
    //playerTwo=test&playerOne=test2&playerOneScore=12&playerTwoScore=2
    if (
      playerOne.trim() == "" &&
      playerTwo.trim() == "" &&
      playerOneScore == null &&
      playerTwoScore == null
    ) {
      alert("Select Players Before You Can Finish A Game");
      router.push("/");
    } else {
      let results;
      if (Number(playerOneScore) > Number(playerTwoScore)) {
        results = {
          winner: playerOne,
          score: playerOneScore,
          secondPlace: playerTwo,
          secondPlaceScore: playerTwoScore,
        };
      } else if (Number(playerOneScore) == Number(playerTwoScore)) {
        results = {
          winner: `DRAW : ${playerOne} - ${playerTwo}`,
          score: playerOneScore,
          secondPlace: null,
          secondPlaceScore: null,
        };
      } else {
        results = {
          winner: playerTwo,
          score: playerTwoScore,
          secondPlace: playerOne,
          secondPlaceScore: playerOneScore,
        };
      }
      setGameData({
        loaded: true,
        results: results,
      });
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.page}>
          <p className={styles.heading}>Well Done!</p>
          <p className={styles.subHeading}>{gameData.results.winner}</p>
          <Image
            src={"/space_complete.svg"}
            width={250}
            height={250}
            priority={true}
          />

          {gameData.results.winner.includes("DRAW") ? (
            <ScoreBlock
              icon={"balloon"}
              place={"1st Place"}
              player={gameData.results.winner}
              score={gameData.results.score}
            />
          ) : (
            <div>
              <ScoreBlock
                icon={"balloon"}
                place={"1st Place"}
                player={gameData.results.winner}
                score={gameData.results.score}
                winner={true}
              />
              <ScoreBlock
                icon={""}
                place={"2nd Place"}
                player={gameData.results.secondPlace}
                score={gameData.results.secondPlaceScore}
                winner={false}
              />
            </div>
          )}

          <button className={styles.resetBtn} onClick={() => router.push("/")}>
            PLAY AGAIN
          </button>
        </div>
      </Suspense>
    </>
  );
};

export default GameComplete;
