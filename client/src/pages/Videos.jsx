import React from 'react';
import { Play } from 'lucide-react';
import tanques from '../assets/img/tanques.svg';

const videos = [
  {
    id: '1',
    title: 'Trailer 2 GTA VI',
    thumbnail: 'https://i.ytimg.com/vi/HocCuileO8A/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=parzULurQg8',
  },
  {
    id: '2',
    title: 'Trailer nueva temporada Fornite',
    thumbnail: 'https://impulsogeek.com/wp-content/uploads/2024/10/Fortnitemares-2024-Key-Art_ES-MX.webp',
    link: 'https://www.youtube.com/watch?v=pryHqh0_nfo',
  },
];

const VideoGallery = () => {
  return (
    <div className="min-h-screen bg-[#2D342D] text-white font-title">
      <div className="relative h-[100vh] mb-8">
        <img
          src={tanques}
          alt="Tanques"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 p-4 pt-24 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white font-orbitron drop-shadow-lg">VIDEOS</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 space-y-12 flex flex-col items-center">
        {videos.map((video) => (
          <div key={video.id} className="relative group max-w-4xl w-full">
            <div className="aspect-video relative">
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-24 h-24 text-white" />
                </div>
              </a>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{video.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
