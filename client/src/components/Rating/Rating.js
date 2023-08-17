import React from 'react';
import { Rating } from 'flowbite-react';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const starCount = 5;
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const starStyles = [];
    
    for (let i = 1; i <= starCount; i++) {
      if (i <= fullStars) {
        starStyles.push({ color: 'white' });
      } else if (i === fullStars + 1 && decimal >= 0.99) {
        starStyles.push({ color: 'white' });
      } else {
        starStyles.push({ color: 'gray' }); 
      }
    }
    
    return starStyles;
  };

  return (
    <Rating>
      {renderStars().map((starStyle, index) => (
        <Rating.Star key={index} style={starStyle} />
      ))}
    </Rating>
  );
};

export default StarRating;
