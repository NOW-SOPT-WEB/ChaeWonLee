import axiosInstance from "./axiosInstance";
import axios from "axios";

interface JoinType {
  authenticationId: string;
  password: string;
  nickname: string;
  phone: string;
}

export const joinUser = async (joinDetails: JoinType) => {
  try {
    const response = await axiosInstance.post("/member/join", joinDetails);
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    } else {
      console.error(error, "알 수 없는 에러 - 회원가입 실패");
    }
    return false;
  }
};
