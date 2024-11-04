import React, { useEffect, useState } from 'react';
import { getReviewsByUserId } from '../services/reviewServices'; // Supongamos que este servicio obtiene los reviews del usuario

const CardsReviews = ({ userId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const loadReviews = async () => {
            const userReviews = await getReviewsByUserId(userId); 
            setReviews(userReviews);
        };

        loadReviews();
    }, [userId]);

    return (
        <div className="space-y-4">
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id} className="bg-light p-4 rounded-md shadow-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{review.title}</h3>
                            <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm mt-2">{review.content}</p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400">No tienes reviews aún.</p>
            )}
        </div>
    );
};

export default CardsReviews;
