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

  const checkCardsMatch = useCallback(() => {
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
  }, [
    cards,
    flippedCards,
    maxScore,
    setCards,
    setFlippedCards,
    setScore,
    setShowModal,
  ]);

  return { flipCard, checkCardsMatch };
};
