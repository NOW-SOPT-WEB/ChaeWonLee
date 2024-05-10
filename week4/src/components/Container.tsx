import styled from "styled-components";
import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Background>
      <BackgroundContent>{children}</BackgroundContent>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.sky};
`;

const BackgroundContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: auto;
  height: auto;
  padding: 4rem;
  border-radius: 3rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

export default Container;
