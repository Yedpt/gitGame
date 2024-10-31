// En este componente se gestiona cada sección del mes con los juegos correspondientes.

import React from 'react';
import GameCard from './GameCard';

const MonthSection = ({ monthData }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{monthData.month}</h2>
      <div className="space-y-4">
        {monthData.games.map((game) => (
          <GameCard key={game.title} game={game} />
        ))}
      </div>
    </section>
  );
};

export default MonthSection;
