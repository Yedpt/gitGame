import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import CardsReviews from '../components/CardReviews';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-dark text-light font-title p-6 flex flex-col items-center">
            <div className="bg-secondary rounded-md w-full max-w-md p-4 text-center">
                <h1 className="text-3xl mb-4">MI PERFIL</h1>
                <p className="text-xl">Buen día, <span className="text-greenLight font-bold">{user.name}</span></p>
                <Link to="/createReview">
                    <button className="bg-greenLight text-dark py-2 px-4 rounded mt-6 font-bold">Crear review</button>
                </Link>
            </div>

            <div className="w-full max-w-md mt-8">
                <h2 className="text-2xl mb-4 text-center bg-greenDark rounded-md py-2">MIS REVIEWS</h2>
                <CardsReviews userId={user.id} />
            </div>
        </div>
    );
};

export default Profile;
