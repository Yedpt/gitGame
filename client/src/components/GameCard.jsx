import React from 'react';

const GameCard = ({ game }) => {
  // Verifica que `game` esté definido y tenga `imageUrl`
  if (!game) {
    return null;
  }

  return (
    <div className="bg-green-800 rounded-lg p-4 flex items-center space-x-4">
      <img src={game.imageUrl || ''} alt={game.title || 'Juego'} className="w-16 h-16 object-cover rounded" />
      <div>
        <h3 className="text-lg font-medium">{game.title || 'Sin título'}</h3>
        <p className="text-sm">{game.date || 'Sin fecha'} ({game.rating || 'N/A'})</p>
      </div>
    </div>
  );
};

export default GameCard;
