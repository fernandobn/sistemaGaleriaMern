import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-section">
      {/* 🔹 Botón para cerrar el header */}
      <div className="header-close text-right pr-4 pt-4">
        <i className="fa fa-times text-xl cursor-pointer"></i>
      </div>

      {/* 🔹 Contenido del header */}
      <div className="header-warp text-center">
        {/* 🔹 Logo */}
        <Link to="/" className="site-logo inline-block mb-4">
          <img src="/assets/img/logo.png" alt="Logo" className="mx-auto w-28" />
        </Link>

        {/* 🔹 Icono del Menú */}
        <div className="menu-icon mb-6">
          <img src="/assets/img/menu-icon.png" alt="Menu" className="mx-auto w-12" />
        </div>

        {/* 🔹 Menú Principal */}
        <ul className="main-menu space-y-4 text-lg font-medium">
          <li><Link to="/" className="hover:text-gray-500 transition">Home</Link></li>
          <li><Link to="/nuevo-proyecto" className="hover:text-gray-500 transition">Nuevo Proyecto</Link></li>
          <li><Link to="/listar-proyectos" className="hover:text-gray-500 transition">Listar Proyectos</Link></li>
          <li><Link to="/nueva-imagen" className="hover:text-gray-500 transition">Nueva Imagen</Link></li>
          <li><Link to="/listar-imagenes" className="hover:text-gray-500 transition">Listar Imágenes</Link></li>
          <li><Link to="/nuevo-video" className="hover:text-gray-500 transition">Nuevo Video</Link></li>
          <li><Link to="/listar-videos" className="hover:text-gray-500 transition">Listar Videos</Link></li>
          <li><Link to="/nuevo-premio" className="hover:text-gray-500 transition">Nuevo Premio</Link></li>
          <li><Link to="/listar-premios" className="hover:text-gray-500 transition">Listar Premios</Link></li>

        </ul>

        {/* 🔹 Enlaces sociales */}
        <div className="social-links-warp mt-8">
          <div className="social-links flex justify-center space-x-4">
            <a href="#"><i className="fa fa-behance text-xl"></i></a>
            <a href="#"><i className="fa fa-dribbble text-xl"></i></a>
            <a href="#"><i className="fa fa-twitter text-xl"></i></a>
            <a href="#"><i className="fa fa-facebook text-xl"></i></a>
            <a href="#"><i className="fa fa-pinterest text-xl"></i></a>
          </div>
          <p className="social-text mt-4 text-gray-500">Find us on</p>
        </div>
      </div>

      {/* 🔹 Derechos reservados */}
      <div className="copyright text-center mt-6 text-sm text-gray-500">
        <h6>Desarrollado Por Henrry Barrionuevo</h6>
      </div>
    </header>
  );
};

export default Header;
