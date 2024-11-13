import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import tanques from '../assets/img/tanques.svg';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos'); // Asegúrate de que la URL sea la correcta
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light">
  <div className="relative h-64 md:h-[100vh] h-11/12 mb-8">
    <img
      src={tanques}
      alt="Tanques"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-center h-full">
      <h1 className="text-3xl md:text-6xl font-bold text-white font-orbitron drop-shadow-lg">VIDEOS</h1>
    </div>
    
  </div>
  <div className="container mx-auto px-4 space-y-12 flex flex-col items-center">
    {videos.map((video) => (
      <div key={video.id} className="relative group max-w-4xl w-full">
        <div className="aspect-video relative">
          <a href={video.video_url} target="_blank" rel="noopener noreferrer">
            <img
              src={`http://localhost:3000/uploads/video/${video.thumbnail}`}
              alt={video.title}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Play className="w-24 h-24 text-white" />
            </div>
          </a>
        </div>
        <h2 className="mt-4 mb-6 text-2xl font-semibold">{video.title}</h2>
      </div>
    ))}
  </div>
</div>
  );
};

export default VideoGallery;

