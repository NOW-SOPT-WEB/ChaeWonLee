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
    setShowModal(false);
    setMaxScore(level);

    setCards((currentCards) =>
      currentCards.map((card) => ({
        ...card,
        flipped: false, // 카드를 뒤집기
        unflipping: true, // 카드를 뒤집는 애니메이션
      }))
    );

    setTimeout(() => {
      setCards(initializeCards(level));
      setScore(0);
    }, 600);
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
