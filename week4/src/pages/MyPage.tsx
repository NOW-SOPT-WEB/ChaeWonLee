import styled from "styled-components";
import Modal from "../components/Container"; // ModalLayout을 Modal로 변경
import Button from "../components/Button"; // CommonBtn을 Button으로 변경
import PasswordUpdate from "../components/PasswordChangeForm"; // ChangePwd를 PasswordUpdate로 변경
import { useEffect, useState } from "react";
import { userInfo } from "../apis/userInfo"; // memberInfo를 getUserInfo로 변경
import { useParams } from "react-router-dom";
import toggleIcon from "../assets/img/toggle.png"; // toggleIco를 toggleIcon으로 변경

export interface UserType {
  authenticationId: string;
  nickname: string;
  phone: string;
}

const UserProfile = () => {
  // Mypage를 UserProfile로 변경
  const userId = useParams().id; // memberId를 userId로 변경
  const initialUserInfo = {
    // dummyInfo를 initialUserInfo로 변경
    authenticationId: "",
    nickname: "",
    phone: "",
  };
  const [userDetails, setUserDetails] = useState<UserType>(initialUserInfo); // userInfo, setUserInfo를 userDetails, setUserDetails로 변경

  // 비밀번호 변경 토글
  const [isPwdChangeVisible, setIsPwdChangeVisible] = useState(false); // openPwdChange, setOpenPwdChange를 isPwdChangeVisible, setIsPwdChangeVisible로 변경
  const handleTogglePwdChange = () => {
    // toggleOpenPwdChange를 handleTogglePwdChange로 변경
    setIsPwdChangeVisible((prev) => !prev);
  };

  /** 사용자 정보 가져오기 */
  const fetchUserInfo = async () => {
    // getMemberInfo를 fetchUserInfo로 변경
    if (userId) {
      const info = await userInfo(userId);
      setUserDetails(info);
    }
  };

  useEffect(() => {
    if (userDetails === initialUserInfo) fetchUserInfo();
  }, [userDetails, initialUserInfo]);

  return (
    <Modal>
      <Title>마이페이지</Title>
      <DetailsWrapper>
        <Detail>
          <p>ID</p>
          <p>{userDetails.authenticationId}</p>
        </Detail>
        <Detail>
          <p>닉네임</p>
          <p>{userDetails.nickname}</p>
        </Detail>
        <Detail>
          <p>전화번호</p>
          <p>{userDetails.phone}</p>
        </Detail>
      </DetailsWrapper>
      <ToggleBtn onClick={handleTogglePwdChange}>
        <p>비밀번호 변경하기</p>
        <Icon src={toggleIcon} active={isPwdChangeVisible} />
      </ToggleBtn>
      {isPwdChangeVisible && <PasswordUpdate memberId={userId ? userId : ""} />}

      <Button text="홈으로" link={`/mainpage/${userId}`} />
    </Modal>
  );
};

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const Detail = styled.div`
  display: flex;
  width: 20rem;
  justify-content: space-between;
`;
const ToggleBtn = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  margin: 1rem;
  gap: 0.2rem;
  background-color: #eeeeee;
  border-radius: 8px;
`;
const Icon = styled.img<{ active: boolean }>`
  width: 1rem;
  height: 1rem;
  rotate: ${(props) => (props.active ? "0deg" : "180deg")};
`;
export default UserProfile;
