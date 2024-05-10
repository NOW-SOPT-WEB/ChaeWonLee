// Button.js로 파일명 변경
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Props 타입 정의를 ButtonProps로 변경
type ButtonProps = {
  text: string;
  link?: string;
  onClick?: () => void;
};

// CommonBtn을 NavigationButton으로 컴포넌트 이름 변경
const Button = ({ text, link, onClick }: ButtonProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }

    if (link) {
      navigate(link);
    }
  };

  return (
    <StyledButton type="button" onClick={handleButtonClick}>
      <p>{text}</p>
    </StyledButton>
  );
};

// BtnContainer를 StyledButton으로 변경
const StyledButton = styled.button`
  display: flex;
  width: 7rem;
  height: 2.5rem; // 높이 조정
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 3rem;
`;

export default Button;
