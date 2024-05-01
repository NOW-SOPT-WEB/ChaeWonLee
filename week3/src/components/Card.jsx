import styled, { css, keyframes } from "styled-components";

const Card = ({ id, src, alt, flipped, onClick, flipping, unflipping }) => {
  //console.log("카드", src);
  return (
    <CardWrapper onClick={() => onClick(id)}>
      <CardFlipper
        flipped={flipped ? "true" : undefined}
        flipping={flipping ? "true" : undefined}
        unflipping={unflipping ? "true" : undefined}
      >
        <CardFront />
        <CardBack src={src} alt={alt} />
      </CardFlipper>
    </CardWrapper>
  );
};

export default Card;

const flipAnimation = keyframes`
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(180deg);
    }
`;

const unflipAnimation = keyframes`
    from {
        transform: rotateY(180deg);
    }
    to {
        transform: rotateY(360deg);
    }
`;

const CardWrapper = styled.article`
  width: 100px;
  height: 150px;
`;

const CardFlipper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${({ flipped }) =>
    flipped &&
    css`
      transform: rotateY(180deg);
    `}
  ${({ flipping }) =>
    flipping &&
    css`
      animation: ${flipAnimation} 0.6s forwards;
    `}
    ${({ unflipping }) =>
    unflipping &&
    css`
      animation: ${unflipAnimation} 0.6s forwards;
    `}
`;

const CardFrontBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
`;

const CardFront = styled(CardFrontBack)`
  background-color: black;
`;

const CardBack = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;
