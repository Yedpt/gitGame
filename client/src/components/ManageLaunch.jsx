import { useState, useEffect, useContext } from 'react';
import { getAllReleases, deleteRelease } from '../services/releasesServices';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import CardLaunch from './CardLaunch';

const ManageLaunch = () => {
    const [releases, setReleases] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        loadReleases();
    }, []);

    const loadReleases = async () => {
        try {
            const data = await getAllReleases();
            setReleases(data);
        } catch (error) {
            console.error('Error loading releases:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este lanzamiento?')) {
            try {
                await deleteRelease(id);
                loadReleases();
            } catch (error) {
                console.error('Error deleting release:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Gestionar Lanzamientos</h2>
                    <Link 
                        to="/create-launch" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Crear Nuevo Lanzamiento
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {releases.map((release) => (
                        <CardLaunch 
                            key={release.id}
                            release={release}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageLaunch;
