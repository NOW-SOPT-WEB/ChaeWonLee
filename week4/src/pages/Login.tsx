import styled from "styled-components";
import LoginContainer from "../components/Container";
import LoginForm from "../components/LoginForm";
import img from "../assets/img/sky.png";

const Login = () => {
  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginImg src={img} />
      <LoginForm />
    </LoginContainer>
  );
};

const LoginTitle = styled.h1`
  font-size: 2rem;
`;
const LoginImg = styled.img`
  width: 10rem;
  height: 8rem;
  margin-top: 1.5rem;
`;

export default Login;
