import styled from "styled-components";
import React from "react";

// ModalWrapper는 ModalLayout의 기능을 동일하게 하되, 이름을 변경
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Background>
      <BackgroundContent>{children}</BackgroundContent>
    </Background>
  );
};

// Container를 Background로 이름 변경, 스타일은 유지
const Background = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); // 배경색을 약간 투명하게 변경
`;

// Modal을 Dialog로 이름 변경, 스타일은 유지하되 살짝 조정
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
