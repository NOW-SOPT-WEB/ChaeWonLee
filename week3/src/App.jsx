import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import styled from "styled-components";

const App = () => {
  const [score, setScore] = useState(0); // 현재 점수 상태
  const [maxScore, setMaxScore] = useState(5); // 최대 점수 상태, 초기값은 easy 레벨에 해당하는 5로 설정

  // 레벨에 따라 maxScore 상태를 업데이트하는 함수들
  const setEasyLevel = () => setMaxScore(5);
  const setNormalLevel = () => setMaxScore(7);
  const setHardLevel = () => setMaxScore(9);

  // 게임 리셋 함수
  const resetGame = () => setScore(0);

  return (
    <AppWrapper>
      <Header score={score} maxScore={maxScore} onReset={resetGame} />
      <LevelButtonsContainer>
        <Button onClick={setEasyLevel} variant="level" text="Easy" />
        <Button onClick={setNormalLevel} variant="level" text="Normal" />
        <Button onClick={setHardLevel} variant="level" text="Hard" />
      </LevelButtonsContainer>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.light_green};
`;

const LevelButtonsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 11rem;
`;
