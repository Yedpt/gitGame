import { React, useEffect, useState } from 'react';
import { getAllNews } from '../services/newServices';
import home from '../assets/img/home.svg';
import logo from '../assets/img/logo.svg';
import team from '../assets/img/team.svg';
import darksoul from '../assets/img/darksoul.svg';
import luigi from '../assets/img/luigi.svg';
import gta from '../assets/img/gta.svg';
import contacto from '../assets/img/contacto.svg';
import MainCard from '../components/MainCard.jsx';
import SecondaryCard from '../components/SecondaryCard.jsx';

export default function Home() {
  // prueba
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const dataNews = await getAllNews();
    console.log('Datos de noticias:', dataNews);
    if (Array.isArray(dataNews)) {
      const formattedNews = dataNews.map(item => {
        console.log('Image URL:', item.image_url);
        const formattedDate = new Date(item.published_at).toLocaleDateString(); 
        const imageUrl = `http://localhost:3000${item.image_url}`;

        return {
          ...item,
          image_url: imageUrl,
          published_at: formattedDate, // Reemplazar la fecha original por la formateada
        };
      });

      // Ordenar las noticias por 'published_at' de forma descendente
      const sortedNews = formattedNews.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

      // Establecer el estado con solo la primera noticia (más reciente)
      setNews([sortedNews[0]]);

    } else {
      console.error('La respuesta no es un array:', dataNews);
      setNews([]); // En caso de que no sea un array, establece `news` como un array vacío
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen font-orbitron" style={{ backgroundColor: '#2D342D', color: 'white' }}>
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
          <img src={home} alt="Fantasy landscape" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
          <div className="relative z-0 text-center">
            <h2 className="text-4xl font-bold mb-4 font-title">Bienvenido a</h2>
            <img src={logo} alt="Descripción de la imagen SVG" />
          </div>
        </section>

        {/* Noticias Destacadas */}
        <section className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-green-500 font-title">NOTICIAS DESTACADAS</h2>

          {/* Ajuste de cuadrícula */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* El MainCard ocupará toda la altura del lado izquierdo */}
            <div className="md:col-span-2 bg-dark overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
              {Array.isArray(news) && news.length > 0 ? (
                news.map((item) => (
                  <MainCard
                    key={item.id}
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

            <div className="flex flex-col gap-6">
              <SecondaryCard
                imageSrc={darksoul}
                title="Dark Souls 4 en desarrollo"
                altText="Dark Souls en desarrollo"
              />
              <SecondaryCard
                imageSrc={luigi}
                title="Luigi's Mansion vende 3 millones de copias"
                altText="Luigi's Mansion"
              />
              <SecondaryCard
                imageSrc={gta}
                title="GTA VI saldrá en diciembre de 2025"
                altText="Lanzamiento GTA VI"
              />
            </div>
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="p-8" style={{ backgroundColor: '#2D342D' }}>
          <h2 className="text-3xl font-bold mb-6 text-green-500 font-title">SOBRE NOSOTROS</h2>
          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            {/* Contenedor de texto */}
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 flex flex-col justify-center">
              <p className="mb-4 font-paragraph text-lg md:text-2xl lg:text-2xl leading-relaxed md:leading-loose">
                Somos un grupo de apasionados por los videojuegos, dedicados a compartir nuestras experiencias y
                conocimientos con la comunidad gamer. Nuestro objetivo es mantenerte informado sobre las últimas
                novedades, análisis y noticias del fascinante mundo de los videojuegos.
                <br /><br />
                Nuestra misión es proporcionarte información actualizada, análisis detallados y contenido exclusivo sobre tus juegos favoritos y los
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
        <section className="p-4 sm:p-8" style={{ backgroundColor: '#2D342D' }}>
          <h2 className="text-3xl font-bold mb-6 text-green-500 font-title">CONTACTO</h2>
          <div className="flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
            <div className="lg:w-1/2 w-full">
              <img
                src={contacto}
                alt="Persona jugando videojuegos"
                className="rounded-lg object-cover w-full h-auto shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <form className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full p-3 bg-gray-800 text-white rounded placeholder--[#325C34] focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full p-3 bg-gray-800 text-white rounded placeholder--[#325C34] focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
                  <textarea
                    id="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    rows={6}
                    className="w-full p-3 bg-gray-800 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y text-base"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white px-6 py-4 rounded font-bold text-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Enviar Mensaje
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
