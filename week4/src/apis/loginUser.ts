import axiosInstance from "./axiosInstance";
import axios from "axios";

// 타입 정의
interface ILoginDetails {
  authenticationId: string;
  password: string;
}

export const loginUser = async (loginDetails: ILoginDetails) => {
  try {
    const response = await axiosInstance.post("/member/login", loginDetails);
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    } else {
      console.error(error, "알 수 없는 에러 - 로그인 실패");
    }
    return false;
  }
};
