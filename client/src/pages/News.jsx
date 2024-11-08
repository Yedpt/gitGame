import { React, useEffect, useState } from 'react';
import image from '../assets/images/image.png';
import MainCard from '../components/MainCard';
import { getAllNews } from '../services/newServices';


const GameNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const dataNews = await getAllNews();
    console.log('Datos de noticias:', dataNews); // Agrega esto
    if (Array.isArray(dataNews)) {
      const formattedNews = dataNews.map(item => {
        console.log('Image URL:', item.image_url);
        const formattedDate = new Date(item.published_at).toLocaleDateString(); // Formatear solo la fecha
        const imageUrl = `http://localhost:3000${item.image_url}`;

        return {
          ...item,
          image_url: imageUrl,
          published_at: formattedDate, // Reemplazar la fecha original por la formateada
        };
      });

      // Ordenar las noticias de forma descendente (última noticia primero)
      formattedNews.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

      setNews(formattedNews);
    } else {
      console.error('La respuesta no es un array:', dataNews);
      setNews([]); // En caso de que no sea un array, establece `news` como un array vacío
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div div className="w-full min-h-screen flex flex-col items-center bg-dark">
      <div className="w-full">
        <img
          src={image}
          alt="fondo verde"
          className="absolute w-full"
        />
      </div>

      <div className="grid gap-y-10 sm:grid-cols-1 w-5/6 mt-24 mb-2">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item) => (
            <MainCard
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
  )
}

export default GameNews
