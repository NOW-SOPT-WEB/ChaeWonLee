import axiosInstance from "./axiosInstance"; // Axios 인스턴스
import axios from "axios";

export const memberInfo = async (memberId: string) => {
  try {
    const res = await axiosInstance.get("/member/info", {
      headers: {
        memberId: memberId,
      },
    });
    return res.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data.message);
    } else {
      console.error(error, "알 수 없는 에러 - 정보 불러오기 실패");
    }
    return false;
  }
};
