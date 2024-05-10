import styled from "styled-components";
import InputField from "../components/InputField"; // Assumed path
import CommonBtn from "../components/Button"; // Assumed path
import { joinUser } from "../apis/joinUser"; // Assumed path
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput"; // Assumed path
import { validatePassword, validatePhone, formatPhoneNumber } from "../utils/validate"; // Assumed utility functions
import axios from "axios";

const JoinForm = () => {
  const navigate = useNavigate();

  const id = useInput("", (value) => ({
    isValid: value.length > 0,
    message: "ID를 입력하세요",
  }));

  const pwd = useInput("", (value) => ({
    isValid: validatePassword(value),
    message: "비밀번호가 형식에 맞지 않습니다",
  }));

  const nickName = useInput("", (value) => ({
    isValid: value.length > 2,
    message: "닉네임을 입력하세요",
  }));

  const phone = useInput(
    "",
    (value) => ({
      isValid: validatePhone(value),
      message: "전화번호를 입력하세요",
    }),
    formatPhoneNumber,
  );

  const handleJoin = async () => {
    // 각 입력값의 유효성 검사 및 경고 메시지 처리
    if (id.isWarn) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (pwd.isWarn) {
      if (pwd.value.length === 0) {
        alert("비밀번호를 입력해주세요.");
      } else {
        alert("비밀번호가 형식에 맞지 않습니다. 비밀번호를 확인해주세요.");
      }
      return;
    }
    if (nickName.isWarn) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (phone.isWarn) {
      if (phone.value.length === 0) {
        alert("전화번호를 입력해주세요.");
      } else {
        alert("전화번호가 올바르지 않습니다. 전화번호를 확인해주세요.");
      }
      return;
    }

    const data = {
      authenticationId: id.value,
      password: pwd.value,
      nickname: nickName.value,
      phone: phone.value,
    };

    try {
      const res = await joinUser(data);
      if (res && confirm(res.data.message)) navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // error는 이제 AxiosError 타입으로 추론됩니다.
        alert(error.response?.data.message);
      } else {
        // axios 오류가 아닌 경우를 처리
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <InputContainer>
        <InputField
          labelText="ID"
          type="text"
          value={id.value}
          //errorMessage={id.isWarn ? id.warningMsg : undefined}
          hasWarning={id.isWarn}
          onChange={id.onChange}
          isError={id.isWarn && !id.isValid}
        />
        <InputField
          labelText="비밀번호"
          type="password"
          value={pwd.value}
          //errorMessage={pwd.isWarn ? pwd.warningMsg : undefined}
          hasWarning={pwd.isWarn}
          onChange={pwd.onChange}
          isError={pwd.isWarn && !pwd.isValid}
          infoMessage="비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다."
        />
        <InputField
          labelText="닉네임"
          type="text"
          value={nickName.value}
          //errorMessage={nickName.isWarn ? nickName.warningMsg : undefined}
          hasWarning={nickName.isWarn}
          onChange={nickName.onChange}
          isError={nickName.isWarn && !nickName.isValid}
        />
        <InputField
          labelText="전화번호"
          type="text"
          value={phone.value}
          //errorMessage={phone.isWarn ? phone.warningMsg : undefined}
          hasWarning={phone.isWarn}
          onChange={phone.onChange}
          maxLength={13}
          isError={phone.isWarn && !phone.isValid}
          infoMessage="전화번호 형식: 010-1234-5678"
        />
      </InputContainer>
      <BtnWrapper>
        <CommonBtn text="회원가입" onClick={handleJoin} />
        <CommonBtn text="뒤로가기" link="/" />
      </BtnWrapper>
    </>
  );
};

// Styled Components
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 2rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 3rem;
`;

// Export default JoinForm at the end of file
export default JoinForm;