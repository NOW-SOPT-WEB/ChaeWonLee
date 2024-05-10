import { useState } from "react";

const useInput = (
  defaultValue: string,
  validator?: (value: string) => { isValid: boolean; message: string },
  formatter?: (value: string) => string,
) => {
  const [value, setValue] = useState(defaultValue);
  const [isWarn, setIsWarn] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // formatter가 제공되면 입력값에 대해 형식을 적용
    if (formatter) {
      inputValue = formatter(inputValue);
    }

    let validationResult = { isValid: true, message: "" };

    if (validator) {
      validationResult = validator(inputValue);
    }

    setIsWarn(!validationResult.isValid);
    setWarningMsg(validationResult.message);
    setValue(inputValue);
    setIsValid(validationResult.isValid);
  };

  const reset = () => setValue(defaultValue);

  return { value, onChange, reset, isWarn, warningMsg, isValid };
};

export default useInput;
