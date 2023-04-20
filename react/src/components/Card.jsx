import React from "react";

const Card = (props) => {
  return (
    <div className="card" onClick={props.onClick}>
      {props.card.flipped ? (
        <div className="card-front">
          <img src={props.card.front} alt={props.value} height={120} />
        </div>
      ) : (
        <div className="card-back">
          <img src={props.card.back} alt="card back" height={120} />
        </div>
      )}
    </div>
  );
};

export default Card;
