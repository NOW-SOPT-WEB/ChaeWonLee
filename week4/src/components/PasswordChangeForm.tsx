import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import InputField from "../components/InputField"; 
import CommonBtn from "../components/Button";
import { changePwd } from "../apis/changePwd";
import { styled } from "styled-components";

type Props = {
  memberId: string;
};

const PasswordChangeForm = ({ memberId }: Props) => {
  const navigate = useNavigate();
  const { value: currentPwd, onChange: setCurrentPwd } = useInput("");
  const { value: newPwd, onChange: setNewPwd } = useInput("");
  const { value: confirmNewPwd, onChange: setConfirmNewPwd } = useInput("");

  const changePassword = async () => {
    if (!validateInputs()) return;
    const payload = {
      previousPassword: currentPwd,
      newPassword: newPwd,
      newPasswordVerification: confirmNewPwd,
    };
    const response = await changePwd(payload, memberId);
    if (response) {
      alert(response.data.message);
      navigate("/");
    }
  };

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
        <InputField labelText="기존 비밀번호" type="password" value={currentPwd} onChange={setCurrentPwd} />
        <InputField labelText="새로운 비밀번호" type="password" value={newPwd} onChange={setNewPwd} />
        <InputField labelText="비밀번호 확인" type="password" value={confirmNewPwd} onChange={setConfirmNewPwd} />
      </InputContainer>
      <CommonBtn text="비밀번호 변경하기" onClick={changePassword} />
    </ChangePwdContainer>
  );
};
export default PasswordChangeForm;

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
