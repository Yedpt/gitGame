import { React, useEffect, useState } from 'react';
import image from '../assets/images/image.png';
import CopyMainCard from '../components/CopyMainCard';
import { getAllNews } from '../services/newServices';


const GameNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const dataNews = await getAllNews();
    console.log('Datos de noticias:', dataNews); // Agrega esto
    if (Array.isArray(dataNews)) {
      setNews(dataNews);
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
      {/* <div className="w-full">
        <img
          src={image}
          alt="fondo verde"
          className="absolute w-full"
        />
      </div> */}

      <div className="grid sm:grid-cols-1 w-5/6 mt-24">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item) => (
            <CopyMainCard
              key={item.id}
              title={item.title}
              news={item.news}
              imageUrl={item.image_url}
              date={item.date}
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
