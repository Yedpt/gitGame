import { React, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaHeart } from 'react-icons/fa';
import { addLikeToReview } from '../services/reviewServices';

const UserReviewCard = ({title, imageUrl, review, num_likes, author, bgColor }) => {

  const [expanded, setExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [likes, setLikes] = useState(num_likes || 0);

  const handleLike = async (reviewId) => {
    try {
      const updatedReview = await addLikeToReview(reviewId);
      setLikes(updatedReview.num_likes); // Actualiza los likes con la respuesta del backend
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768); // Cambia a true para pantallas pequeñas
    };
  
    // Escuchar cambios de tamaño de pantalla
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleReview = () => {
    setExpanded(!expanded);  // Alternar estado "expanded"
  };

  return (
    <div className={`${bgColor} relative w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-10 gap-4 rounded-lg shadow-lg mb-4`} onClick={toggleReview}>
      {/* Contenedor izquierdo con título y descripción */}
      <div className={`flex-1 ${isSmallScreen ? 'w-full' : 'text-left'}`} onClick={isSmallScreen ? toggleReview : null}>
        <h3 className="md:text-3xl font-bold text-light font-title text-2xl text-left mb-4 px-0">{title}</h3>
        {isSmallScreen ? (
          // Collapse solo en pantallas pequeñas
          <Collapse isOpened={expanded}>
            <div>
              <p className="text-base font-paragraph md:text-lg text-light mb-4">{review}</p>
              <p className="text-light font-bold my-3">Autor: {author}</p>
            </div>
          </Collapse>
        ) : (
          <div>
            <p className="mt-2 mr-3 text-light font-paragraph">{review}</p>
            <p className="text-light font-bold my-4">Autor: {author}</p>
            <div className="flex items-center">
              <button onClick={() => handleLike(review.id)} className="mr-2 text-red-500 hover:text-red-700">
                <FaHeart />
              </button>
              <span className="text-light mr-9">{likes}</span>
            </div>
          </div>
        )}
      </div>

      {/* Contenedor derecho con imagen */}
      <div className={`${isSmallScreen ? 'w-full rounded-lg mt-4' : 'lg:w-1/2'}`}>
        <img src={imageUrl} alt={title} className="rounded-lg w-full h-auto object-cover" />
      </div>

      {/* Likes siempre visibles debajo de la imagen en pantallas pequeñas */}
      {isSmallScreen && (
        <div className="flex justify-start items-center mt-3 w-full">
          <button onClick={() => handleLike(review.id)} className="mr-2 text-red-500 hover:text-red-700">
            <FaHeart />
          </button>
          <span className="text-light mr-9">{likes}</span>
        </div>
      )}
    </div>
  );
};

export default UserReviewCard;
