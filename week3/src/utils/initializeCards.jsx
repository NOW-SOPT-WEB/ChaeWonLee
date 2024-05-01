import { shuffleArray } from "./shuffleArray";
import cardData from "../constants/cardData";

export const initializeCards = (pairsCount) => {
  const shuffledCardData = shuffleArray([...cardData]);
  const selectedCards = shuffledCardData.slice(0, pairsCount);
  let doubledCards = [...selectedCards, ...selectedCards].map(
    (card, index) => ({
      ...card,
      id: index,
      flipped: false,
      flipping: false,
    })
  );

  doubledCards = shuffleArray(doubledCards);

  return doubledCards;
};
