import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mainpage/:id" element={<MainPage />} />
        <Route path="/mypage/:id" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
