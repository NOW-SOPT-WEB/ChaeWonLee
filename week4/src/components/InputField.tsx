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
  gap: 1rem;
`;

const FieldContainer = styled.div`
  width: 14rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
  }

  ${(props) =>
    props.isError &&
    css`
      border-color: #dc3545; 
      &:focus {
        border-color: #dc3545;
      }
    `}
`;

const WarningMessage = styled.span`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const InfoMessage = styled.span`
  color: #17a2b8;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export default InputField;
