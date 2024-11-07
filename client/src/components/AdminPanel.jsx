// AdminPanel.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = ({ user }) => {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (card) => {
        setExpandedCard(expandedCard === card ? null : card);
    };

    return (
        <div className="min-h-screen bg-dark text-light font-title p-6 flex flex-col items-center mt-10"> {/* Espaciado debajo del navbar */}
        {/* Contenedor del título de Admin con imagen de fondo */}
        <div 
            className="relative bg-secondary rounded-lg shadow-lg w-full max-w-10xl text-center overflow-hidden flex items-center justify-center"
            style={{
                backgroundImage: `url('../src/assets/images/image.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100px', // Ajusta la altura según tus necesidades
            }}
        >
            <h1 className="text-3xl font-bold text-light">ADMIN</h1>
        </div>

        <div className="w-full max-w-md mt-4 flex flex-col gap-4">
            {/* Carta de Usuarios */}
            <div className="bg-green-700 p-4 rounded-md cursor-pointer shadow-md" onClick={() => toggleCard('usuarios')}>
                <h2 className="text-xl text-center text-light font-semibold">USUARIOS</h2>
                {expandedCard === 'usuarios' && (
                    <div className="mt-4">
                        <Link to="/manageusers">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded mb-2 w-full">Administrar Usuarios</button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Carta de Noticias */}
            <div className="bg-green-800 p-4 rounded-md cursor-pointer shadow-md" onClick={() => toggleCard('noticias')}>
                <h2 className="text-xl text-center text-light font-semibold">NOTICIAS</h2>
                {expandedCard === 'noticias' && (
                    <div className="mt-4">
                         <Link to="/createnews">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded mb-2 w-full">Crear una noticia</button>
                        </Link>
                        <Link to="/managenews">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded mb-2 w-full">Administrar Noticias</button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Carta de Reviews */}
            <div className="bg-green-700 p-4 rounded-md cursor-pointer shadow-md" onClick={() => toggleCard('reviews')}>
                <h2 className="text-xl text-center text-light font-semibold">REVIEWS</h2>
                {expandedCard === 'reviews' && (
                    <div className="mt-4 flex flex-col gap-2">
                        <Link to="/createreview">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded w-full">Crear Review</button>
                        </Link>
                        <Link to="/managereviews">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded w-full">Administrar Reviews</button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Carta de Lanzamientos */}
            <div className="bg-green-800 p-4 rounded-md cursor-pointer shadow-md" onClick={() => toggleCard('lanzamientos')}>
                <h2 className="text-xl text-center text-light font-semibold">LANZAMIENTOS</h2>
                {expandedCard === 'lanzamientos' && (
                    <div className="mt-4 flex flex-col gap-2">
                        <Link to="/createlaunch">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded w-full">Crear Lanzamiento</button>
                        </Link>
                        <Link to="/managelaunches">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded w-full">Administrar Lanzamientos</button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Carta de Videos */}
            <div className="bg-green-700 p-4 rounded-md cursor-pointer shadow-md" onClick={() => toggleCard('videos')}>
                <h2 className="text-xl text-center text-light font-semibold">VIDEOS</h2>
                {expandedCard === 'videos' && (
                    <div className="mt-4">
                         <Link to="/createvideos">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded w-full">Crear Video</button>
                        </Link>
                        <Link to="/managevideos">
                            <button className="bg-green-500 text-dark py-2 px-4 rounded w-full">Administrar Videos</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </div>
);
};

export default AdminPanel;
