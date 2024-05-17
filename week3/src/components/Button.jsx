import styled, { css } from "styled-components";

const VARIANTS = {
  reset: css`
    --button-color: ${({ theme }) => theme.colors.white};
    --button-bg-color: ${({ theme }) => theme.colors.blue_green};
    --button-hover-color: ${({ theme }) => theme.colors.blue_green};
    --button-hover-bg-color: ${({ theme }) => theme.colors.white};
  `,
  level: css`
    --button-color: ${({ theme }) => theme.colors.green};
    --button-bg-color: ${({ theme }) => theme.colors.light_yellow};
    --button-hover-color: ${({ theme }) => theme.colors.light_yellow};
    --button-hover-bg-color: ${({ theme }) => theme.colors.green};
  `,
};

const Button = ({ onClick, variant, text, isSelected }) => {
  return (
    <StyledButton onClick={onClick} variant={variant} isSelected={isSelected}>
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  ${({ variant }) => VARIANTS[variant]}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 7rem;
  height: 3.8rem;
  border-radius: 1.2rem;
  border: none;

  font-size: 1.5rem;
  font-style: bold;

  color: var(--button-color);
  background-color: var(--button-bg-color);
  ${({ isSelected }) =>
    isSelected &&
    css`
      color: var(--button-hover-color);
      background-color: var(--button-hover-bg-color);
    `}
  &:hover {
    color: var(--button-hover-color);
    background-color: var(--button-hover-bg-color);
  }
`;
