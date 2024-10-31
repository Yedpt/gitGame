/*Aqui creamos la la lógica principal de la pagina
de proximos lanzamientos y llamar los subcomponents
para cada sección del mes y cada card de juego. */


import React from 'react';
import MonthSection from './MonthSection';

const releasesData = [
  {
    month: "Novembre",
    games: [
      {
        title: "Metro Awakening",
        date: "Novembre 7, 2024",
        rating: "PegI 18",
        imageUrl: "/path/to/metro-image.jpg",
      },
      {
        title: "STALKER 2",
        date: "Novembre 28, 2024",
        rating: "PegI 18",
        imageUrl: "/path/to/stalker-image.jpg",
      },
    ],
  },
  {
    month: "Décembre",
    games: [
      {
        title: "Indiana Jones and the Great Circle",
        date: "Décembre 11, 2024",
        rating: "PegI 16",
        imageUrl: "/path/to/indiana-jones-image.jpg",
      },
    ],
  },
];

const UpcomingReleases = () => {
  return (
    <div className="bg-gray-900 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Latest Launches</h1>
      </header>
      {releasesData.map((monthData) => (
        <MonthSection key={monthData.month} monthData={monthData} />
      ))}
      <footer className="text-center mt-6 text-sm">
        <p>© All reserved rights. GitGame 2024.</p>
      </footer>
    </div>
  );
};

export default UpcomingReleases;

