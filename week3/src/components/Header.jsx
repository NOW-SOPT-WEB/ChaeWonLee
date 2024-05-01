import styled from "styled-components";
import Button from "./Button";

const Header = ({ score, maxScore, onReset }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle>카드 맞추기 게임 - 지브리</HeaderTitle>
        <HeaderScore>
          {score} / {maxScore}
        </HeaderScore>
      </HeaderContainer>
      <Button onClick={onReset} variant="reset" text="Reset" />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: 2rem;
  padding-left: 8rem;
  top: 0;

  width: 100%;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.green};
`;

const HeaderScore = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1.2rem;
  color: ${({ theme }) => theme.colors.green};
`;

const HeaderContainer = styled.div`
  width: 100vw;
  height: 10rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
