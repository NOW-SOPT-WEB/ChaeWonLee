import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./components/Button";
import Header from "./components/Header";
import Card from "./components/Card";
import cardData from "./constants/cardData.js";
import Modal from "./components/Modal.jsx";

const App = () => {
  const [score, setScore] = useState(0);
  let [maxScore, setMaxScore] = useState(5); // 기본 레벨을 'easy'로 설정

  // 카드 데이터를 레벨에 따른 불린 및 위치를 무작위로 섞기
  const initializeCards = (pairsCount) => {
    // 적절한 수의 카드 쌍 선택
    const selectedCards = cardData.slice(0, pairsCount);
    // 각 카드를 복제하여 짝을 만듭니다.
    const doubledCards = [...selectedCards, ...selectedCards].map(
      (card, index) => ({
        ...card,
        id: index,
        flipped: false,
        flipping: false,
        unflipping: false,
      })
    );

    // 카드의 위치를 무작위로 섞습니다.
    doubledCards.sort(() => Math.random() - 0.5);

    return doubledCards;
  };

  const [cards, setCards] = useState(initializeCards(maxScore));
  const [flippedCards, setFlippedCards] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  // 레벨 설정 및 게임 초기화 함수
  const setLevelAndReset = (level) => {
    setMaxScore(level);
    setCards(initializeCards(level));
    setScore(0);
  };

  const setEasyLevel = () => setLevelAndReset(5);
  const setNormalLevel = () => setLevelAndReset(7);
  const setHardLevel = () => setLevelAndReset(9);

  // 게임 리셋
  const resetGame = () => {
    setLevelAndReset(maxScore);
    setShowModal(false); // 모달 숨김
  };

  useEffect(() => {
    if (score === maxScore) {
      setShowModal(true); // 스코어가 최대에 도달하면 모달 표시
    }
  }, [score, maxScore]);

  // 카드를 뒤집는 함수
  const flipCard = (id) => {
    const currentCard = cards.find((card) => card.id === id);
    if (currentCard.flipped || currentCard.flipping || currentCard.unflipping)
      return;

    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, flipped: true, flipping: true } : card
      )
    );
    setFlippedCards([...flippedCards, id]);
  };

  // 매칭 로직
  useEffect(() => {
    if (flippedCards.length === 2) {
      const firstCardId = flippedCards[0];
      const secondCardId = flippedCards[1];

      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard.alt === secondCard.alt) {
        setScore((prevScore) => prevScore + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((cards) =>
            cards.map((card) =>
              flippedCards.includes(card.id)
                ? { ...card, flipped: false, flipping: false, unflipping: true }
                : card
            )
          );
          setTimeout(() => {
            setCards((cards) =>
              cards.map((card) =>
                flippedCards.includes(card.id)
                  ? { ...card, unflipping: false }
                  : card
              )
            );
          }, 600);
          setFlippedCards([]);
        }, 600);
      }
    }
  }, [flippedCards, cards]);

  return (
    <AppWrapper>
      <Header score={score} maxScore={maxScore} onReset={resetGame} />
      <LevelButtonsContainer>
        <Button onClick={setEasyLevel} variant="level" text="Easy" />
        <Button onClick={setNormalLevel} variant="level" text="Normal" />
        <Button onClick={setHardLevel} variant="level" text="Hard" />
      </LevelButtonsContainer>
      <CardContainer>
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={flipCard} />
        ))}
      </CardContainer>
      {showModal && <Modal onClose={resetGame} />} {/* 게임 종료 모달 */}
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.light_green};
`;

const LevelButtonsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 2rem;
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  margin-top: 2rem;
  padding-bottom: 5rem;
`;
