import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating">
      {stars.map((star) =>
        value >= star ? (
          <FaStar key={star} />
        ) : value >= star - 0.5 ? (
          <FaStarHalfAlt key={star} />
        ) : (
          <FaRegStar key={star} />
        )
      )}
      <small>{text}</small>
    </div>
  );
};

export default Rating;
