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
  font-weight: 600;
`;
const LoginImg = styled.img`
  width: 8rem;
  height: 7rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export default Login;
