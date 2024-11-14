import React, { useState, useEffect } from 'react';
import { getNewById, incrementLike } from '../services/newServices';
import { useAuth } from '../context/authContextsss';
import { FaHeart } from 'react-icons/fa';

const CardNewDetail = ({ image_url, title, news, date, image2_url, num_likes, id }) => {
  const { user } = useAuth(); 
  const [report, setReport] = useState([]);
  const [numLikes, setNumLikes] = useState(num_likes);

  useEffect(() => {
    if (user && user.id) {
      const loadNews = async () => {
        try {
          const userNews = await getNewById(id);
          setReport(userNews);
        } catch (error) {
          console.error('Error al cargar las noticias', error);
        }
      };
      loadNews();
    }
  }, [user]);

  const handleIncrementLike = async () => {
    try {
      const updatedNew = await incrementLike(id, user.id);
      setNumLikes(updatedNew.num_likes);
    } catch (error) {
      console.error('Error al actualizar el número de likes', error);
    }
  };

  return (
    <div >
      <div className="pt-16">
        <img
          src={image_url}
          alt="Imagen principal"
          className="w-full object-contain"
        />
      </div>
      <h2 className="pt-10 text-xl font-bold font-title text-light w-10/12 md:w-11/12 justify-self-center">{title}</h2>
      <div className='font-title text-greenLight text-base md:text-sm font-bold justify-self-center pt-4 pb-4'>
        {date}
      </div>
      <div className="flex justify-center items-center pb-10">
        <button
          onClick={() => handleIncrementLike()}
          className="text-light flex items-center space-x-2"
          title="like"
        >
          <FaHeart /> <span>{numLikes}</span>
        </button>
      </div>

      <hr className=' border-greenLight ' />
      <div className='w-full bg-greenMid'>
        <p className="md:text-xl text-lg font-paragraph text-light w-10/12 md:w-11/12 justify-self-center pt-10 pb-10">{news}</p>
      </div>
      <div className=" bg-greenMid overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
        <img
          src={image2_url}
          alt="Imagen secundaria"
          className="w-10/12 md:w-10/12 mb-8 rounded-lg justify-self-center object-cover"
        />
      </div>
    </div>
  );
}

export default CardNewDetail;

