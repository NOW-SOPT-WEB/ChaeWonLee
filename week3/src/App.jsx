import { useEffect } from "react";
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

  useEffect(() => {
    checkCardsMatch();
  }, [checkCardsMatch, flippedCards]);

  return (
    <AppWrapper>
      <Header
        score={score}
        maxScore={maxScore}
        onReset={() => setLevelAndReset(maxScore)}
      />
      <LevelButtonsContainer>
        <Button
          onClick={() => setLevelAndReset(5)}
          variant="level"
          text="Easy"
        />
        <Button
          onClick={() => setLevelAndReset(7)}
          variant="level"
          text="Normal"
        />
        <Button
          onClick={() => setLevelAndReset(9)}
          variant="level"
          text="Hard"
        />
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
