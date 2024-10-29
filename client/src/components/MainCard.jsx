import React from 'react';
import blackops from '../assets/img/blackops.svg';
import { Link } from 'react-router-dom';

const MainCard = ({id}) => {
  return (
    <div >
      <div className="bg-dark rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative">
        <img
          src={blackops}
          alt="Call of Duty"
          className="w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-10">
      <div className='row-span-2 rotate-[270deg] font-title text-white text-xs font-bold justify-self-center py-12'>
        16/10/2024
      </div>

      <div className='col-span-9' >
        <Link to={`/newsdetails/${id}`}>
        <button className='font-title text-white rounded-md bg-greenMid px-1 py-1 text-sm font-bold my-4'>LEER MÁS</button>
        </Link>
      </div>

      <div className="col-span-9">
        <h2 className="sm:text-xl font-bold font-title text-white">El nuevo Call of Duty vuelve a sus orígenes</h2>
      </div>

      </div>

    </div>
  );
}

export default MainCard;

