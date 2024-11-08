import { useState, useState} from 'react';
import { createRelease } from '../services/releasesServices';
import { useNavigate } from 'react-router-dom';

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
        <div className="create-launch-container">
            <h2>Create New Launch</h2>
            <form onSubmit={handleSubmit} className="launch-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="relese_date">Release Date:</label>
                    <input
                        type="date"
                        id="relese_date"
                        name="relese_date"
                        value={formData.relese_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Rating</option>
                        <option value="E">E (Everyone)</option>
                        <option value="T">T (Teen)</option>
                        <option value="M">M (Mature)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="month">Month:</label>
                    <select
                        id="month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Create Launch</button>
            </form>
        </div>
    );
};

export default CreateLaunch;
