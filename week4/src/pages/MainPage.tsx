import { Player, BigPlayButton, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton } from "video-react";
import "video-react/dist/video-react.css";
import mainVideo from "../assets/video/cloud.mp4";
import styled from "styled-components";
import CommonBtn from "../components/Button";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const memberId = useParams().id;

  return (
    <MainContainer>
      <VideoContainer>
        <Player playsInline poster="/path/to/poster.png" src={mainVideo} autoPlay loop>
          <BigPlayButton position="center" />
          <ControlBar>
            <ReplayControl seconds={10} order={2.1} />
            <ForwardControl seconds={30} order={3.1} />
            <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
          </ControlBar>
        </Player>
      </VideoContainer>
      <BtnWrapper>
        <CommonBtn text="내 정보" link={`/mypage/${memberId}`} />
        <CommonBtn text="회원가입" link="/join" />
      </BtnWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const VideoContainer = styled.div`
  width: 40rem;
  height: 30rem;
  .video-react-video {
    width: 100%;
    height: 100%;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default MainPage;
