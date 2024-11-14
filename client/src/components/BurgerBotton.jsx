import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContextsss";
import logo from "../assets/img/ggLogo1.svg";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="font-title">
      <nav className="bg-dark p-1 fixed mb-4 w-full top-0 z-10">
        <div className="max-w-screen-2xl mt-4 mb-4 flex justify-between items-center mx-auto px-4">
          <Link to="/">
            <img className="max-w-14" src={logo} alt="logo" />
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-light focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-3 font-title font-semibold">
            <Link
              to="/news"
              className="text-light text-sm hover:text-greenLight px-4 py-1 rounded transition-all duration-300"
            >
              Noticias
            </Link>
            <Link
              to="/videos"
              className="text-light text-sm hover:text-greenLight px-6 py-3 rounded transition-all duration-300"
            >
              Videos
            </Link>
            <Link
              to="/reviews"
              className="text-light text-sm hover:text-greenLight px-6 py-3 rounded transition-all duration-300"
            >
              Reviews
            </Link>
            <Link
              to="/upcoming"
              className="text-light text-sm hover:text-greenLight px-6 py-3 rounded transition-all duration-300"
            >
              Próximos Lanzamientos
            </Link>

            {isLoggedIn && user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center bg-greenLight text-dark font-title px-4 py-2 rounded-full"
                >
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2">Hola, {user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full text-base h-10 right-5 mt-0 w-40 bg-dark text-light z-20">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <button className="block w-full text-center px-4 py-2 hover:bg-light hover:text-dark ">
                        Perfil
                      </button>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-center bg-dark px-4 py-2 hover:bg-red-500 hover:text-dark"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <button className="bg-greenLight text-dark font-title px-4 py-2 rounded-full">
                  Iniciar sesión
                </button>
              </Link>
            )}
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:hidden fixed inset-0 bg-dark bg-opacity-80 backdrop-blur-lg flex flex-col items-center justify-center text-center space-y-6 z-20`}
          >
            <div className="absolute top-10 inset-x-0 flex justify-center items-center">
              <button
                onClick={toggleMenu}
                className="text-light focus:outline-none"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <Link
              to="/news"
              className="text-greenLight text-2xl font-semibold"
              onClick={toggleMenu}
            >
              Noticias
            </Link>
            <Link
              to="/videos"
              className="text-light text-2xl font-semibold hover:text-greenLight"
              onClick={toggleMenu}
            >
              Videos
            </Link>
            <Link
              to="/reviews"
              className="text-2xl font-semibold text-greenLight"
              onClick={toggleMenu}
            >
              Reviews
            </Link>
            <Link
              to="/upcoming"
              className="text-light text-2xl font-semibold"
              onClick={toggleMenu}
            >
              Próximos Lanzamientos
            </Link>

            {isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/profile"
                  className="text-greenLight text-center text-2xl font-bold"
                  onClick={toggleMenu}
                >
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-2xl text-center font-bold text-red-500 hover:text-red-600"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-lg text-center font-semibold text-greenLight"
                onClick={toggleMenu}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
