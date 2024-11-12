import React from 'react';
import { Link } from 'react-router-dom';

const SecondaryCard = ({ image_url, title, id }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-1">
      <div className="inset-0 flex flex-col justify-end p-4 bg-greenMid h-28 rounded-l-lg md:hidden">
        <h3 className="text-xs md:text-l font-bold mb-2 font-title text-light overflow-hidden">{title}</h3>
        <div className='col-span-9' >
          <Link to={`/newsdetails/${id}`}>
            <button className='font-title text-greenLight text-xs font-bold '>LEER MÁS</button>
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative h-full space-x-36 rounded-r-lg md:rounded-lg">
        <img
          src={image_url}
          alt={title}
          className="w-full h-28  object-cover"
        />
      </div>
      <div className="md:p-2 md:bg-gradient-to-t from-greenDark to-greenMidsec bg-opacity-30 md:bg-opacity-30 md:rounded-lg hidden md:inline">
        <h3 className="md:text-lg md:mt-4 md:font-semibold md:font-title md:text-light ">{title}</h3>
        <div className='' >
          <Link to={`/newsdetails/${id}`}>
            <button className='md:font-title hover:text-light md:text-greenLight  md:text-xs md:font-bold '>LEER MÁS</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecondaryCard;