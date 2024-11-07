import React, { useEffect, useState } from 'react';
import { Trash, Edit } from 'lucide-react'; // Iconos de editar y eliminar
import { useNavigate } from 'react-router-dom'; // Para redirigir a la página de edición (no necesario si todo es en la misma página)

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Para saber si estamos editando
  const [editVideo, setEditVideo] = useState(null); // Video que estamos editando

  // Cargar los videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos');
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/videos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Eliminar el video del estado sin recargar la página
        setVideos(videos.filter((video) => video.id !== id));
      } else {
        console.error('Error al eliminar el video');
      }
    } catch (error) {
      console.error('Error al eliminar el video:', error);
    }
  };

  const handleEdit = (video) => {
    setEditVideo(video); // Asignamos el video a editar
    setIsEditing(true); // Mostramos el formulario de edición
  };

  const handleSave = async (updatedVideo) => {
    try {
      const response = await fetch(`http://localhost:3000/api/videos/${updatedVideo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideo),
      });
      const data = await response.json();
      setVideos(videos.map((video) => (video.id === updatedVideo.id ? data : video))); // Actualizamos el video en el listado
      setIsEditing(false); // Cerrar el formulario de edición
      setEditVideo(null); // Limpiar el video editado
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2D342D] text-white">
        <div className="text-xl">Cargando videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2D342D] text-white">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D342D] text-white font-title">
      <div className="relative h-[30vh] mb-8">
        <div className="absolute inset-x-0 top-0 p-4 pt-24 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white font-orbitron drop-shadow-lg">
            Administracion de Videos
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-12">
        {videos.length === 0 ? (
          <p className="text-center text-xl text-white">No hay videos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative group max-w-sm w-full bg-[#1F262F] rounded-lg p-4 shadow-xl"
              >
                <div className="aspect-video relative">
                  <img
                    src={`http://localhost:3000/uploads/video/${video.thumbnail}`}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-2 text-center"> {/* Reducido el margen superior */}
                  <h2 className="text-2xl font-semibold">{video.title}</h2>
                  <p className="text-sm text-gray-300">{video.video_url}</p>
                </div>

                <div className="flex justify-around mt-4 space-x-4"> {/* Añadido espacio entre los botones */}
                  <button
                    onClick={() => handleEdit(video)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center space-x-2"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDelete(video.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center space-x-2"
                  >
                    <Trash className="w-5 h-5" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulario de edición que se muestra cuando isEditing es true */}
        {isEditing && (
          <div className="mt-8 max-w-lg mx-auto bg-[#1F262F] p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Editar Video</h2>
            <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSave(editVideo); // Guardar los cambios al hacer submit
  }}
>
  <div className="mb-4">
    <label className="block text-sm font-semibold text-white">Título</label>
    <input
      type="text"
      value={editVideo.title}
      onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
      className="w-full px-4 py-2 border rounded text-black bg-white" // Cambié el color de texto a negro y el fondo a blanco
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-semibold text-white">URL del Video</label>
    <input
      type="text"
      value={editVideo.video_url}
      onChange={(e) => setEditVideo({ ...editVideo, video_url: e.target.value })}
      className="w-full px-4 py-2 border rounded text-black bg-white" // Cambié el color de texto a negro y el fondo a blanco
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-semibold text-white">Imagen del Video (Thumbnail)</label>
    <input
      type="file"
      onChange={(e) => setEditVideo({ ...editVideo, thumbnail: e.target.files[0] })}
      className="w-full px-4 py-2 border rounded text-black bg-white" // Cambié el color de texto a negro y el fondo a blanco
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Guardar
  </button>
</form>

            <button
              onClick={() => {
                setIsEditing(false); // Cerrar el formulario de edición
                setEditVideo(null); // Limpiar el video en edición
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVideos;

