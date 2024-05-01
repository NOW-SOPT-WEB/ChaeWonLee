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

  const initializeCards = (pairsCount) => {
    const shuffledCardData = shuffleArray([...cardData]);
    const selectedCards = shuffledCardData.slice(0, pairsCount);
    let doubledCards = [...selectedCards, ...selectedCards].map(
      (card, index) => ({
        ...card,
        id: index,
        flipped: false,
        flipping: false,
        unflipping: false,
      })
    );

    doubledCards = shuffleArray(doubledCards);

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
    // 현재 두 카드가 이미 선택되었을 경우 (비교 중), 더 이상의 카드 선택을 방지
    if (flippedCards.length === 2) {
      return;
    }

    const currentCard = cards.find((card) => card.id === id);
    // 이미 뒤집히거나, 뒤집히는 중, 다시 뒤집히려고 하는 카드는 선택하지 않도록 함
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
        setTimeout(() => {
          // 카드가 뒤집는 애니메이션을 보여주고 나서 점수 업데이트
          setScore((prevScore) => {
            const updatedScore = prevScore + 1;

            if (updatedScore === maxScore) {
              // 업데이트 된 점수가 최대 점수와 같으면 모달 표시
              setShowModal(true);
            }

            return updatedScore;
          });
          setFlippedCards([]);
        }, 600);
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
  }, [flippedCards, cards, maxScore]);

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
      {showModal && <Modal onClose={resetGame} />}
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
