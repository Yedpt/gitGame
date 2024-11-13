import { React, useEffect, useState } from 'react';
import { getAllReleases, deleteRelease, getReleaseById, updateRelease } from '../services/releasesServices';
import { useAuth } from '../context/authContextsss'; 
import { useNavigate, Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";
import { useForm } from "react-hook-form";

const ManageLaunch = () => {
  const [launches, setLaunches] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState('all'); 
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editLaunch, setEditLaunch] = useState(null);
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchLaunches = async () => {
    try {
      const data = await getAllReleases();
      setLaunches(data);
    } catch (error) {
      console.error('Error al cargar los lanzamientos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteRelease(id);
      setLaunches(launches.filter((launch) => launch.id !== id));
    } catch (error) {
      console.error('Error al eliminar el lanzamiento:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilterMonth(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredLaunches = launches
    .filter((launch) => 
      (filterMonth === 'all' || launch.month === filterMonth) &&
      (launch.title.toLowerCase().includes(searchQuery) ||
       launch.description.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const order = sortConfig.direction === 'ascending' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
      }
      return 0;
    });

  const handleEdit = async (launch) => {
    setEditLaunch(launch);
    setValue('title', launch.title);
    setValue('description', launch.description);
    setValue('rating', launch.rating);
    setValue('image', launch.image);
    setValue('author', launch.author);
  };

  const onSubmit = async (data) => {
    try {
      if (editLaunch) {
        await updateRelease(editLaunch.id, data);
        setEditLaunch(null);
        fetchLaunches(); 
        reset(); 
      }
    } catch (error) {
      console.error('Error al actualizar el lanzamiento:', error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-dark">
      <div className="w-full h-40 bg-[url('../src/assets/img/pattern.png')] bg-repeat bg-center bg-origin-center md:block hidden" style={{ backgroundSize: '80%' }}></div>
      <div className="container drop-shadow-xl mx-auto p-4 flex-grow">
        <div className="pt-10">
          <h1 className="text-4xl text-greenLight font-bold mb-4 py-8">Administrar Lanzamientos</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6 justify-between">
          <Link to="/createLaunch">
            <button className="flex items-center gap-3 p-2 bg-greenLight hover:bg-green-700 hover:text-light text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out ">
              <IoIosAddCircle className="h-4 w-4 text-greenMid " />
              Añadir Lanzamiento
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <FaSearch className="flex flex-grow items-center gap-2 max-w-xs text-light h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="border border-gray-300 rounded-md bg-light px-2 py-1 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <select className="border font-semibold border-dark rounded-md bg-greenLight px-2 py-1" value={filterMonth} onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="enero">Enero</option>
            <option value="febrero">Febrero</option>
            {/* Añade más opciones de meses según sea necesario */}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-light border rounded-md shadow-md">
            <thead className='font-semibold text-sm'>
              <tr>
                {/* Define columnas aquí */}
                <th className="px-4 py-2 border font-bold text-light border-dark bg-greenMid">Acciones</th>
                {/* Más columnas */}
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredLaunches.map((launch) => (
                <tr key={launch.id}>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <button onClick={() => handleEdit(launch)} className="text-greenLight" title="Editar"><FaEdit /></button>
                    <button onClick={() => handleDelete(launch.id)} className="text-red-500" title="Eliminar"><FaTrashAlt /></button>
                  </td>
                  {/* Más celdas de datos */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {editLaunch && (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded-md shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">Editando Lanzamiento ID: {editLaunch.id}</h2>
            {/* Campos del formulario */}
            <button type="submit" className="bg-greenMidsec hover:bg-greenMid text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out">Actualizar Lanzamiento</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageLaunch;
