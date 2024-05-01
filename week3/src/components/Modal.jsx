import { useRef, useEffect } from "react";
import styled from "styled-components";

const Modal = ({ onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  // 모달 외부 클릭 이벤트 처리
  const handleOutsideClick = (event) => {
    if (event.target === dialogRef.current) {
      onClose();
      dialogRef.current.close();
    }
  };

  return (
    <ModalWrapper ref={dialogRef} onClick={handleOutsideClick}>
      {/* 모달 컨텐트 대신 제목과 버튼을 여기 직접 포함 */}
      <ModalTitle>🥳축하해요!!!🥳</ModalTitle>
      <ModalButton
        onClick={() => {
          onClose();
          dialogRef.current.close();
        }}
      >
        게임으로 돌아가기
      </ModalButton>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.dialog`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  width: 30rem;
  height: 20rem;
  margin: auto;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3rem; /* 모서리 둥글기 설정 */
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalTitle = styled.h2`
  font-size: 2.3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.green};
`;

const ModalButton = styled.button`
  width: 13rem;
  height: 4rem;
  font-size: 1.3rem;
  margin-top: 2rem; /* 제목과의 간격 */
  color: ${({ theme }) => theme.colors.light_yellow};
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  outline: none;
  border-radius: 1rem;
  cursor: pointer;
`;
