import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/gglogo1.svg";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulación de login

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="font-title">
            <nav className="bg-dark p-1 fixed w-full top-0 z-10">
                <div className="max-w-screen-2xl mt-4 flex justify-between items-center mx-auto px-4">
                    {/* Logo GG */}
                    <a href="/">
                        <img className="max-w-14" src={logo} alt="logo" />
                    </a>

                    {/* Burguer Menu */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-light focus:outline-none"
                        >
                            {/* Si el menú está abierto, mostrar el ícono de cerrar */}
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
                                // Ícono de menú hamburguesa cuando está cerrado
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

                    {/* Menú principal - visible en pantallas grandes */}
                    <div className="hidden lg:flex items-center space-x-3 font-title font-semibold">
                        <Link
                            to="/gallery"
                            className="text-light text-sm hover:text-greenLight px-4 py-1 rounded transition-all duration-300"
                        >
                            Noticias
                        </Link>
                        <Link
                            to="/gallery/newmeme"
                            className="text-light text-sm hover:text-greenLight px-6 py-3 rounded transition-all duration-300"
                        >
                            Videos
                        </Link>
                        <Link
                            to="/gallery/newmeme"
                            className="text-light text-sm hover:text-greenLight px-6 py-3 rounded transition-all duration-300"
                        >
                            Reviews
                        </Link>
                        <Link
                            to="/gallery/newmeme"
                            className="text-light text-sm hover:text-greenLight px-6 py-3 rounded transition-all duration-300"
                        >
                            Próximos Lanzamientos
                        </Link>

                        {/* Simulación de cambio entre Login y Profile */}
                        {isLoggedIn ? (
                            <>
                                {/* Icono de perfil */}
                                <button className="bg-greenLight text-dark font-title px-4 py-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5.121 19.364A1.5 1.5 0 014 18.237V16.5A3.5 3.5 0 017.5 13h9a3.5 3.5 0 013.5 3.5v1.737a1.5 1.5 0 01-1.121 1.127l-7 1.5a1.5 1.5 0 01-.758 0l-7-1.5z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                                        />
                                    </svg>
                                </button>
                                <button className="text-light text-sm hover:text-red-500 px-4 py-2">
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <button className="bg-greenLight text-dark font-title px-4 py-2 rounded-full">
                                Iniciar sesión
                            </button>
                        )}
                    </div>

                    {/* Menú desplegable en móviles - controlado por el estado */}
                    <div
                        className={`${
                            isOpen ? "block" : "hidden"
                        } lg:hidden fixed inset-0 bg-primary bg-opacity-60 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 z-20`}
                    >
                        {/* Botón de cerrar en el centro superior */}
                        <div className="absolute top-4 inset-x-0 flex justify-center">
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
                            to="/gallery"
                            className="text-light text-lg hover:text-greenLight"
                            onClick={toggleMenu}
                        >
                            Noticias
                        </Link>
                        <Link
                            to="/gallery/newmeme"
                            className="text-light text-lg hover:text-greenLight"
                            onClick={toggleMenu}
                        >
                            Videos
                        </Link>
                        <Link
                            to="/gallery/newmeme"
                            className="text-light text-lg hover:text-greenLight"
                            onClick={toggleMenu}
                        >
                            Reviews
                        </Link>
                        <Link
                            to="/gallery/newmeme"
                            className="text-light text-lg hover:text-greenLight"
                            onClick={toggleMenu}
                        >
                            Próximos Lanzamientos
                        </Link>
                        <Link
                            to="/login"
                            className="text-light text-lg hover:text-greenLight"
                            onClick={toggleMenu}
                        >
                            {isLoggedIn ? "Perfil" : "Iniciar sesión"}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
