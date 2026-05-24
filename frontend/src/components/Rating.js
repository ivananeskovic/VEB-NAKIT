import React from 'react';

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>{value >= 1 ? '★' : '☆'}</span>
      <span>{value >= 2 ? '★' : '☆'}</span>
      <span>{value >= 3 ? '★' : '☆'}</span>
      <span>{value >= 4 ? '★' : '☆'}</span>
      <span>{value >= 5 ? '★' : '☆'}</span>
      <small>{text}</small>
    </div>
  );
};

export default Rating;
