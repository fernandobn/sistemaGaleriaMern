const express = require("express");
const {
  subirVideo,
  obtenerVideos,
  obtenerVideoPorId,
  editarVideo,
  eliminarVideo,
} = require("../controllers/videosController");
const { uploadVideo } = require("../config/multerConfig");

const router = express.Router();

// 📌 Subir un nuevo video
router.post("/upload", (req, res, next) => {
  uploadVideo.single("video")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error al subir el video", error: err.message });
    }
    next();
  });
}, subirVideo);

// 📌 Obtener todos los videos
router.get("/", obtenerVideos);

// 📌 Obtener un video por ID
router.get("/:id", obtenerVideoPorId);

// 📌 Editar video (actualizar descripción y cambiar video opcionalmente)
router.put("/:id", (req, res, next) => {
  uploadVideo.single("video")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error al subir el nuevo video", error: err.message });
    }
    next();
  });
}, editarVideo);

// 📌 Eliminar un video
router.delete("/:id", eliminarVideo);

module.exports = router;
