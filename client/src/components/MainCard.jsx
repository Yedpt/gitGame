import React from 'react';
import { Link } from 'react-router-dom';

const MainCard = ({ url, id_new, title }) => {
  return (
    <div>
      <div className="w-[330px] h-[348px]  flex items-center justify-center">
        <img className="w-[280px] h-[310px] ml-0.5" src={url} alt="new game" />
      </div>
      <Link to={`/newsdetails/${id_new}`}>
        <button>LEER MÁS</button>
      </Link>
      <p>{title}</p>
    </div>
  )
}

export default MainCard
