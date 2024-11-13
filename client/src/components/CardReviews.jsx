import React, { useEffect, useState } from "react";
import { getReviewsByUserId, deleteReview, updateReview } from "../services/reviewServices"; 
import { useAuth } from "../context/authContextsss";

const CardsReviews = () => {
  const { user } = useAuth(); // Obtén el usuario del contexto
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null); // Para manejar el estado de la reseña en edición
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    if (user && user.id) {
      const loadReviews = async () => {
        try {
          const userReviews = await getReviewsByUserId(user.id);
          setReviews(userReviews);
        } catch (error) {
          console.error("Error al cargar las reseñas:", error);
        }
      };
      loadReviews();
    }
  }, [user]);

  const handleEdit = (review) => {
    setEditingReview(review);
    setUpdatedTitle(review.title);
    setUpdatedContent(review.content);
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id)); // Elimina la reseña de la lista localmente
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!updatedTitle || !updatedContent) return; // Validación básica
    try {
      const updatedReview = { title: updatedTitle, content: updatedContent };
      await updateReview(editingReview.id, updatedReview);
      
      // Actualiza la reseña en la lista localmente
      setReviews(reviews.map((review) => (review.id === editingReview.id ? { ...review, title: updatedTitle, content: updatedContent } : review)));
      
      // Resetea el estado de edición
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
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-sm mt-2">{review.content}</p>

            {user && user.role === "usuario" && (
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-blue-500 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No tienes reviews aún</p>
      )}

      {/* Formulario de edición */}
      {editingReview && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
          <h4 className="text-xl font-bold mb-2">Editar Reseña</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-2"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Reseña</label>
            <textarea
              className="w-full p-2 border rounded-md mt-2"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
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
