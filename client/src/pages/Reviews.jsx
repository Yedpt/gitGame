import React, { useState, useEffect, useRef } from 'react';
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

  const adminReviewsRef = useRef(null);
  const userReviewsRef = useRef(null);

  const paginatedAdminReviews = adminReviews.slice(
    (adminPage - 1) * reviewsPerPage,
    adminPage * reviewsPerPage
  );

  const paginatedUserReviews = userReviews.slice(
    (userPage - 1) * reviewsPerPage,
    userPage * reviewsPerPage
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchAdminReviews = async (page) => {
    try {
      const response = await getAllReviewsAdmin();
      setAdminReviews(response.data);
    } catch (error) {
      console.error("Error al obtener reseñas de admin:", error);
    }
  };

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
    const response = await fetch(`/api/reviews/${reviewId}/like`, { method: 'PATCH' });
    const updatedReview = await response.json();
    userReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  const handlePageChange = (page, isAdmin = true) => {
    if (isAdmin) {
      setAdminPage(page);
      adminReviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setUserPage(page);
      userReviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-dark">
      <div className="relative h-full md:h-full h-11/12 mb-8">
        <img src={portada} alt="Portada" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-6xl font-bold text-white font-orbitron drop-shadow-lg">RESEÑAS</h1>
        </div>
      </div>

      <div className="container mx-auto p-4" ref={adminReviewsRef}>
        <h2 className="text-2xl md:text-4xl text-greenLight font-bold pt-10 mb-4">ÚLTIMAS RESEÑAS</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          {paginatedAdminReviews.map((review, index) => (
            <AdminReviewCard
              key={review.id}
              id={review.id}
              title={review.title}
              review={review.review}
              imageUrl={`http://localhost:3000${review.image_url}`}
              author={review.author}
              rating={review.rating}
              num_likes={review.num_likes}
              bgColor={index % 2 === 0 ? 'bg-greenMidsec' : 'bg-greenMid'}
            />
          ))}
        </div>
        <Pagination 
          currentPage={adminPage} 
          totalPages={Math.ceil(adminReviews.length / reviewsPerPage)} 
          onPageChange={(page) => handlePageChange(page, true)} 
        />
      </div>
      
      <div className="container bg-greenDark mx-auto p-4" ref={userReviewsRef}>
        <h2 className="text-2xl md:text-4xl text-greenLight font-bold pt-10 mb-4">VALORACIONES DE USUARIOS</h2>
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
        <Pagination 
          currentPage={userPage} 
          totalPages={Math.ceil(userReviews.length / reviewsPerPage)} 
          onPageChange={(page) => handlePageChange(page, false)} 
        />
      </div>
    </div>
  );
};

export default ReviewsPage;
