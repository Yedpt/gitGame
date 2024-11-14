import React, { useEffect, useState, useRef } from 'react';
import { getAllReleases } from '../services/releasesServices';
import portada from '../assets/img/reviewsportada.svg';
import Pagination from '../components/Pagination';
import GameCard from '../components/GameCard';

const UpcomingReleases = () => {
  const [releasesData, setReleasesData] = useState([]);
  const [currentPages, setCurrentPages] = useState({}); 
  const releasesPerPage = 4; 
  const releasesRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataReleases = await getAllReleases();
        if (Array.isArray(dataReleases)) {
          const formattedReleases = dataReleases.map((item) => {
            const formattedDateTime = new Date(item.release_date).toISOString();
            const imageUrl = `http://localhost:3000${item.image_url}`;
            return {
              ...item,
              image_url: imageUrl,
              release_date: formattedDateTime,
            };
          });
          setReleasesData(formattedReleases);
        }
      } catch (error) {
        console.error('Error fetching releases:', error);
      }
    };
    fetchData();
  }, []);

  
  const groupedReleases = releasesData.reduce((acc, release) => {
    const releaseDate = new Date(release.release_date);
    const monthYear = releaseDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(release);

    return acc;
  }, {});

  
  const groupedReleasesArray = Object.entries(groupedReleases);

  
  const handlePageChange = (monthYear, page) => {
    setCurrentPages((prev) => ({
      ...prev,
      [monthYear]: page,
    }));
    releasesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const paginatedReleases = groupedReleasesArray.map(([monthYear, releases]) => {
    const currentPage = currentPages[monthYear] || 1; 
    const startIndex = (currentPage - 1) * releasesPerPage;
    const paginatedData = releases.slice(startIndex, startIndex + releasesPerPage);

    return {
      monthYear,
      releases: paginatedData,
      totalPages: Math.ceil(releases.length / releasesPerPage), 
    };
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-dark">
      <div className="relative h-full md:h-full h-11/12 mb-8">
        <img src={portada} alt="Portada" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-center h-full">
          <h1 className="text-3xl text-center md:text-6xl font-bold text-light font-title drop-shadow-lg">
            PRÓXIMOS LANZAMIENTOS
          </h1>
        </div>
      </div>
      <div className="px-6 md:px-8">
        <p className="text-light text-center font-paragraph md:items-center md:text-3xl text-lg">
          ¿Quieres saber cuáles son los próximos lanzamientos de juegos? Aquí encontrarás el calendario con las fechas de lanzamiento de todos los juegos actualizadas día a día para que puedas conocer qué juegos saldrán al mercado en los próximos meses.
        </p>
      </div>

      <div className="container mx-auto p-4" ref={releasesRef}>
        <h2 className="text-2xl md:text-5xl text-greenLight font-bold pt-10 mb-4">LANZAMIENTOS POR MES</h2>

        {/* Mapeamos los meses y sus lanzamientos */}
        {paginatedReleases.map(({ monthYear, releases, totalPages }) => (
          <div key={monthYear} className="mb-8">
            <h3 className="text-light text-2xl md:text-3xl font-semibold mb-2">{monthYear}</h3>
            <div className="grid w-full grid-cols-1 justify-center md:grid-cols-4 gap-4">
              {releases.map((item, index) => (
                <GameCard
                  key={item.id}
                  game={{
                    title: item.title,
                    imageUrl: item.image_url || '',
                    date: item.release_date ? new Date(item.release_date).toLocaleDateString() : 'Fecha desconocida',
                    rating: item.rating || 'N/A',
                  }}
                  bgColor={index % 2 === 0 ? 'bg-greenMidsec' : 'bg-greenMid'}
                />
              ))}
            </div>

            
            <Pagination
              currentPage={currentPages[monthYear] || 1}
              totalPages={totalPages}
              onPageChange={(page) => handlePageChange(monthYear, page)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReleases;
