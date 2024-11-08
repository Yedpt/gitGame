import { React, useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/userServices'; // Asegúrate de tener estos servicios creados
import { useAuth } from '../context/authContextsss'; 
import { useNavigate, Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
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

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
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

  const sortedAndFilteredUsers = users
    .filter((user) => 
      (filterRole === 'all' || user.rol === filterRole) &&
      (user.name.toLowerCase().includes(searchQuery) ||
       user.email.toLowerCase().includes(searchQuery))
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
        <h1 className="text-2xl font-bold mb-4 py-8">Hola Admin</h1>
        <h4 className="text-xl font-bold mb-4 py-2">Gestión de Usuarios</h4>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Link to="/createUser">
          <button className="flex items-center gap-3 p-2 bg-greenLight hover:bg-green-700 text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out ">
            <IoIosAddCircle className="h-4 w-4 text-greenMidsec" />
            Añadir Usuario
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
                { label: 'Name', key: 'name' },
                { label: 'Email', key: 'email' },
                { label: 'Rol', key: 'rol' },
                { label: 'Created At', key: 'created_at' },
                { label: 'Last Login', key: 'last_login' },
                { label: 'Status', key: 'status' }
              ].map((column) => (
                <th key={column.key} className="px-4 py-2 border font-bold border-gray-200 bg-gray-100 cursor-pointer"
                    onClick={() => handleSort(column.key)}>
                  {column.label}
                  <LuChevronsUpDown className="inline-block ml-1" />
                </th>
              ))}
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Avatar</th>
              <th className="px-4 py-2 border font-bold border-gray-200 bg-gray-100">Manage</th>
            </tr>
          </thead>
          <tbody className="font-paragraph border font-thin">
            {sortedAndFilteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border border-gray-200 text-center">{user.id}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{user.name}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{user.email}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{user.rol}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{new Date(user.last_login).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{user.status}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <img
                    src={`http://localhost:3000${user.avatar_url}`}
                    alt="Avatar"
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
                    onClick={() => handleDelete(user.id)}
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

export default ManageUsers;
