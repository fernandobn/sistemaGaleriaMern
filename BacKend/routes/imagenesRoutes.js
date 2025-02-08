const express = require("express");
const router = express.Router();
const { uploadImagen } = require("../config/multerConfig");
const {
  subirImagen,
  obtenerImagenes,
  obtenerImagenPorId,
  editarImagen,
  eliminarImagen
} = require("../controllers/imagenesController");

// 📌 Subir imagen
router.post("/upload", uploadImagen.single("imagen"), subirImagen);

// 📌 Obtener todas las imágenes
router.get("/", obtenerImagenes);

// 📌 Obtener una imagen por ID
router.get("/:id", obtenerImagenPorId);

// 📌 Editar descripción de una imagen
router.put("/:id", uploadImagen.single("imagen"), editarImagen);

// 📌 Eliminar imagen
router.delete("/:id", eliminarImagen);

module.exports = router;
