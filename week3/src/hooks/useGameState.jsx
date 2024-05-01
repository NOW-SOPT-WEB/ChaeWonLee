import { useState, useEffect } from "react";
import { initializeCards } from "../utils/initializeCards.jsx";

export const useGameState = (initialMaxScore) => {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(initialMaxScore);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 레벨 설정 및 게임 초기화
  const setLevelAndReset = (level) => {
    setMaxScore(level);
    setCards(initializeCards(level));
    setScore(0);
    setShowModal(false);
  };

  // maxScore 변화시 카드 초기화
  useEffect(() => {
    setCards(initializeCards(maxScore));
  }, [maxScore]);

  return {
    score,
    setScore,
    maxScore,
    setMaxScore,
    cards,
    setCards,
    flippedCards,
    setFlippedCards,
    showModal,
    setShowModal,
    setLevelAndReset,
  };
};
