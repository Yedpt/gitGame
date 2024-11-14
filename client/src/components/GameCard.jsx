import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const GameCard = ({ game, bgColor }) => {
  
  if (!game) {
    return null;
  }

  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-light" />);
    }
    return stars;
  };

  return (
    <div className={`${bgColor} rounded-lg md:w-11/12  p-4 flex items-center space-x-4`}>
      <img src={game.imageUrl || ''} alt={game.title || 'Juego'} className="w-16 h-18 object-cover rounded-lg" />
      <div>
        <h3 className="text-lg text-light font-semibold">{game.title || 'Sin título'}</h3>
        <p className="text-sm md:text-xl font-light font-paragraph text-light">{game.date || 'Sin fecha'}</p>
        <div className="flex space-x-1">
          {renderStars(game.rating || 0)}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
