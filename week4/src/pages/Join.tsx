import styled from "styled-components";
import JoinContainer from "../components/Container";
import JoinForm from "../components/JoinForm";

const Join = () => {
  return (
    <JoinContainer>
      <Title>회원가입</Title>
      <JoinForm />
    </JoinContainer>
  );
};

export default Join;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
