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
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.sky};
`;

const BackgroundContent = styled.div`
  padding: 4rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3rem;
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Container;
