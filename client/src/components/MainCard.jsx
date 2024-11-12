import React from 'react';
import { Link } from 'react-router-dom';

const MainCard = ({ title, image_url, date, id }) => {

  return (
    <div >
      <div className="bg-dark rounded-lg  overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
        <img
          src={image_url}
          alt={title}
          className="w-full md:rounded-lg object-cover"
        />
      </div>

      <div className=" bg-gradient-to-b from-dark to-greenMid rounded-b-lg grid grid-cols-10">
        <div className='row-span-2 rotate-[270deg] font-title text-greenMidsec text-xs font-semibold justify-self-center mt-10 py-12'>
          {date}
        </div>
        <div className='col-span-9' >
          <Link to={`/newsdetails/${id}`}>
            <button className='font-title text-light rounded-md bg-greenMid p-1 text-sm font-bold my-4 '>LEER MÁS</button>
          </Link>
        </div>
        <div className="col-span-8">
          <h2 className="md:text-lg mb-4 font-bold font-title text-light">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default MainCard;

