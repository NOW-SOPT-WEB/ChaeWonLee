import useInput from "../hooks/useInput";
import InputField from "./InputField";
import Button from "./Button";
import { loginUser } from "../apis/loginUser";
import { useNavigate } from "react-router-dom";

const idValidator = (value: string) => {
  if (value === "") return { isValid: false, message: "id를 입력하세요" };
  return { isValid: true, message: "" };
};

const pwdValidator = (value: string) => {
  if (value === "") return { isValid: false, message: "비밀번호를 입력하세요" };
  return { isValid: true, message: "" };
};

const LoginForm = () => {
  const navigate = useNavigate();
  const id = useInput("", idValidator);
  const pwd = useInput("", pwdValidator);

  const handleLogin = async () => {
    if (id.isWarn || pwd.isWarn) return;

    const data = { authenticationId: id.value, password: pwd.value };
    const res = await loginUser(data);
    if (res && confirm(res?.data.message)) {
      navigate(`/main/${res.headers.location}`);
    }
  };

  return (
    <>
      <InputField
        labelText="ID"
        type="text"
        value={id.value}
        onChange={id.onChange}
        errorMessage={id.warningMsg}
        hasWarning={id.isWarn}
      />

      <InputField
        labelText="비밀번호"
        type="password"
        value={pwd.value}
        onChange={pwd.onChange}
        errorMessage={pwd.warningMsg}
        hasWarning={pwd.isWarn}
      />
      <Button text="로그인" onClick={handleLogin} />
      <Button text="회원가입" link="/join" />
    </>
  );
};

export default LoginForm;