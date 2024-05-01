import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./components/Button";
import Header from "./components/Header";
import Card from "./components/Card";
import cardData from "./constants/cardData.js";

const App = () => {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(5); // 기본 레벨을 'easy'로 설정

  // 레벨 설정 함수
  const setEasyLevel = () => setMaxScore(5);
  const setNormalLevel = () => setMaxScore(7);
  const setHardLevel = () => setMaxScore(9);

  const resetGame = () => setScore(0);

  // 카드 데이터를 두 배로 늘리고 위치를 무작위로 섞습니다.
  const initializeCards = () => {
    // 각 카드를 복제하여 짝을 만듭니다.
    const doubledCards = [...cardData, ...cardData].map((card, index) => ({
      ...card,
      id: index,
      flipped: false,
      flipping: false,
      unflipping: false,
    }));

    // 카드의 위치를 무작위로 섞습니다.
    doubledCards.sort(() => Math.random() - 0.5);

    return doubledCards;
  };

  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);

  // 카드를 뒤집는 함수
  const flipCard = (id) => {
    // 기존에 뒤집히거나 뒤집고 있는 카드, 혹은 다시 뒤집고 있는 카드는 무시합니다.
    const currentCard = cards.find((card) => card.id === id);
    if (currentCard.flipped || currentCard.flipping || currentCard.unflipping)
      return; // 여기를 수정했습니다.

    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, flipped: true, flipping: true } : card
      )
    );
    setFlippedCards([...flippedCards, id]);
  };

  // 매칭 로직: 두 카드를 뒤집었을 때
  useEffect(() => {
    if (flippedCards.length === 2) {
      const firstCardId = flippedCards[0];
      const secondCardId = flippedCards[1];

      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);
      if (firstCard.alt === secondCard.alt) {
        // 점수 업데이트 방식 변경
        setScore((prevScore) => prevScore + 1);
        setFlippedCards([]);
        // 나머지 로직은 유지
      } else {
        // 짝이 맞지 않을 경우 처리 로직 유지
        setTimeout(() => {
          setCards((cards) =>
            cards.map((card) =>
              flippedCards.includes(card.id)
                ? {
                    ...card,
                    flipped: false,
                    flipping: false,
                    unflipping: true, // 여기서 unflipping 상태를 true로 설정
                  }
                : card
            )
          );
          setTimeout(() => {
            setCards((cards) =>
              cards.map((card) =>
                flippedCards.includes(card.id)
                  ? {
                      ...card,
                      unflipping: false, // 애니메이션 후 unflipping 상태를 다시 false로 설정
                    }
                  : card
              )
            );
          }, 600); // unflipAnimation의 지속 시간과 동일
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
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.light_green};
`;

const LevelButtonsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 11rem;
`;

const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  gap: 10px;
`;
