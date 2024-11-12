import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewById } from '../services/newServices';
import { useAuth } from '../context/authContextsss';

const CardNewDetail = ({ image_url, title, news, date, image2_url }) => {
  const { user } = useAuth(); // Obtén el usuario del contexto
  const [report, setReport] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      const loadNews = async () => {
        try {
          const userNews = await getNewById(id);
          setReport(userNews);
        } catch (error) {
          console.error('Error al cargar las reseñas:', error);
        }
      };
      loadNews();
    }
  }, [user]);


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
      <div className='font-title text-greenLight text-base md:text-sm font-bold justify-self-center pt-4 pb-10'>
        {date}
      </div>
      <hr className=' border-greenLight '/>
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

