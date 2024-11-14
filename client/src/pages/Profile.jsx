// Profile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContextsss';
import CardsReviews from '../components/CardReviews';
import AdminPanel from '../components/AdminPanel';

const Profile = () => {
    const { user, isAdmin } = useAuth();  

    if (isAdmin()) {
        return <AdminPanel user={user} />;
    }

    return (
        <div className="min-h-screen bg-dark text-light font-title p-6 flex flex-col items-center mt-10">
        {/* Contenedor principal del perfil con imagen de fondo */}
        <div 
            className="relative bg-secondary rounded-lg shadow-lg w-full max-w-10xl text-center overflow-hidden flex items-center justify-center"
            style={{
                backgroundImage: "url('../src/assets/images/image.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100px', 
            }}
        >
            <h1 className="text-3xl font-bold text-light">MI PERFIL</h1>
        </div>

        <div className="w-full max-w-2xl mt-4 text-center">
            <p className="text-xl mb-4">
                Buen día, <span className="text-greenLight font-bold">{user.name}</span>
            </p>
            <Link to="/createReview">
                <button className="bg-greenLight hover:bg-green-700 text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out">
                    Crear reseña
                </button>
            </Link>
        </div>

        <div className="w-full max-w-2xl mt-8">
            <h2 className="text-2xl mb-4 text-center bg-greenDark text-light py-3 rounded-md font-semibold shadow-md">
                MIS REVIEWS
            </h2>
            <CardsReviews userId={user.id} />
        </div>
    </div>
);
};
export default Profile;
