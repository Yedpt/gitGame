import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import review from '../assets/img/reviewsportada.svg';
import marioParty from '../assets/img/marioParty.svg';
import silenthill from '../assets/img/silenthill.svg';
import starone from '../assets/img/starsOne.svg';
import starsec from '../assets/img/starsSec.svg';
import cultoflamb from '../assets/img/cultoflamb.svg';
import corekeeper from '../assets/img/corekeeper.svg';
import { AiFillHeart } from 'react-icons/ai';


// Simulamos la API con reviews desde el backend
const fetchReviews = async () => {
  // Aquí puedes hacer una llamada a tu backend en el futuro
  // Ejemplo con fetch: const response = await fetch('/api/reviews');
  return [
    {
      id: 41,
      title: 'Análisis de Super Mario Party Jamboree',
      description:
        'El modo estrella de todo Mario Party está de vuelta con siete tableros (algunos míticos que regresan) que se sienten únicos y que siempre encuentran la forma de darle un nuevo giro de tuerca a la acción de Mario Party. Su diseño es francamente bueno, y no hablo exclusivamente de los gráficos, que por supuesto también son dignos de elogio. Circuito Lanzadados, por ejemplo, te hace sentir como en una carrera de Mario Kart con ese ímpetu por dar más vueltas que nadie a la pista, añadiendo a la acción una casilla especial que puede hacerte avanzar de golpe (y sin frenos) decenas de casillas, lo que está muy bien… y a la vez mal, si tu objetivo era frenar para comprar una de las preciadas estrellas necesarias para obtener la victoria final.',
      author: 'Arturo',
      image: marioParty,
      rating: starone,
    },
    {
      id: 92,
      title: 'Análisis de Silent Hill 2 Remake',
      description:
        'Silent Hill 2 es, en líneas generales, un remake bastante fiel al clásico de terror de Konami. Lo que más se nota, más allá de los gráficos renovados, es que el diseño de niveles ha mejorado muchísimo, convirtiendo los míticos entornos en lugares más interesantes que recorrer. Lo mismo ocurre con el combate, que es más reactivo y dentro de sus limitaciones encuentra formas creativas de enfrentarse a los enemigos con las mismas herramientas.  En lo narrativo hay pocos cambios, y son más cuestión de detalles y sutilezas, pero importantes. Algunas escenas que, en mi opinión, pierden fuerza mientras que otras, en cambio, salen reforzadas. Pero con todo, Bloober ha creado algo especial. Sabe mantener la tensión y producir las sensaciones correctas, sobre todo en el gameplay. Se ha ganado el puesto para seguir trabajando en la franquicia.',
      author: 'Arturo :)',
      image: silenthill,
      rating: starsec,
    },
  ];
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([
    { 
      id: 18,
      title: 'Análisis de Cult of the Lamb: Pilgrim’s Edition', 
      description: 'Lorem ipsum dolor En lo narrativo hay pocos cambios, y son más cuestión de detalles y sutilezas, pero importantes. Algunas escenas que, en mi opinión, pierden fuerza mientras que otras, en cambio, salen reforzadas. Pero con todo, Bloober ha creado algo especial. Sabe mantener la tensión y producir las sensaciones correctas, sobre todo en el gameplay. Se ha ganado el puesto para seguir trabajando en la franquicia.', 
      author: 'Usuario123', 
      likes: 0, 
      image: cultoflamb
    },
    { 
      id: 20, 
      title: 'Análisis de Core Keeper', 
      description: 'Si te gusta minecraft, Stardew Valley, Terraria, Valheim y demás, este juego te encantará. Algunas escenas que, en mi opinión, pierden fuerza mientras que otras, en cambio, salen reforzadas. Pero con todo, Bloober ha creado algo especial. Sabe mantener la tensión y producir las sensaciones correctas, sobre todo en el gameplay. Se ha ganado el puesto para seguir trabajando en la franquicia.', 
      author: 'GamerXYZ',
      image: corekeeper,
      likes: 0 
    },
  ]);
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

  const handleLike = (id) => {
    setUserReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  return (
    <div>
      <main>
        {/* Portada */}
        <section className={`relative ${isSmallScreen ? 'h-[50vh]' : 'h-[95vh]'} flex items-center justify-center overflow-hidden`}>
        <img 
          src={review} 
          alt="Fantasy landscape" 
          className={`absolute inset-0 w-full ${isSmallScreen ? 'h-full' : 'h-full'} object-cover`}
        />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
          <div className="relative z-0 text-center">
            <h2 className="md:text-6xl text-4xl font-bold text-light mb-4 font-title">REVIEWS</h2>
          </div>
        </section>

        {/* Preview Admins */}
        <section className="bg-dark px-0 py-10">
          <h2 className="font-title text-3xl md:text-4xl px-10 text-light font-semibold md:text-left  text-center mb-8">
            ÚLTIMAS RESEÑAS
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
        <section className="bg-dark px-0 py-10">
          <h2 className="font-title text-3xl md:text-4xl px-10 text-light font-semibold md:text-left  text-center mb-8">
            RESEÑAS DE USUARIOS
          </h2>

          {/* Contenedores de reviews USUARIOS */}
          {userReviews.map((userReview) => (
            <div 
            key={userReview.id} 
            className={`relative h-auto w-full lg:h-screen flex flex-col lg:flex-row items-start lg:items-center justify-between p-10 gap-5
              ${userReview.id % 2 === 0 ? 'bg-greenMid' : 'bg-greenMidsec'}`}
            style={{ margin: 0 }}
            >
            {/* Contenedor de Título, Descripción y Datos */}
            <div className={`flex-1 md:mr-10 ${isSmallScreen ? 'w-full' : 'text-left'}`}
              onClick={() => isSmallScreen && toggleReview(userReview.id)}
            >

              <h1 className="md:text-3xl md:text-left text-center px-4 mb-4 text-2xl font-bold cursor-pointer font-title text-light">{userReview.title}</h1>

              {isSmallScreen ? (
                <Collapse isOpened={expandedReview === userReview.id}>
                  <div className='px-4 py-2'>
                    <p className="text-base md:text-lg text-light  font-paragraph mb-4">{userReview.description}</p>
                    <p className="text-light">Autor: {userReview.author}</p>
                  </div>
                  </Collapse>
              ) : (
              <div className="px-4 py-2">
                <p className="text-light font-extralight font-paragraph">{userReview.description}</p>
                <p className="text-sm font-paragraph font-bold text-greenLight font ">Autor: {userReview.author}</p>
                <button onClick={() => handleLike(userReview.id)} className="text-light hover:text-pink-700 px-3 py-1 rounded">
                  <AiFillHeart size={24} />
                </button>
                <span className="text-light">{userReview.likes} Likes</span>
              </div>
              )}
            </div>
            {/* Contenedor de la Imagen */}
            <div className="flex-1 flex justify-center md:justify-end px-4">
              <img 
                className="w-[100%] max-w-[651px] max-h-[442px] object-contain"
                src={userReview.image} 
                alt={userReview.title} 
              />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Reviews;
