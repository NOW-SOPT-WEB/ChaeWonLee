import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  link?: string;
  onClick?: () => void;
};

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

const StyledButton = styled.button`
  display: flex;
  width: 7rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 3rem;
`;

export default Button;