import React from 'react';
import { Link } from 'react-router-dom';

const MainCard = ({ title, image_url, date, id }) => {

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div >
      <div className="bg-dark rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
        <img
          src={image_url}
          alt={title}
          className="w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-10">
        <div className='row-span-2 rotate-[270deg] font-title text-white text-xs font-bold justify-self-center py-12'>
          {date}
        </div>

        <div className='col-span-9' >
          <Link to={`/newsdetails/${id}`}>
            <button className='font-title text-white rounded-md bg-greenMid px-1 py-1 text-sm font-bold my-4'>LEER MÁS</button>
          </Link>
        </div>

        <div className="col-span-9">
          <h2 className="sm:text-xl font-bold font-title text-white">{title}</h2>
        </div>

      </div>

    </div>
  );
}

export default MainCard;

