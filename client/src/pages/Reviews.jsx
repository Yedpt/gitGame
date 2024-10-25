import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import review from '../assets/img/reviewsportada.svg';
import marioParty from '../assets/img/marioParty.svg';
import silenthill from '../assets/img/silenthill.svg';
import starone from '../assets/img/starsOne.svg';
import starsec from '../assets/img/starsSec.svg';

// Simulamos la API con reviews desde el backend
const fetchReviews = async () => {
  // Aquí puedes hacer una llamada a tu backend en el futuro
  // Ejemplo con fetch: const response = await fetch('/api/reviews');
  return [
    {
      id: 1,
      title: 'Análisis de Super Mario Party Jamboree',
      description:
        'El modo estrella de todo Mario Party está de vuelta con siete tableros (algunos míticos que regresan) que se sienten únicos y que siempre encuentran la forma de darle un nuevo giro de tuerca a la acción de Mario Party. Su diseño es francamente bueno, y no hablo exclusivamente de los gráficos, que por supuesto también son dignos de elogio. Circuito Lanzadados, por ejemplo, te hace sentir como en una carrera de Mario Kart con ese ímpetu por dar más vueltas que nadie a la pista, añadiendo a la acción una casilla especial que puede hacerte avanzar de golpe (y sin frenos) decenas de casillas, lo que está muy bien… y a la vez mal, si tu objetivo era frenar para comprar una de las preciadas estrellas necesarias para obtener la victoria final.',
      author: 'Arturo',
      image: marioParty,
      rating: starone,
    },
    {
      id: 2,
      title: 'Silent Hill Review',
      description:
        'El terror psicológico de Silent Hill te envuelve en una atmósfera oscura...',
      author: 'Admin',
      image: silenthill,
      rating: starsec,
    },
  ];
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [expandedReview, setExpandedReview] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Cargar datos simulados (en el futuro, la API real)
  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchReviews();
      setReviews(data);
    };
    loadReviews();
  }, []);

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

  const toggleReview = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  return (
    <div>
      <main>
        {/* Portada */}
        <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
          <img src={review} alt="Fantasy landscape" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
          <div className="relative z-0 text-center">
            <h2 className="text-6xl font-bold text-light mb-4 font-title">REVIEWS</h2>
          </div>
        </section>

        {/* Preview Admins */}
        <section className="bg-dark px-0 py-10">
          <h2 className="font-title text-3xl sm:text-4xl px-10 text-light font-semibold md:text-left  text-center mb-8">
            ÚLTIMOS REVIEWS
          </h2>

          {/* Contenedores de reviews ADMIN */}
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`relative h-auto w-full lg:h-screen flex flex-col lg:flex-row items-start lg:items-center justify-between p-10 gap-5
                ${review.id % 2 === 0 ? 'bg-greenMid' : 'bg-greenMidsec'}`}
              style={{ margin: 0 }}
            >
              {/* Contenedor de Título, Descripción y Datos */}
              <div
                className={`flex-1 md:mr-10 ${isSmallScreen ? 'w-full' : 'text-left'}`}
                onClick={() => isSmallScreen && toggleReview(review.id)}
              >
                <h1 className="md:text-3xl font-bold text-light font-title md:text-left text-2xl text-center mb-4 px-4 cursor-pointer">{review.title}</h1>

                {isSmallScreen ? (
                  <Collapse isOpened={expandedReview === review.id}>
                    <div className="px-4 py-2">
                      <p className="text-base md:text-lg text-light  font-paragraph mb-4">{review.description}</p>
                      <p className="text-light">Autor: {review.author}</p>
                      <img className="w-24 mt-2" src={review.rating} alt="rating" />
                    </div>
                  </Collapse>
                ) : (
                  <div className="px-4 py-2">
                    <p className="text-lg text-light font-paragraph mb-4">{review.description}</p>
                    <p className="text-light">Autor: {review.author}</p>
                    <img className="w-24 mt-2" src={review.rating} alt="rating" />
                  </div>
                )}
              </div>

              {/* Contenedor de la Imagen */}
              <div className="flex-1 flex justify-center md:justify-end px-4">
                <img
                  className="w-[100%] max-w-[651px] max-h-[442px] object-contain"
                  src={review.image}
                  alt={review.title}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Reviews Users */}
        <section className="bg-dark px-4 py-10">
          <h2 className="text-3xl sm:text-4xl text-light mb-8">
            REVIEWS DE USUARIOS
            </h2>
          {/* Aquí puedes añadir el código para reviews de usuarios */}
        </section>
      </main>
    </div>
  );
};

export default Reviews;
