import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./components/Button";
import Header from "./components/Header";
import Card from "./components/Card";
import Modal from "./components/Modal.jsx";
import { useGameState } from "./hooks/useGameState";
import { useCardFlip } from "./hooks/useCardFlip";

const App = () => {
  const initMaxScore = 5; // easy 레벨로 시작
  const {
    score,
    maxScore,
    cards,
    setCards,
    showModal,
    setLevelAndReset,
    flippedCards,
    setFlippedCards,
    setScore,
    setShowModal,
  } = useGameState(initMaxScore);
  const { flipCard, checkCardsMatch } = useCardFlip({
    cards,
    setCards,
    flippedCards,
    setFlippedCards,
    score,
    setScore,
    showModal,
    setShowModal,
    maxScore,
  });

  // 현재 선택된 레벨 상태 추가
  const [selectedLevel, setSelectedLevel] = useState(initMaxScore);

  useEffect(() => {
    checkCardsMatch();
  }, [checkCardsMatch, flippedCards]);

  // 레벨 버튼 클릭 이벤트 핸들러 수정
  const handleLevelChange = (level) => {
    setLevelAndReset(level);
    setSelectedLevel(level); // 현재 선택된 레벨 상태를 설정
  };

  return (
    <AppWrapper>
      <Header
        score={score}
        maxScore={maxScore}
        onReset={() => setLevelAndReset(maxScore)}
      />
      <LevelButtonsContainer>
        {["5", "7", "9"].map((level) => (
          <Button
            key={level}
            onClick={() => handleLevelChange(Number(level))}
            variant="level"
            text={`${
              level === "5" ? "Easy" : level === "7" ? "Normal" : "Hard"
            }`}
            isSelected={selectedLevel === Number(level)} // 현재 선택된 레벨과 비교
          />
        ))}
      </LevelButtonsContainer>
      <CardContainer>
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={() => flipCard(card.id)} />
        ))}
      </CardContainer>
      {showModal && <Modal onClose={() => setLevelAndReset(maxScore)} />}
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
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
