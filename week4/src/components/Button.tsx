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
  justify-content: center;
  align-items: center;

  width: 7rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3rem;

  background-color: ${({ theme }) => theme.colors.blue};

  color: ${({ theme }) => theme.colors.white};
`;

export default Button;
