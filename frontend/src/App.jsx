import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import NuevoProyecto from "./components/NuevoProyecto";
import ListarProyectos from "./components/ListarProyectos";
import EditarProyecto from "./components/EditarProyecto";
import NuevaImagen from "./components/NuevaImagen";
import ListarImagenes from "./components/ListarImagenes";
import EditarImagen from "./components/EditarImagen";
import NuevoVideo from "./components/NuevoVideo";
import ListarVideos from "./components/ListarVideos";
import EditarVideo from "./components/EditarVideo";
import NuevoPremio from "./components/NuevoPremio";
import ListarPremios from "./components/ListarPremios";
import EditarPremio from "./components/EditarPremio";

function App() {
  return (
    <Router>
      {/* ✅ El Header aparece en todas las páginas */}
      <Header />

      {/* 📌 Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listar-proyectos" element={<ListarProyectos />} />
        <Route path="/nuevo-proyecto" element={<NuevoProyecto />} />
        <Route path="/editar-proyecto/:id" element={<EditarProyecto />} />
        <Route path="/nueva-imagen" element={<NuevaImagen />} />
        <Route path="/listar-imagenes" element={<ListarImagenes />} />
        <Route path="/editar-imagen/:id" element={<EditarImagen />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />
        <Route path="/listar-videos" element={<ListarVideos />} />
        <Route path="/editar-video/:id" element={<EditarVideo />} />
        <Route path="/nuevo-premio" element={<NuevoPremio />} />
        <Route path="/listar-premios" element={<ListarPremios />} />
        <Route path="/editar-premio/:id" element={<EditarPremio />} />

      </Routes>

      {/* ✅ El Footer aparece en todas las páginas */}
    </Router>
  );
}

export default App;
