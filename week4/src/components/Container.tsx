// CustomModal.tsx
import styled from "styled-components";

// ModalWrapper는 ModalLayout의 기능을 동일하게 하되, 이름을 변경
const Container: React.FC<{ content: React.ReactNode }> = ({ content }) => {
  return (
    <Background>
      <BackgroundContent>{content}</BackgroundContent>
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
  width: auto; // fit-content 대신 auto를 사용
  height: auto; // fit-content 대신 auto를 사용
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 4rem; // 패딩을 6rem에서 4rem으로 조정
  background-color: white;
  border-radius: 10px; // 퍼센트 대신 px를 사용하여 둥근 모서리 조정
  border: solid 2px black; // 테두리 굵기를 3px에서 2px로 조정
`;

export default Container;
