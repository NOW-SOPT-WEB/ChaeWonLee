import axiosInstance from "./axiosInstance"; 
import axios from "axios";

export const userInfo = async (memberId: string) => {
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
