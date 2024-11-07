import React, {useEffect, useState } from 'react';
import image from '../assets/images/image.png';
import CardNewDetail from '../components/CardNewDetail';
import { getNewById } from '../services/newServices';
import { useParams } from 'react-router-dom';

const NewsDetails = () => {
  const { id } = useParams(); 
  const [news, setNews] = useState(null);

  const fetchData = async () => {
    try {
      const dataNews = await getNewById(id); // Pasa el ID aquí
      console.log('Datos de noticia:', dataNews); // Agrega esto para depurar

      if (dataNews) {
        const formattedNews = {
          ...dataNews,
          image_url: `http://localhost:3000${dataNews.image_url}`,
          image2_url: `http://localhost:3000${dataNews.image2_url}`,
          published_at: new Date(dataNews.published_at).toLocaleDateString(),
        };

        setNews(formattedNews);
      } else {
        console.error('No se encontró la noticia.');
      }
    } catch (error) {
      console.error('Error al obtener noticia:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); 

  return (
    <div div className="w-full min-h-screen flex flex-col items-center bg-dark">
      {/* <div className="w-full">
        <img
          src={image}
          alt="fondo verde"
          className="absolute w-full"
        />
      </div> */}

      <div className="grid gap-y-10 sm:grid-cols-1 w-5/6 mt-24 mb-2">
          {news ? (
            <CardNewDetail
              key={news.id}
              id={news.id}
              title={news.title}
              news={news.news}
              image_url={news.image_url}
              image2_url={news.image2_url}
              date={news.published_at}
            />
        
        ) : (
          <p>No hay noticias disponibles.</p>
        )}
      </div>
    </div>
  )
}
export default NewsDetails
