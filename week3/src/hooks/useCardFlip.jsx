import { useCallback } from "react";

export const useCardFlip = ({
  cards,
  setCards,
  setFlippedCards,
  flippedCards,
  setScore,
  showModal,
  setShowModal,
  maxScore,
}) => {
  // 카드를 뒤집는 함수 /  두 카드가 이미 뒤집혀 있거나 모달이 보여지는 경우에는 작동하지 않음
  const flipCard = useCallback(
    (id) => {
      if (flippedCards.length === 2 || showModal) {
        return;
      }
      const newCards = cards.map((card) =>
        card.id === id ? { ...card, flipped: true, flipping: true } : card
      );
      setCards(newCards);
      setFlippedCards([...flippedCards, id]);
    },
    [cards, flippedCards, showModal, setCards, setFlippedCards]
  );
  // 두 뒤집힌 카드가 일치하는지 체크하는 함수 / 일치하면 점수를 올리고 최대 점수에 도달하면 모달을 보여줌
  const checkCardsMatch = () => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      const isMatch = firstCard.alt === secondCard.alt;

      setTimeout(() => {
        setCards(
          cards.map((card) => {
            if (!flippedCards.includes(card.id)) return card;
            return {
              ...card,
              flipped: isMatch,
              flipping: false,
            };
          })
        );

        setFlippedCards([]);

        if (isMatch) {
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            if (newScore === maxScore) {
              setShowModal(true);
            }
            return newScore;
          });
        }
      }, 600);
    }
  };

  return { flipCard, checkCardsMatch };
};
