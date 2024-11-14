import { React, useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaHeart } from 'react-icons/fa';
import { Collapse } from 'react-collapse';
import { useAuth } from '../context/authContextsss';
import { getOneReview, incrementLike } from '../services/reviewServices';

const AdminReviewCard = ({ id, num_likes, title, imageUrl, review, rating, author, bgColor }) => {
    const { user } = useAuth(); // Obtén el usuario del contexto
    const [report, setReport] = useState([]);
    const [numLikes, setNumLikes] = useState(num_likes);
    const [expanded, setExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        if (user && user.id) {
            const loadReviews = async () => {
                try {
                    const userReviews = await getOneReview(id);
                    setReport(userReviews);
                } catch (error) {
                    console.error('Error al cargar las noticias', error);
                }
            };
            loadReviews();
        }
    }, [user]);

    const handleIncrementLike = async () => {
        try {
            const updatedReview = await incrementLike(id, user.id);
            setNumLikes(updatedReview.num_likes);
        } catch (error) {
            console.error('Error al actualizar el número de likes', error);
        }
    };


    // Detectar tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Cambia a true para pantallas pequeñas
        };

        // Escuchar cambios de tamaño de pantalla
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleReview = () => {
        setExpanded(!expanded);  // Alternar estado "expanded"
    };

    return (
        <div className={`${bgColor} relative w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 gap-2 rounded-lg shadow-lg mb-0`} onClick={toggleReview}>
            {/* Contenedor izquierdo con título y descripción */}
            <div className={`flex-1 ${isSmallScreen ? 'w-full' : 'text-left'}`} onClick={isSmallScreen ? toggleReview : null}>
                <h3 className="md:text-3xl font-bold text-light font-title text-2xl md:text-left text-center mb-4 px-0">{title}</h3>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-light md:text-left text-center font-bold my-3"><span className="text-dark">Autor:</span> {author}</p>

                    <button
                        onClick={() => handleIncrementLike()}
                        className="text-light flex items-center space-x-2 mr-10"
                        title="like"
                    >
                        <FaHeart />
                        <span>{numLikes}</span>
                    </button>
                </div>
                {isSmallScreen ? (
                    // Collapse solo en pantallas pequeñas
                    <Collapse isOpened={expanded}>
                        <div>
                            <p className="text-base font-paragraph md:text-lg text-light mb-4">{review}</p>

                            <div className="flex mt-2">
                                {[...Array(5)].map((_, i) => (
                                    i < rating ? <FaStar key={i} className="text-light" /> : <FaRegStar key={i} className="text-light" />
                                ))}
                            </div>
                        </div>
                    </Collapse>
                ) : (
                    // En pantallas grandes, mostrar todo
                    <div>
                        <p className="mt-2 text-light font-paragraph">{review}</p>

                        <div className="flex mt-2">
                            {[...Array(5)].map((_, i) => (
                                i < rating ? <FaStar key={i} className="text-light" /> : <FaRegStar key={i} className="text-light" />
                            ))}
                        </div>

                    </div>
                )}
            </div>

            {/* Contenedor derecho con imagen */}
            <div className={`${isSmallScreen ? 'w-full rounded-lg mt-4' : 'lg:w-1/2'}`}>
                <img src={imageUrl} alt={title} className=" rounded-lg w-full h-auto drop-shadow-md object-cover" />
            </div>
        </div>
    );
};

export default AdminReviewCard;
