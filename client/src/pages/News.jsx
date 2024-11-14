import { React, useEffect, useState } from "react";
import image from "../assets/images/image.png";
import MainCard from "../components/MainCard";
import { getAllNews } from "../services/newServices";

const GameNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const dataNews = await getAllNews();
    if (Array.isArray(dataNews)) {
      const formattedNews = dataNews.map((item) => {
        const formattedDateTime = new Date(item.published_at).toISOString();
        const imageUrl = `http://localhost:3000${item.image_url}`;

        return {
          ...item,
          image_url: imageUrl,
          published_at: formattedDateTime,
        };
      });

      formattedNews.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );

      setNews(formattedNews);
    } else {
      console.error("La respuesta no es un array:", dataNews);
      setNews([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div div className="w-full min-h-screen flex flex-col items-center bg-dark">
      <div className="relative h-60 md:h-[100vh] h-11/12 mb-8">
        <img
          src={image}
          alt="Fondo Verde"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-6xl font-bold text-white font-orbitron drop-shadow-lg">
            NOTICIAS
          </h1>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 w-5/6 mt-0 mb-2">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item) => (
            <MainCard
              key={item.id}
              id={item.id}
              title={item.title}
              news={item.news}
              image_url={item.image_url}
              date={new Date(item.published_at).toLocaleDateString()}
              numLikes={item.num_likes}
            />
          ))
        ) : (
          <p>No hay noticias disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default GameNews;
