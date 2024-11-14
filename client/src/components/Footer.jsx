import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/ggLogo1.svg";

const Footer = () => {
  return (
    <footer className="h-auto bg-greenDark flex flex-col md:flex-row justify-between items-center px-6 py-4 w-full relative">
      {/* Logo a la izquierda */}
      <div className="flex items-center md:justify-start justify-center w-full md:w-auto mb-4 md:mb-0">
        <Link to="/">
          <img className="max-w-11 py-2" src={logo} alt="logo" />
        </Link>
      </div>

      {/* Links centrados */}
      <div className="flex justify-center space-x-6 text-light text-sm font-title font-normal mb-4 md:mb-0">
        <Link to="/news" className="hover:text-greenLight">
          Noticias
        </Link>
        <Link to="/videos" className="hover:text-greenLight">
          Videos
        </Link>
        <Link to="/reviews" className="hover:text-greenLight">
          Reviews
        </Link>
        <Link to="/" className="hover:text-greenLight">
          Contacto
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-light text-[11px] text-center leading-none font-paragraph font-extralight w-full md:w-auto">
        <p>
          Copyright © 2024 GitGame. <br />
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
