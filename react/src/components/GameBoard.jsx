import React, { useEffect, useState } from "react";
import Card from "./Card";
import jsonCards from "../../public/cards.json";

const GameBoard = (props) => {
  const [cards, setCards] = useState(jsonCards);
  const [goodCards, setGoodCards] = useState([]);
  const [count, setCount] = useState(0);

  // Shuffle cards on first render
  useEffect(() => {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  // Check if two cards are flipped and if they match or not
  useEffect(() => {
    const lastFlippedCard = cards.filter(
      (card) => card.flipped && !goodCards.includes(card)
    );
    if (lastFlippedCard.length === 2) {
      if (lastFlippedCard[0].value === lastFlippedCard[1].value) {
        setGoodCards([...goodCards, lastFlippedCard[0], lastFlippedCard[1]]);
        setCount(count + 1);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards.forEach((card) => {
            if (card.flipped && !goodCards.includes(card)) {
              card.flipped = false;
            }
          });
          setCards(newCards);
        }, 1000);
        setCount(count + 1);
      }
    }
  }, [cards]);

  // Card click logic here
  const handleCardClick = (index) => {
    const lastFlippedCard = cards.filter(
      (card) => card.flipped && !goodCards.includes(card)
    );
    if (lastFlippedCard.length === 2) {
      return;
    }
    const newCards = [...cards];
    if (newCards[index].flipped) {
      return;
    }
    newCards[index].flipped = !newCards[index].flipped;
    setCards(newCards);
  };

  // Reset logic here
  const handleReset = () => {
    const newCards = [...cards];
    newCards.forEach((card) => (card.flipped = false));
    setCards(newCards);
    setGoodCards([]);
    setCount(0);
  };

  return (
    <>
      <div className="top-bar">
        <h1>Memory Game</h1>
      </div>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
      {goodCards.length === cards.length && (
        <>
          <div className="win-message">You win!</div>
          <p>You played {count} times.</p>
        </>
      )}
    </>
  );
};

export default GameBoard;
