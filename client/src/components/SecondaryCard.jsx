import React from 'react';
import { Link } from 'react-router-dom';

const SecondaryCard = ({ image_url, title, id }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-1">
      <div className="inset-0 flex flex-col justify-end p-4 bg-greenMid bg-opacity-50 h-28 rounded-lg md:hidden">
        <h3 className="text-xs md:text-l font-bold mb-2 font-title text-white overflow-hidden">{title}</h3>
        <div className='col-span-9' >
          <Link to={`/newsdetails/${id}`}>
            <button className='font-title text-white text-xs font-bold '>LEER MÁS</button>
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative h-full space-x-36 rounded-lg">
        <img
          src={image_url}
          alt={title}
          className="w-full h-28 object-cover"
        />
      </div>
      <div className="md:p-2 md:bg-opacity-50 md:rounded-lg hidden md:inline">
        <h3 className="md:text-l  md:font-title md:text-white ">{title}</h3>
        <div className='' >
          <Link to={`/newsdetails/${id}`}>
            <button className='md:font-title md:text-white md:text-xs md:font-bold '>LEER MÁS</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecondaryCard;