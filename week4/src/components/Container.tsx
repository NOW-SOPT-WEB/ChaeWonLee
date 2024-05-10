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
  background-color: rgba(0, 0, 0, 0.7);
`;

const BackgroundContent = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 4rem;
  background-color: white;
  border-radius: 10px;
  border: solid 2px black;
`;

export default Container;
