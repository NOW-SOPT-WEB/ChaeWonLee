import styled from "styled-components";

const Modal = ({ onClose }) => {
  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>🥳축하해요!!!🥳</ModalTitle>
        <ModalButton onClick={onClose}>게임으로 돌아가기</ModalButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.modal_background};
  z-index: 1;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 30rem;
  height: 20rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3rem;
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
  color: ${({ theme }) => theme.colors.light_yellow};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin-top: 2rem;
`;
