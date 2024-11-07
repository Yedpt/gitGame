import { React, useEffect, useState } from 'react';
import { getAllNews, deleteNew } from '../services/newServices';
import { useAuth } from '../context/authContextsss'; 
import { useNavigate, Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all'); 
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    if (!user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchNews = async () => {
    try {
      const data = await getAllNews();
      setNews(data);
    } catch (error) {
      console.error('Error al cargar las reseñas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteNew(id);
      setNews(news.filter(item => item.id !== id));
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

  const sortedAndFilteredNews = news
    .filter((item) => 
      (filterRole === 'all' || item.rol === filterRole) &&
      (item.title.toLowerCase().includes(searchQuery) ||
       item.new.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const order = sortConfig.direction === 'ascending' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
      }
      return 0;
    });

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container bg-dark mx-auto p-4">
      <div className="py-8">
        <h1 className="text-2xl font-bold text-white mb-4 py-8">Hola Admin</h1>
        <h4 className="text-xl font-bold text-white mb-4 py-2">Ve la información de todas las noticias</h4>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Link to="/createReview">
          <button className="flex items-center gap-3 p-2 bg-greenLight hover:bg-green-700 text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out ">
            <IoIosAddCircle className="h-4 w-4 text-greenMidsec" />
            Añadir Noticia
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <FaSearch className="h-4 w-4 text-dark" />
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-300 rounded-md px-2 py-1"
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-light border border-greenMid rounded-md shadow-md">
          <thead>
            <tr>
              {[
                { label: 'ID', key: 'id' },
                { label: 'User ID', key: 'user_id' },
                { label: 'Title', key: 'title' },
                { label: 'News', key: 'news' },
                { label: 'Published', key: 'published_at' },
                { label: 'Updated', key: 'updated_at' },
                { label: 'Likes', key: 'num_likes' },
              ].map((column) => (
                <th key={column.key} className="px-4 py-2 border font-bold border-gray-200 bg-gray-100 cursor-pointer"
                    onClick={() => handleSort(column.key)}>
                  {column.label}
                  <LuChevronsUpDown className="inline-block ml-1" />
                </th>
              ))}
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Image1</th>
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Image2</th>
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Manage</th>
            </tr>
          </thead>
          <tbody className="font-paragraph border font-thin">
            {sortedAndFilteredNews.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border border-gray-200 text-center">{item.id}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{item.user_id}</td>
                <td className="px-4 py-2 border border-gray-200">{item.title}</td>
                <td className="px-4 py-2 border border-gray-200 w-96">
                  <Collapse isOpened={expandedRows[item.id]}>
                    {item.news}
                  </Collapse>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => toggleRow(item.id)}
                  >
                    {expandedRows[item.id] ? 'Ver menos' : 'Ver más'}
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">{new Date(item.published_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{new Date(item.updated_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{item.num_likes}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <img
                    src={`http://localhost:3000${item.image_url}`}
                    alt="Thumbnail"
                    className="w-12 h-12 object-cover rounded-3xl"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <img
                    src={`http://localhost:3000${item.image2_url}`}
                    alt="Thumbnail"
                    className="w-12 h-12 object-cover rounded-3xl"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <button
                    onClick={() => navigate('/')}
                    className="text-blue-500 mr-2"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
    </div>
  );
};
export default ManageNews
