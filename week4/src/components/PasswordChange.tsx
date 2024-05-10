import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { styled } from "styled-components";
import InputModule from "../components/InputField";
import CommonBtn from "../components/Button";
import { memberChangePwd } from "../apis/memberChangePwd";

type Props = {
  memberId: string;
};

const PasswordChange = ({ memberId }: Props) => {
  const navigate = useNavigate();
  const [currentPwd, setCurrentPwd] = useInput("");
  const [newPwd, setNewPwd] = useInput("");
  const [confirmNewPwd, setConfirmNewPwd] = useInput("");

  // 비밀번호 변경 로직
  const changePassword = async () => {
    if (!validateInputs()) return;
    const payload = {
      previousPassword: currentPwd,
      newPassword: newPwd,
      confirmPassword: confirmNewPwd,
    };
    const response = await memberChangePwd(payload, memberId);
    if (response) {
      alert(response.data.message);
      navigate("/");
    }
  };

  // 입력값 유효성 검사
  const validateInputs = () => {
    if (!memberId) {
      console.error("Member ID is missing.");
      return false;
    }
    if (!currentPwd || !newPwd || !confirmNewPwd) {
      alert("모든 필드를 채워주세요.");
      return false;
    }
    if (newPwd !== confirmNewPwd) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  return (
    <ChangePwdContainer>
      <InputContainer>
        <InputModule labelTxt={PWDCHANGELABEL.prevPwd} inputType="password" val={currentPwd} onChange={setCurrentPwd} />
        <InputModule labelTxt={PWDCHANGELABEL.newPwd} inputType="password" val={newPwd} onChange={setNewPwd} />
        <InputModule
          labelTxt={PWDCHANGELABEL.checkNewPwd}
          inputType="password"
          val={confirmNewPwd}
          onChange={setConfirmNewPwd}
        />
      </InputContainer>
      <CommonBtn text={BTNTXT.changePwd} onClick={changePassword} />
    </ChangePwdContainer>
  );
};

const ChangePwdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
  gap: 2rem;
`;

export default PasswordChange;
