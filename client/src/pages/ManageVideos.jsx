import React, { useEffect, useState } from 'react';
import { Trash, Edit } from 'lucide-react'; // Iconos de editar y eliminar
import { useNavigate } from 'react-router-dom'; 

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [editVideo, setEditVideo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-light p-6 rounded shadow-lg text-center">
      <h2 className="text-lg font-semibold text-dark mb-4">¿Estás seguro de que quieres eliminar este video?</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600"
        >
          Eliminar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

  
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
        setVideos(videos.filter((video) => video.id !== id));
      } else {
        console.error('Error al eliminar el video');
      }
    } catch (error) {
      console.error('Error al eliminar el video:', error);
    }
  };

  const handleEdit = (video) => {
    setEditVideo(video);
    setIsEditing(true);
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
      setVideos(videos.map((video) => (video.id === updatedVideo.id ? data : video)));
      setIsEditing(false); 
      setEditVideo(null); 
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };


  const handleDeleteConfirm = () => {
    handleDelete(videoToDelete);
    setShowDeleteModal(false);
    setVideoToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setVideoToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark text-light">
        <div className="text-xl">Cargando videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark text-light">
        <div className="text-xl">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark text-light flex flex-col justify-between">
      <div 
        className="w-full h-32 md:h-40 bg-[url('../src/assets/img/pattern.png')] bg-repeat bg-center "
        style={{ backgroundSize: '80%' }}
      ></div>
      <div className="relative h-40 md:h-40 flex flex-col md:ml-6 md:items-start items-center justify-center mt-2 mb-1 text-center">
        <h1 className="text-3xl md:text-4xl  text-greenLight font-bold mb-2">Hola Admin!</h1>
        <h4 className="text-lg md:text-2xl text-light font-light">Administración de Vídeos</h4>
      </div>

      <div className="container bg-dark mx-auto px-4">
        {videos.length === 0 ? (
          <p className="text-center text-xl text-light">No hay videos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative group max-w-sm w-full bg-greenMid rounded-lg p-4 shadow-xl mx-auto"
              >
                <div className="aspect-video relative">
                  <img
                    src={`http://localhost:3000/uploads/video/${video.thumbnail}`}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-2 text-center"> 
                  <h2 className="text-2xl font-semibold">{video.title}</h2>
                  <p className="text-sm text-greenLight">{video.video_url}</p>
                </div>

                <div className="flex justify-around mt-4 space-x-4"> 
                  <button
                    onClick={() => handleEdit(video)}
                    className="bg-greenLight hover:bg-greenMidsec font-bold text-light p-2 rounded-lg flex items-center space-x-2"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => {
                      setVideoToDelete(video.id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-light p-2 rounded-lg flex items-center space-x-2"
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
          <div className="mt-8 md:mb-6 max-w-lg mx-auto bg-greenMid p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Editar Video</h2>
            <form
              onSubmit={(e) => {
              e.preventDefault();
              handleSave(editVideo); 
              }}
              >
    <div className="mb-4">
    <label className="block text-lg font-semibold text-light">Título</label>
    <input
      type="text"
      value={editVideo.title}
      onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
      className="w-full px-4 font-paragraph py-2 border rounded text-dark bg-light" 
    />
  </div>

  <div className="mb-4">
    <label className="block text-lg font-semibold text-light">URL del Video</label>
    <input
      type="text"
      value={editVideo.video_url}
      onChange={(e) => setEditVideo({ ...editVideo, video_url: e.target.value })}
      className="w-full px-4 py-2 border font-paragraph rounded text-dark bg-light" 
    />
  </div>

  <div className="mb-4">
    <label className="block text-lg font-semibold text-light">Imagen del Video (Thumbnail)</label>
    <input
      type="file"
      onChange={(e) => setEditVideo({ ...editVideo, thumbnail: e.target.files[0] })}
      className="w-full px-4 py-2 border font-paragraph rounded text-dark bg-light" 
    />
  </div>

  <button
    type="submit"
    className="bg-greenLight font-paragrap text-light px-4 py-2 rounded hover:bg-greenMidsec"
  >
    Guardar
  </button>
</form>

            <button
              onClick={() => {
                setIsEditing(false); 
                setEditVideo(null); 
              }}
              className="mt-4 bg-red-500 text-light px-4 py-2 rounded hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        )}
        {showDeleteModal && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ManageVideos;

