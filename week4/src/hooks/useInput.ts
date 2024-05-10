import { useState } from "react";

const useInput = (
  defaultValue: string,
  validator: {
    (value: string): { isValid: boolean; message: string };
    (value: string): { isValid: boolean; message: string };
    (arg0: any): any;
  },
) => {
  const [value, setValue] = useState(defaultValue);
  const [isWarn, setIsWarn] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const onChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    let isValid = true;

    if (validator) {
      const validationResult = validator(value);
      isValid = validationResult.isValid;
      setWarningMsg(validationResult.message);
    }

    setValue(value);
    setIsWarn(!isValid);
  };

  return { value, onChange, isWarn, warningMsg };
};

export default useInput;
