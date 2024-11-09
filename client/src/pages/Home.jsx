import { React, useEffect, useState } from 'react';
import { getAllNews } from '../services/newServices';
import home from '../assets/img/home.svg';
import logo from '../assets/img/logo.svg';
import team from '../assets/img/team.svg';
import contacto from '../assets/img/contacto.svg';
import MainCard from '../components/MainCard.jsx';
import SecondaryCard from '../components/SecondaryCard.jsx';

export default function Home() {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const dataNews = await getAllNews();
    console.log('Datos de noticias:', dataNews);

    if (Array.isArray(dataNews)) {
      const formattedNews = dataNews.map(item => {
        console.log('Image URL:', item.image_url);

        const formattedDateTime = new Date(item.published_at).toISOString();
        const imageUrl = `http://localhost:3000${item.image_url}`;

        return {
          ...item,
          image_url: imageUrl,
          published_at: formattedDateTime,
        };
      });

      // Ordenar las noticias por 'published_at' de forma descendente
      const sortedNews = formattedNews.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

      // Establecer el estado con solo la primera noticia (más reciente)
      setNews(sortedNews);

    } else {
      console.error('La respuesta no es un array:', dataNews);
      setNews([]); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const mainCardNews = news.length > 0 ? news[0] : null; // La más reciente
  const secondaryCardNews = news.length > 1 ? news.slice(1, 4) : []; // Las tres siguientes

  return (
    <div className="min-h-screen font-orbitron bg-dark text-white">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-64 md:min-h-screen md:flex items-center justify-center overflow-hidden">
          <img
            src={home}
            alt="Fantasy landscape"
            className="w-full absolute object-contain inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
          <div className="z-0 text-center relative px-4 md:px-0">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 font-title mt-8 md:mt-2">Bienvenido a</h2>
            <img
              src={logo}
              alt="Descripción de la imagen SVG"
              className="w-2/3 sm:w-2/3 md:w-2/4 lg:w-3/5 xl:w-5/6 mx-auto"
            />
          </div>
        </section>

        {/* Noticias Destacadas */}
        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-greenLight font-title">NOTICIAS DESTACADAS</h2>

          {/* Ajuste de cuadrícula */}
          <div className="md:flex">
            {/* El MainCard ocupará toda la altura del lado izquierdo */}
            <div className="md:flex-1 h-full md:col-span-2 bg-dark overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
              {mainCardNews ? (
                <MainCard
                  key={mainCardNews.id}
                  id={mainCardNews.id}
                  title={mainCardNews.title}
                  news={mainCardNews.news}
                  image_url={mainCardNews.image_url}
                  date={mainCardNews.published_at}
                />
              ) : (
                <p>No hay noticias disponibles.</p>
              )}
            </div>

            {/* Espacio de separación entre MainCard y SecondaryCard */}
            <div className="w-8 hidden md:inline"></div>

            <div className="pt-6 md:pt-1 flex flex-col justify-between md:w-1/3 h-full gap-4 md:grid-rows-3">
              {secondaryCardNews.length > 0 ? (
                secondaryCardNews.map((item) => (
                  <SecondaryCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    news={item.news}
                    image_url={item.image_url}
                    date={item.published_at}
                  />
                ))
              ) : (
                <p>No hay noticias disponibles.</p>
              )}
            </div>
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-greenLight  font-title">SOBRE NOSOTROS</h2>
          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            {/* Contenedor de texto */}
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 flex flex-col justify-center">
              <p className="mb-4 font-paragraph text-lg md:text-2xl lg:text-2xl leading-relaxed md:leading-loose">
                Somos un grupo de apasionados por los videojuegos, dedicados a compartir nuestras experiencias y
                conocimientos con la comunidad gamer. Nuestro objetivo es mantenerte informado sobre las últimas
                novedades, análisis y noticias del fascinante mundo de los videojuegos.
                <br /><br />
                Nuestra misión es proporcionarte información actualizada, análisis detallados y contenido exclusivo sobre tus videojuegos favoritos y los
                próximos lanzamientos, para que estés siempre al día con las novedades de la industria.
              </p>
            </div>
            {/* Contenedor de imagen */}
            <div className="md:w-1/2 flex items-center justify-center">
              <img src={team} alt="Gamers playing" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="p-4 sm:p-8">
          <h2 className="text-3xl font-bold mb-6 text-greenLight font-title">CONTACTO</h2>
          <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
            <div className="lg:w-1/2 w-full hidden md:inline">
              <img
                src={contacto}
                alt="Persona jugando videojuegos"
                className="rounded-lg object-cover w-full h-auto shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <form className="space-y-6">
                <div>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-3 bg-greenMidsec text-white rounded-xl placeholder-white focus:outline-none focus:ring-2 focus:ring-greenLight text-base"
                    required
                  />
                </div>
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full p-3 bg-greenMidsec text-white rounded-xl placeholder-white focus:outline-none focus:ring-2 focus:ring-greenLight text-base"
                    required
                  />
                </div>
                <div>
                  <textarea
                    id="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    rows={6}
                    className="w-full p-3 bg-greenMidsec text-white rounded-xl placeholder-white focus:outline-none focus:ring-2 focus:ring-greenLight resize-y text-base"
                    required
                  ></textarea>
                </div>
                <div className='flex items-center justify-center'>
                  <button
                    type="submit"
                    className="w-1/3 bg-white text-black px-4 py-2 rounded-xl text-lg hover:bg-greenMidsec transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Enviar 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
