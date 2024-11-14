import { React, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaHeart } from 'react-icons/fa';
import { addLikeToReview } from '../services/reviewServices';

const UserReviewCard = ({title, imageUrl, review, num_likes, author, bgColor }) => {

  const [expanded, setExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [likes, setLikes] = useState(num_likes || 0);

  const handleLike = async (reviewId) => {
    try {
      const updatedReview = await addLikeToReview(reviewId);
      setLikes(updatedReview.num_likes); 
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768); 
    };
  
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleReview = () => {
    setExpanded(!expanded);  
  };

  return (
    <div className={`${bgColor} relative w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 gap-2 rounded-lg shadow-lg mb-0`} onClick={toggleReview}>
      
      <div className={`flex-1 ${isSmallScreen ? 'w-full' : 'text-left'}`} onClick={isSmallScreen ? toggleReview : null}>
        <h3 className="md:text-3xl font-bold text-light font-title text-2xl md:text-left text-center drop-shadow-md mb-4 px-0">{title}</h3>
        {isSmallScreen ? (
          
          <Collapse isOpened={expanded}>
            <div>
              <p className="text-base font-paragraph md:text-lg  text-light mb-4">{review}</p>
            </div>
          </Collapse>
        ) : (
          <div>
            <p className="mt-2 mr-3 text-light font-paragraph">{review}</p>
            <p className="text-light font-bold my-4"><span className="text-dark">Autor:</span> {author}</p>
            <div className="flex items-center">
              <button onClick={() => handleLike(review.id)} className="mr-2 text-red-500 hover:text-red-700">
                <FaHeart />
              </button>
              <span className="text-light mr-9">{likes}</span>
            </div>
          </div>
        )}
      </div>

      
      <div className={`${isSmallScreen ? 'w-full rounded-lg mt-4' : 'lg:w-1/2'}`}>
        <img src={imageUrl} alt={title} className="rounded-lg w-full drop-shadow-md h-auto object-cover" />
      </div>

      {isSmallScreen && (
        <div className="flex justify-start items-center mt-3 w-full">
          <button onClick={() => handleLike(review.id)} className="mr-2 text-red-500 hover:text-red-700">
            <FaHeart className='text-red-500' />
          </button>
          <span className="text-light mr-9">{likes}</span>
          <p className="text-light font-bold my-4"><span className="text-dark">Autor:</span> {author}</p>
        </div>
      )}
    </div>
  );
};

export default UserReviewCard;
