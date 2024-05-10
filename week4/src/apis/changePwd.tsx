// axiosInstance와 axios 모두 import
import axiosInstance from "./axiosInstance";
import axios from "axios";

interface ChangePwdType {
  previousPassword: string;
  newPassword: string;
  newPasswordVerification: string;
}

/** 비밀번호 변경 */
export const changePwd = async (props: ChangePwdType, memberId: string) => {
  try {
    const res = await axiosInstance.patch("/member/password", props, {
      headers: {
        memberId: memberId,
      },
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    } else {
      console.log(error, "unknown error: memberChangePwd");
    }
  }
};
