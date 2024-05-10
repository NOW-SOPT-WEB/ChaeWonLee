import styled from "styled-components";

type InputProps = {
  labelText: string;
  type: string;
  value: string;
  errorMessage?: string;
  hasWarning?: boolean;
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  inputRef?: React.MutableRefObject<HTMLInputElement> | React.MutableRefObject<null>;
};

const InputField = ({
  labelText,
  type,
  value,
  errorMessage,
  hasWarning = false,
  onValueChange,
  maxLength,
  inputRef,
}: InputProps) => {
  return (
    <FieldWrapper>
      <Label>{labelText}</Label>
      <FieldContainer>
        <StyledInput type={type} value={value} onChange={onValueChange} maxLength={maxLength} ref={inputRef} />
        {errorMessage && hasWarning && <WarningMessage>{errorMessage}</WarningMessage>}
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
  width: 6.5rem;
  text-align: right;
  font-size: 1rem;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 1.4rem;
  border-radius: 3rem;
  border: solid 1px black;
`;

const WarningMessage = styled.p`
  padding: 0.2rem;
  color: red;
  font-size: 0.8rem;
  word-break: keep-all;
`;

export default InputField;
