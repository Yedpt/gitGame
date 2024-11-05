import React, { useEffect, useState } from 'react';
import { getReviewsByUserId } from '../services/reviewServices'; // Supongamos que este servicio obtiene los reviews del usuario
import { useAuth } from '../context/authContextsss';


const CardsReviews = () => {
    const { user } = useAuth(); // Obtén el usuario del contexto
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            const loadReviews = async () => {
                try {
                    const userReviews = await getReviewsByUserId(user.id);
                    setReviews(userReviews);
                } catch (error) {
                    console.error('Error al cargar las reseñas:', error);
                }
            };
            loadReviews();
        }
    }, [user]);

    return (
        <div className="space-y-4">
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id} className="bg-light p-4 rounded-md shadow-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl text-dark font-bold">{review.title}</h3>
                            <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm mt-2">{review.content}</p>
                        {/* Ejemplo de cómo podrías mostrar un botón para editar o eliminar si el usuario es admin */}
                        {user && user.role === 'admin' && (
                            <button className="mt-2 text-blue-500 hover:underline">
                                Editar
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400">No tienes reviews aún</p>
            )}
        </div>
    );
};

export default CardsReviews;
