// InputField.js
import React from "react";
import styled, { css } from "styled-components";

type InputProps = {
  labelText: string;
  type: string;
  value: string;
  errorMessage?: string;
  hasWarning?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  inputRef?: React.MutableRefObject<HTMLInputElement> | React.MutableRefObject<null>;
  isError?: boolean;
  infoMessage?: string;
};

const InputField = ({
  labelText,
  type,
  value,
  errorMessage,
  hasWarning = false,
  onChange,
  maxLength,
  inputRef,
  isError = false,
  infoMessage,
}: InputProps) => {
  return (
    <FieldWrapper>
      <Label>{labelText}</Label>
      <FieldContainer>
        <StyledInput
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          ref={inputRef}
          isError={isError} 
        />
        {errorMessage && hasWarning && <WarningMessage>{errorMessage}</WarningMessage>}
        {infoMessage && <InfoMessage>{infoMessage}</InfoMessage>}
      </FieldContainer>
    </FieldWrapper>
  );
};

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const FieldContainer = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  padding: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.5rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  ${(props) =>
    props.isError &&
    css`
      border-color: ${({ theme }) => theme.colors.red};
      &:focus {
        border-color: ${({ theme }) => theme.colors.red};
      }
    `}
`;

const WarningMessage = styled.span`
  color: ${({ theme }) => theme.colors.red};;
  font-size: 0.7rem;
  margin-top: 0.25rem;
`;

const InfoMessage = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 0.7rem;
  margin-top: 0.4rem;
`;

export default InputField;
