"use client";
import Image from "next/image";
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
  // const shuffledArray = data.cards
  //   .map((a) => ({ sort: Math.random(), value: a }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map((a) => a.value);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [player, togglePlayer] = useState(PLAYER.ONE);
  const [gameState, updateGameState] = useState(data.cards);
  const [flippedCount, updateFlippedCount] = useState(0);
  const [scores, updateScores] = useState({
    [PLAYER.ONE]: 0,
    [PLAYER.TWO]: 0,
  });

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
    }else if(totalScore > 0){
      alert("Match")
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

      if (checkIfWinner) {
        updateScores({
          ...scores,
          [player]: scores[player] + 1,
        });

        updatedData = updatedData.map((x) =>
          x.flipped ? { ...x, flipped: false, hide: true } : x
        );
      }
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
        <div className={styles.viewContainer}>
          <div className={styles.playerInfoContainer}>
            <div className={styles.playerInfo}>
              <Image
                alt={`balloon`}
                src={`/space_balloon.svg`}
                width={100}
                height={100}
                priority={true}
                style={{ alignSelf: "center", marginBottom: "16px" }}
              />
              <p>{searchParams?.get("playerOne") || ""}</p>
              <p>{`Score : ${scores[PLAYER.ONE]}`}</p>
            </div>
            {
              player == PLAYER.ONE && <h1>Your Turn</h1>
            }
          </div>
          <div className={styles.cardContainer}>
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
          <div className={styles.playerInfoContainer}>
            <div className={styles.playerInfo}>
              <Image
                alt={`rocket`}
                src={`/space_rocket.svg`}
                width={100}
                height={100}
                priority={true}
                style={{ alignSelf: "center", marginBottom: "16px" }}
              />
              <p>{searchParams?.get("playerTwo") || ""}</p>
              <p>{`Score : ${scores[PLAYER.TWO]}`}</p>
            </div>
            {
              player == PLAYER.TWO && <h1>Your Turn</h1>
            }
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default GamePortal;
