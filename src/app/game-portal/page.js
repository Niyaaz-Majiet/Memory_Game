"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Card from "../../components/card/card";

import data from "../../../public/game_data.json";
import styles from "./game_portal.module.css";
import RootLayout from "../layout";

const PLAYER = {
  ONE: "PLAYER_ONE",
  TWO: "PLAYER_TWO",
};

const GamePortal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [player, togglePlayer] = useState(PLAYER.ONE);
  const [gameState, updateGameState] = useState(data.cards);
  const [flippedCount, updateFlippedCount] = useState(0);
  const [scores, updateScores] = useState({
    [PLAYER.ONE]: 0,
    [PLAYER.TWO]: 0,
  });

  const { playerOne, playerTwo } = router.state || {};

  useEffect(() => {
    checkIfUserCanPlay();
  }, []);

  useEffect(() => {
    resetFlippedCards();
  }, [flippedCount]);

  useEffect(() => {
    const totalScore = scores[PLAYER.ONE] + scores[PLAYER.TWO];
    if (totalScore == 27) {
      onGameComplete();
    }
  }, [scores]);

  const checkIfUserCanPlay = () => {
    const playerOne = searchParams?.get("playerOne") || "";
    const playerTwo = searchParams?.get("playerTwo") || "";

    if (playerOne.trim() == "" && playerTwo.trim() == "") {
      alert("Select Players Before You Can Start A Game");
      router.push("/");
    }
  };

  const onGameComplete = () => {
    router.push(
      `/game-complete?playerOneScore=${scores[PLAYER.ONE]}&playerTwoScore=${
        scores[PLAYER.TWO]
      }&playerOne=${playerOne}&playerTwo=${playerTwo}`
    );
  };

  const checkIfPlayerWonPair = () => {
    let flipped = gameState.filter((card) => card.flipped);

    if (flipped.length > 1) {
      if (flipped[0].rank == flipped[1].rank) {
        let types = [flipped[0].type, flipped[1].type];

        switch (
          (types.includes("clovers") && types.includes("spades")) ||
          (types.includes("diamonds") && types.includes("hearts"))
        ) {
          case true:
            return true;
          default:
            return false;
        }
      } else if (flipped[0].type === "jokers" && flipped[1].type === "jokers") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const resetFlippedCards = () => {
    if (flippedCount == 2) {
      setTimeout(() => {
        togglePlayer(player == PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE);
        updateFlippedCount(0);
        updateGameState(
          gameState.map((x) => (!x.hide ? { ...x, flipped: false } : x))
        );
      }, 1000);
    }
  };

  const validateAndUpdateGameState = (index) => {
    let updatedData;

    updatedData = gameState;
    updatedData[index].flipped = true;

    let numFlipped = flippedCount + 1;
    updateFlippedCount(numFlipped);
    if (numFlipped == 2) {
      let checkIfWinner = checkIfPlayerWonPair();
      //updateFlippedCount(numFlipped);

      if (checkIfWinner) {
        updateScores({
          ...scores,
          [player]: scores[player] + 1,
        });

        updatedData = updatedData.map((x) =>
          x.flipped ? { ...x, flipped: false, hide: true } : x
        );
      }
    } else {
      //updateFlippedCount(numFlipped);
    }

    return updatedData;
  };

  const updateGameStateData = (index) => {
    if (!gameState[index].flipped && flippedCount !== 2) {
      let updatedState = validateAndUpdateGameState(index);
      updateGameState([...updatedState]);
    }
  };

  return (
    <>
      <RootLayout>
        <div>Game Page</div>
        <div>
          {PLAYER.ONE} : SCORE - {scores[PLAYER.ONE]}
        </div>
        <div>
          {PLAYER.TWO} : SCORE - {scores[PLAYER.TWO]}
        </div>
        <div>PLAYER : {player}</div>
        <div className={styles.container}>
          {gameState.map((card, index) => {
            return (
              <Card
                key={index}
                flipped={card.flipped}
                hide={card.hide}
                type={card.type}
                rank={card.rank}
                toggleCardState={() => updateGameStateData(index)}
              />
            );
          })}
        </div>
      </RootLayout>
    </>
  );
};

export default GamePortal;
