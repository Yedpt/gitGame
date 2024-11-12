import { React, useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Collapse } from 'react-collapse';

const AdminReviewCard = ({ title, imageUrl, review, rating, author, bgColor }) => {

    const [expanded, setExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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
                <p className="text-light md:text-left text-center font-bold my-3"><span className="text-dark">Autor:</span> {author}</p>
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
