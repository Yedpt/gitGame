import React, { useState, useEffect } from 'react';
import AdminReviewCard from '../components/AdminReviewCard';
import portada from '../assets/img/reviewsportada.svg';
import UserReviewCard from '../components/UserReviewCard';
import Pagination from '../components/Pagination';
import { getAllReviewsAdmin, getAllReviewsUser } from '../services/reviewServices';
import { useAuth } from '../context/authContextsss';
import { useNavigate } from 'react-router-dom';

const ReviewsPage = () => {
  const [adminReviews, setAdminReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [adminPage, setAdminPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const reviewsPerPage = 2;

  // Obtener solo las reseñas para la página actual
  const paginatedAdminReviews = adminReviews.slice(
    (adminPage - 1) * reviewsPerPage,
    adminPage * reviewsPerPage
  );

  const paginatedUserReviews = userReviews.slice(
    (userPage - 1) * reviewsPerPage,
    userPage * reviewsPerPage
  );

  useEffect(() => {
    // Redirige solo si `isAuthenticated` se ha inicializado y es `false`
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Función para obtener las reseñas de los admins
  const fetchAdminReviews = async (page) => {
    try {
      const response = await getAllReviewsAdmin();
      setAdminReviews(response.data);
    } catch (error) {
      console.error("Error al obtener reseñas de admin:", error);
    }
  };

  // Función para obtener las reseñas de los usuarios
  const fetchUserReviews = async (page) => {
    try {
      const response = await getAllReviewsUser();
      setUserReviews(response.data);
    } catch (error) {
      console.error("Error al obtener reseñas de usuario:", error);
    }
  };

  useEffect(() => {
    fetchAdminReviews(adminPage);
    fetchUserReviews(userPage);
  }, [adminPage, userPage]);
  

  const handleLike = async (reviewId) => {
    const response = await fetch(`/api/reviews/${reviewId}/like`, { method: 'POST' });
    const updatedReview = await response.json();
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-dark">
      {/* Sección de portada con "RESEÑAS" centrado */}
      <div className="relative w-full">
        <img 
          src={portada} 
          alt="portada"
          className="w-full h-5/6 object-cover opacity-80" 
        />
        <h1 className="absolute inset-0 flex items-center justify-center z-20 text-white text-5xl md:text-6xl font-bold font-title pointer-events-none">
          RESEÑAS
        </h1>
      </div>

      {/* Contenido de las reseñas */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl md:text-4xl text-light font-bold pt-10 mb-4">ÚLTIMAS RESEÑAS</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          {paginatedAdminReviews.map((review, index) => (
            <AdminReviewCard
              key={review.id}
              title={review.title}
              review={review.review}
              imageUrl={`http://localhost:3000${review.image_url}`}
              author={review.author}
              rating={review.rating}
              bgColor={index % 2 === 0 ? 'bg-greenMidsec' : 'bg-greenMid'}
            />
          ))}
        </div>
        <Pagination 
          currentPage={adminPage} 
          totalPages={Math.ceil(adminReviews.length / reviewsPerPage)} 
          onPageChange={setAdminPage} 
        />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl md:text-4xl text-light font-bold pt-10 mb-4">ÚLTIMAS RESEÑAS DE USUARIOS</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          {paginatedUserReviews.map((review, index) => (
            <UserReviewCard
              key={review.id}
              title={review.title}
              imageUrl={`http://localhost:3000${review.image_url}`}
              review={review.review}
              num_likes={review.num_likes}
              author={review.author}
              onLike={() => handleLike(review.id)}
              bgColor={index % 2 === 0 ? 'bg-greenMidsec' : 'bg-greenMid'}
            />
          ))}
        </div>
      </div>
        <Pagination 
          currentPage={userPage} 
          totalPages={Math.ceil(userReviews.length / reviewsPerPage)} 
          onPageChange={setUserPage} 
        />
      </div>
    </div>
  );
};

export default ReviewsPage;