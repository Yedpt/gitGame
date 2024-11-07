import React from 'react';
import { Link } from 'react-router-dom';

const CardNewDetail = ({ title, image_url, date, id, news, image2_url }) => {

  // const formattedDate = new Date(date).toLocaleDateString('es-ES', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  return (
    <div >
      <div className="bg-dark rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
        <img
          src={image_url}
          alt={title}
          className="w-full object-cover"
        />
      </div>

      <div className="col-span-9">
          <h2 className="sm:text-xl font-bold font-title text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-10">
        <div className='row-span-2 font-title text-white text-xs font-bold justify-self-center py-12'>
          {date}
        </div>
      </div>

      <div className="col-span-9">
          <p className="sm:text-xl font-bold font-title text-white">{news}</p>
      </div>

      <div className="bg-dark rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
        <img
          src={image2_url}
          alt={title}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}

export default CardNewDetail;

