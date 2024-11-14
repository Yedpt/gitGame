import { React, useEffect, useState } from "react";
import { getAllNews, deleteNew, updateNew } from "../services/newServices";
import { useAuth } from "../context/authContextsss";
import { useNavigate, Link } from "react-router-dom";
import { Collapse } from "react-collapse";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";
import { useForm } from "react-hook-form";

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [editNew, setEditNew] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newToDelete, setNewToDelete] = useState(null);

  const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          ¿Estás seguro de que quieres eliminar esta noticia?
        </h2>
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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchNews = async () => {
    try {
      const data = await getAllNews();
      setNews(data);
    } catch (error) {
      console.error("Error al cargar las reseñas:", error);
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

  const handleDeleteConfirm = () => {
    handleDelete(newToDelete);
    setShowDeleteModal(false);
    newToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    newToDelete(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNew(id);
      setNews(news.filter((report) => report.id !== id));
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredNews = news
    .filter(
      (report) =>
        (filterRole === "all" || report.rol === filterRole) &&
        (report.title.toLowerCase().includes(searchQuery) ||
          report.new.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const order = sortConfig.direction === "ascending" ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
      }
      return 0;
    });

  const handleEdit = async (report) => {
    setEditNew(report);
    setValue("title", report.title);
    setValue("news", report.news);
    setValue("image_url", report.image_url);
    setValue("image2_url", report.image2_url);
    setValue("productId", report.productId);
  };

  const onSubmit = async (data) => {
    try {
      if (editNew) {
        await updateNew(editNew.id, data);
        setEditNew(null);
        fetchNews(); 
        reset(); 
      }
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-dark">
      <div
        className="w-full h-40 bg-[url('../src/assets/img/pattern.png')] bg-repeat bg-center bg-origin-center md:block hidden"
        style={{ backgroundSize: "80%" }}
      ></div>

      <div className="container drop-shadow-xl mx-auto p-4 flex-grow">
        <div className="pt-10">
          <h1 className="text-4xl text-greenLight font-bold mb-4 py-8">
            Hola {user.name}!
          </h1>
          <h4 className="text-2xl text-light font-light mb-4 py-0">
            Administra la información de todas las noticias
          </h4>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-6 justify-between">
          <Link to="/createnews">
            <button className="flex items-center gap-3 p-2 bg-greenLight hover:bg-green-700 text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out ">
              <IoIosAddCircle className="h-4 w-4 text-greenMid" />
              Añadir Noticia
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
          <select
            className="border font-semibold border-dark rounded-md bg-greenLight px-2 py-1"
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
            <thead className="font-semibold text-sm">
              <tr>
                {[
                  { label: "ID", key: "id" },
                  { label: "User ID", key: "user_id" },
                  { label: "Title", key: "title" },
                  { label: "News", key: "news" },
                  { label: "Published", key: "published_at" },
                  { label: "Updated", key: "updated_at" },
                  { label: "Likes", key: "num_likes" },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-2 border text-light font-bold border-dark bg-greenMid cursor-pointer"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{column.label}</span>
                      <LuChevronsUpDown className="ml-1 text-green-400" />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2 border font-bold text-light border-dark bg-greenMid">
                  Image1
                </th>
                <th className="px-4 py-2 border font-bold text-light border-dark bg-greenMid">
                  Image2
                </th>
                <th className="px-4 py-2 border font-bold text-light border-dark bg-greenMid">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="font-paragraph border font-thin">
              {sortedAndFilteredNews.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 py-2 border border-gray-200  text-center">
                    {report.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {report.user_id}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {report.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 w-96">
                    <Collapse isOpened={expandedRows[report.id]}>
                      {report.news}
                    </Collapse>
                    <button
                      className="text-greenLight underline"
                      onClick={() => toggleRow(report.id)}
                    >
                      {expandedRows[report.id] ? "Ver menos" : "Ver más"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {new Date(report.published_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {new Date(report.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    {report.num_likes}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <img
                      src={`http://localhost:3000${report.image_url}`}
                      alt="Thumbnail"
                      className="w-12 h-12 object-cover rounded-3xl"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <img
                      src={`http://localhost:3000${report.image2_url}`}
                      alt="Thumbnail"
                      className="w-12 h-12 object-cover rounded-3xl"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-center">
                    <button
                      onClick={() => handleEdit(report)}
                      className="text-greenLight"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setNewToDelete(report.id);
                        setShowDeleteModal(true);
                      }}
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
        
        {editNew && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-light p-4 rounded-md shadow-md mt-6"
          >
            <h2 className="text-xl font-bold mb-4">
              Editando Noticia ID: {editNew.id}
            </h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Título</label>
              <input
                type="text"
                className="border border-gray-300 font-paragraph rounded-md px-2 py-1 w-full"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500">Este campo es requerido</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Noticia</label>
              <textarea
                type="text"
                rows={6}
                className="border border-gray-300 font-paragraph rounded-md px-2 py-1 w-full"
                {...register("news", { required: true })}
              />
              {errors.author && (
                <span className="text-red-500">Este campo es requerido</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-greenMidsec hover:bg-greenMid text-dark py-2 px-4 rounded-lg mt-4 font-bold shadow-md transition-all duration-200 ease-in-out"
            >
              Actualizar Noticia
            </button>
          </form>
        )}
        
        {showDeleteModal && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
    </div>
  );
};
export default ManageNews;
