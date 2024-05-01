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
    // 카드 초기화 전에 모든 카드를 뒤집는 애니메이션 시작
    setCards((currentCards) =>
      currentCards.map((card) => ({
        ...card,
        flipped: false, // 카드를 뒤집습니다.
        unflipping: true, // 카드를 뒤집는 애니메이션이 필요하다면 true로 설정
      }))
    );
    // 여기서 약간의 지연을 추가할 수 있습니다 - 애니메이션이 완료될 시간을 줍니다.
    setTimeout(() => {
      setCards(initializeCards(level)); // 이제 카드를 실제로 초기화합니다.
      setScore(0);
    }, 600); // 여기서 600ms는 애니메이션 시간과 일치해야 합니다.
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
