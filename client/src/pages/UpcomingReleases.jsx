import React, { useEffect, useState, useRef } from 'react';
import { getAllReleases } from '../services/releasesServices';
import portada from '../assets/img/reviewsportada.svg';
import Pagination from '../components/Pagination';
import GameCard from '../components/GameCard';

const UpcomingReleases = () => {
  const [releasesData, setReleasesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const releasesPerPage = 3; // Ajusta según las necesidades de paginación

  // Referencia para desplazarse hacia la parte superior de la sección
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

  // Calcular los lanzamientos de la página actual para paginación
  const paginatedReleases = releasesData.slice(
    (currentPage - 1) * releasesPerPage,
    currentPage * releasesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    releasesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-dark">
      {/* Imagen de portada con título */}
      <div className="relative h-full md:h-full h-11/12 mb-8">
        <img src={portada} alt="Portada" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-6xl font-bold text-white font-orbitron drop-shadow-lg">PRÓXIMOS LANZAMIENTOS</h1>
        </div>
      </div>

      {/* Contenido de lanzamientos por mes */}
      <div className="container mx-auto p-4" ref={releasesRef}>
        <h2 className="text-2xl md:text-4xl text-greenLight font-bold pt-10 mb-4">LANZAMIENTOS POR MES</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          {paginatedReleases.map((item, index) => (
            <GameCard
              key={item.id}
              game={{
                title: item.title,
                imageUrl: item.image_url || '', // Valor por defecto en caso de que `image_url` esté indefinido
                date: item.release_date ? new Date(item.release_date).toLocaleDateString() : 'Fecha desconocida',
                rating: item.rating || 'N/A', // Valor por defecto
                month: item.month || 'Mes desconocido', // Valor por defecto
              }}
              bgColor={index % 2 === 0 ? 'bg-greenMidsec' : 'bg-greenMid'}
            />
          ))}

        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(releasesData.length / releasesPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UpcomingReleases;
