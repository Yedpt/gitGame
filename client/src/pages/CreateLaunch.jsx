import React from 'react'
import { useState, useEffect} from 'react';
import { createRelease } from '../services/releasesServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContextsss';

const CreateLaunch = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        relese_date: '',
        rating: '',
        month: '',
        user_id: 1, // Default user_id or get from auth context
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submitFormData = new FormData();
        submitFormData.append('image_url', image);
        
        // Append other form data
        Object.keys(formData).forEach(key => {
            submitFormData.append(key, formData[key]);
        });

        try {
            await createRelease(submitFormData);
            navigate('/releases'); // Adjust route as needed
        } catch (error) {
            console.error('Error creating launch:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-green-900 p-8 rounded-lg shadow-lg">
    <h2 className="text-center text-white text-2xl font-bold mb-6">CREA UNA NOTICIA</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="flex flex-col">
            <label htmlFor="title" className="text-green-400 font-semibold mb-2">TÍTULO</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="p-2 rounded bg-green-800 border border-green-600 text-white"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="relese_date" className="text-green-400 font-semibold mb-2">DETALLE</label>
            <textarea
                id="relese_date"
                name="relese_date"
                value={formData.relese_date}
                onChange={handleChange}
                required
                className="p-2 rounded bg-green-800 border border-green-600 text-white"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="image" className="text-green-400 font-semibold mb-2">IMAGEN PRINCIPAL</label>
            <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="p-2 rounded bg-green-800 border border-green-600 text-white"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="image_secondary" className="text-green-400 font-semibold mb-2">IMAGEN SECUNDARIA</label>
            <input
                type="file"
                id="image_secondary"
                name="image_secondary"
                onChange={handleImageChange}
                accept="image/*"
                className="p-2 rounded bg-green-800 border border-green-600 text-white"
            />
        </div>

        <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
        >
            Enviar
        </button>
    </form>
</div>
)};


export default CreateLaunch;



// Esto es para los proximos lanzamientos.