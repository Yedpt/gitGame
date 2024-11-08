import { React, useEffect, useState } from 'react';
import { getAllReviews, deleteReview, getOneReview, updateReview } from '../services/reviewServices';
import { useAuth } from '../context/authContextsss'; 
import { useNavigate, Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";
import { useForm } from "react-hook-form";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all'); 
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editReview, setEditReview] = useState(null);

  const {register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error al cargar las reseñas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error('Error al eliminar la reseña:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredReviews = reviews
    .filter((review) => 
      (filterRole === 'all' || review.rol === filterRole) &&
      (review.title.toLowerCase().includes(searchQuery) ||
       review.review.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const order = sortConfig.direction === 'ascending' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
      }
      return 0;
    });

    // Rellenar formulario con datos de la reseña seleccionada
    const handleEdit = async (review) => {
      setEditReview(review);
      setValue('title', review.title);
      setValue('review', review.review);
      setValue('rating', review.rating);
      setValue('image', review.image);
      setValue('author', review.author);
      setValue('num_likes', review.num_likes);
      setValue('productId', review.productId);
    };

    // Actualizar reseña
    const onSubmit = async (data) => {
      try {
        if (editReview) {
          await updateReview(editReview.id, data);
          setEditReview(null);
          fetchReviews(); // Refrescar la lista de reseñas
          reset(); // Limpiar formulario
        }
      } catch (error) {
        console.error('Error al actualizar la reseña:', error);
      }
    };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-dark">
    <div className="container mx-auto p-4 flex-grow">
      <div className="pt-10">
        <h1 className="text-4xl text-greenLight font-bold mb-4 py-8">Hola Admin!</h1>
        <h4 className="text-2xl text-light font-light mb-4 py-0">Ve la información de todas las reseñas</h4>
      </div>
      {/* Botones de búsqueda, filtro y añadir */}
      <div className="flex flex-wrap items-center gap-2 mb-6 justify-between">
        <Link to="/createReview">
          <button className="flex items-center gap-3 p-2 bg-greenLight hover:bg-green-700 hover:text-light text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out ">
            <IoIosAddCircle className="h-4 w-4 text-greenMid " />
            Añadir Reseña
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <FaSearch className="flex flex-grow items-center gap-2 max-w-xs text-light h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <select 
          className="border border-gray-300 rounded-md px-2 py-1"
          value={filterRole}
          onChange={handleFilterChange}
        >
          <option value="all">Todos</option>
          <option value="admin">Admin</option>
          <option value="usuario">Usuario</option>
        </select>
      </div>
      {/* Tabla responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-light border border-greenMid rounded-md shadow-md">
          <thead>
            <tr>
              {[
                { label: 'ID', key: 'id' },
                { label: 'User ID', key: 'user_id' },
                { label: 'Rol', key: 'rol' },
                { label: 'Title', key: 'title' },
                { label: 'Published', key: 'published_at' },
                { label: 'Updated', key: 'updated_at' },
                { label: 'Likes', key: 'num_likes' },
                { label: 'Author', key: 'author' },
                { label: 'Rating', key: 'rating' }
              ].map((column) => (
                <th key={column.key} className="px-4 py-2 border font-bold border-gray-200 bg-gray-100 cursor-pointer"
                    onClick={() => handleSort(column.key)}>
                  {column.label}
                  <LuChevronsUpDown className="inline-block ml-1" />
                </th>
              ))}
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Review</th>
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Image</th>
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Manage</th>
            </tr>
          </thead>
          <tbody className="font-paragraph border font-thin">
            {sortedAndFilteredReviews.map((review) => (
              <tr key={review.id}>
                <td className="px-4 py-2 border border-gray-200 text-center">{review.id}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{review.user_id}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{review.rol}</td>
                <td className="px-4 py-2 border border-gray-200">{review.title}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{new Date(review.published_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{new Date(review.updated_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{review.num_likes}</td>
                <td className="px-4 py-2 border border-gray-200">{review.author}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{review.rating}</td>
                <td className="px-4 py-2 border border-gray-200 w-96">
                  <Collapse isOpened={expandedRows[review.id]}>
                    {review.review}
                  </Collapse>
                  <button
                    className="text-greenLight underline"
                    onClick={() => toggleRow(review.id)}
                  >
                    {expandedRows[review.id] ? 'Ver menos' : 'Ver más'}
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <img
                    src={`http://localhost:3000${review.image_url}`}
                    alt="Thumbnail"
                    className="w-12 h-12 object-cover rounded-3xl"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-greenLight"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-500"
                    title="Eliminar"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* * Modal para editar reseña */}
      {editReview && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded-md shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Editando Reseña ID: {editReview.id}</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Título</label>
            <input
              type="text"
              className="border border-gray-300 font-paragraph rounded-md px-2 py-1 w-full"
              {...register('title', { required: true })}
            />
            {errors.title && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Autor</label>
            <input
              type="text"
              className="border border-gray-300 font-paragraph rounded-md px-2 py-1 w-full"
              {...register('author', { required: true })}
            />
            {errors.author && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Likes</label>
            <input
              type="number"
              className="border border-gray-300  font-paragraph rounded-md px-2 py-1 w-full"
              {...register('num_likes', { required: true })}
            />
            {errors.num_likes && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Rating</label>
            <input
              type="number"
              className="border border-gray-300 font-paragraph rounded-md px-2 py-1 w-full"
              {...register('rating', { required: true, min: 1, max: 5 })}
            />
            {errors.rating && <span className="text-red-500">Este campo es requerido y debe estar entre 1 y 5</span>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Reseña</label>
            <textarea
              className="border border-gray-300 rounded-md font-paragraph px-2 py-1 w-full"
              {...register('review', { required: true })}
            />
            {errors.review && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <button
            type="submit"
            className="bg-greenMidsec hover:bg-greenMid text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out"
          >
            Actualizar Reseña
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default ManageReviews;
