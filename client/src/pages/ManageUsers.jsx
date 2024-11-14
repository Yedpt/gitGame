import { React, useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../services/userServices';
import { useAuth } from '../context/authContextsss';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";
import { useForm } from "react-hook-form";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
    </div>
  );
};

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-4">¿Estás seguro de que quieres eliminar este usuario?</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600"
        >
          Eliminar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editUser, setEditUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); 

  useEffect(() => {
    if (!user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      if (!user || !user.token) {
        throw new Error("Usuario no autenticado");
      }
      
      const data = await getUsers(user.token);
      setUsers(data);
    } catch (error) {
      setNotification({ message: 'Error al cargar usuarios', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteRequest = (id) => {
    setUserToDelete(id); 
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete, user.token);
        setUsers(users.filter((user) => user.id !== userToDelete));
        setNotification({ message: 'Usuario eliminado exitosamente', type: 'success' });
      } catch (error) {
        setNotification({ message: 'Error al eliminar el usuario', type: 'error' });
      } finally {
        setUserToDelete(null); 
      }
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUser.id, editUser, user.token);
      setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
      setEditUser(null);
      setNotification({ message: 'Usuario actualizado exitosamente', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error al actualizar el usuario', type: 'error' });
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-dark">
      <div 
        className="w-full h-40 bg-[url('../src/assets/img/pattern.png')] bg-repeat bg-center bg-origin-center md:block hidden"
        style={{ backgroundSize: '80%' }}
      ></div>
      <div className="container drop-shadow-xl mx-auto p-4 flex-grow">
        <div className="pt-10">
          <h1 className="text-4xl text-greenLight font-bold mb-4 py-8">Hola Admin</h1>
          <h4 className="text-2xl text-light font-light mb-4 py-0">Gestión de Usuarios</h4>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 justify-center">
          <div className="flex items-center gap-2">
            <FaSearch className="h-4 w-4 text-dark" />
            <input
              type="text"
              placeholder="Buscar..."
              className="border border-gray-300 rounded-md bg-light px-2 py-1 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <select 
            className="border font-semibold border-dark rounded-md bg-greenLight px-2 py-1"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
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
                {['ID', 'Nombre', 'Email', 'Rol', 'Fecha de Registro'].map((label, idx) => (
                  <th key={idx} className="px-4 py-2 border text-light border-dark bg-greenMid cursor-pointer"
                      onClick={() => handleSort(label.toLowerCase())}>
                    {label}
                    <LuChevronsUpDown className="inline-block ml-1 text-green-400" />
                  </th>
                ))}
                <th className="px-4 py-2 border text-light border-dark bg-greenMid cursor-pointer">Acciones</th>
              </tr>
            </thead>
            <tbody className="font-paragraph border font-thin">
              {sortedAndFilteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border border-gray-200 text-center">{user.id}</td>
                  <td className="px-4 py-2 border border-gray-200">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-200">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{user.rol}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-greenLight"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(user.id)}
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

        {editUser && (
          <div className="edit-form bg-gray-100 p-4 rounded mt-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">Editar Usuario</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Rol</label>
                <select
                  name="rol"
                  value={editUser.rol}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="usuario">Usuario</option>
                </select>
              </div>
              <button type="submit" className="bg-greenMidsec hover:bg-greenMid text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out">Guardar Cambios</button>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        {userToDelete && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteConfirm}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
