const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { uploadImagen, uploadVideo } = require("./config/multerConfig"); // Importamos la configuración de multer

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// 📌 Middleware
app.use(cors());
app.use(express.json()); // Habilitar JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Habilitar datos en formularios

// 📌 Hacer públicas las carpetas donde se guardan imágenes y videos
app.use("/media/images", express.static(path.join(__dirname, "media/images")));
app.use("/media/videos", express.static(path.join(__dirname, "media/videos")));

// 📌 Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado correctamente"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// 📌 Rutas
app.use("/api/proyectos", require("./routes/proyectosRoutes"));
app.use("/api/imagenes", require("./routes/imagenesRoutes"));
app.use("/api/videos", require("./routes/videosRoutes"));
app.use("/api/premios", require("./routes/premiosRoutes"));


// 📌 Ruta para subir imágenes
app.post("/api/upload/imagen", uploadImagen.single("imagen"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen." });
    }
    const filePath = `/media/images/${req.file.filename}`;
    res.status(201).json({ message: "✅ Imagen subida con éxito", path: filePath });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al subir la imagen", error });
  }
});

// 📌 Ruta para subir videos
app.post("/api/upload/video", uploadVideo.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ningún video." });
    }
    const filePath = `/media/videos/${req.file.filename}`;
    res.status(201).json({ message: "✅ Video subido con éxito", path: filePath });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al subir el video", error });
  }
});

// 📌 Ruta principal
app.get("/api/", (req, res) => {
  res.send({
    message: "Bienvenido a la API de Galería de Proyectos",
    rutasDisponibles: {
      proyectos: "/api/proyectos",
      imagenes: "/api/imagenes",
      videos: "/api/videos",
      premio: "/api/premios",
      uploadImagen: "/api/upload/imagen",
      uploadVideo: "/api/upload/video",
    },
  });
});

// 📌 Iniciar Servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

