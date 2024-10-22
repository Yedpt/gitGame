import React from 'react';

const SecondaryCard = ({ imageSrc, title, altText }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative h-full">
      <img 
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
        <h3 className="text-xl font-bold mb-2 font-title text-white">{title}</h3>
      </div>
    </div>
  );
};

export default SecondaryCard;