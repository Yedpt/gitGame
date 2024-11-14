import React, { useEffect, useState } from "react";
import { getReviewsByUserId, deleteReview, updateReview } from "../services/reviewServices"; 
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importamos los iconos de react-icons

const CardsReviews = ({ userId }) => { 
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null); 
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    if (userId) { 
      const loadReviews = async () => {
        try {
          const userReviews = await getReviewsByUserId(userId);
          setReviews(userReviews);
        } catch (error) {
          console.error("Error al cargar las reseñas:", error);
        }
      };
      loadReviews();
    }
  }, [userId]); 

  const handleEdit = (review) => {
    setEditingReview(review);
    setUpdatedTitle(review.title);
    setUpdatedContent(review.content);
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id)); 
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!updatedTitle || !updatedContent) return; 
    try {
      const updatedReview = { title: updatedTitle, content: updatedContent };
      await updateReview(editingReview.id, updatedReview);
      
      setReviews(reviews.map((review) => (review.id === editingReview.id ? { ...review, title: updatedTitle, content: updatedContent } : review)));
      
      setEditingReview(null);
      setUpdatedTitle('');
      setUpdatedContent('');
    } catch (error) {
      console.error("Error al guardar la reseña actualizada:", error);
    }
  };

  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="bg-light p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-dark font-bold">{review.title}</h3>
              <span className="text-sm text-greenMidsec">
                {/* Formateamos la fecha */}
                {new Date(review.published_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm mt-2">{review.content}</p>

            <div className="mt-2 flex gap-4">
              <button
                onClick={() => handleEdit(review)}
                className="text-greenLight hover:underline"
              >
                <FiEdit /> {/* Icono de editar */}
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="text-red-500 hover:underline"
              >
                <FiTrash2 /> {/* Icono de eliminar */}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No tienes reviews aún</p>
      )}

      {editingReview && (
        <div className="mt-4 p-4 bg-greenMid rounded-md shadow-md">
          <h4 className="text-xl text-light font-bold mb-2">Editar Reseña</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-greenLight">Título</label>
            <input
              type="text"
              className="w-full text-dark p-2 border rounded-md mt-2"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-greenLight">Reseña</label>
            <textarea
              className="w-full p-2 border rounded-md mt-2"
              value={updatedContent}
              onChange={(e) => updateReview(e.target.value)}
            />
          </div>
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default CardsReviews;
