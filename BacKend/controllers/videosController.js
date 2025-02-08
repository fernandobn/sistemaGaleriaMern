const Video = require("../models/Video");
const path = require("path");
const fs = require("fs");

// 📌 Subir video
exports.subirVideo = async (req, res) => {
  try {
    console.log("📩 Archivo recibido:", req.file);
    console.log("📩 Datos recibidos:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ningún video." });
    }

    const nuevoVideo = new Video({
      nombreArchivo: req.file.filename, // Guardamos solo el nombre del archivo
      descripcion: req.body.descripcion || "",
      proyecto: req.body.proyecto || null, // Relacionado con un proyecto (opcional)
    });

    await nuevoVideo.save();

    res.status(201).json({
      message: "✅ Video subido con éxito",
      video: {
        id_video: nuevoVideo.id_video,
        nombreArchivo: nuevoVideo.nombreArchivo,
        descripcion: nuevoVideo.descripcion,
        fechaSubida: nuevoVideo.fechaSubida,
        proyecto: nuevoVideo.proyecto,
      },
    });
  } catch (error) {
    console.error("🚨 Error al subir el video:", error);
    res.status(500).json({ message: "Error al subir el video", error });
  }
};

// 📌 Obtener todos los videos
exports.obtenerVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("proyecto", "titulo"); // Relación con el Proyecto
    res.status(200).json(videos);
  } catch (error) {
    console.error("🚨 Error al obtener los videos:", error);
    res.status(500).json({ message: "Error al obtener los videos", error });
  }
};

// 📌 Obtener un video por `id_video`
exports.obtenerVideoPorId = async (req, res) => {
  try {
    const video = await Video.findOne({ id_video: req.params.id });

    if (!video) {
      return res.status(404).json({ message: "❌ Video no encontrado." });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error("🚨 Error al obtener el video:", error);
    res.status(500).json({ message: "❌ Error al obtener el video", error });
  }
};

// 📌 Editar video (descripción, proyecto y reemplazo opcional del archivo)
exports.editarVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, proyecto } = req.body;

    console.log("📩 Datos recibidos:", req.body);
    console.log("📂 Archivo recibido:", req.file);

    // Buscar el video en la base de datos usando `id_video`
    const video = await Video.findOne({ id_video: id });

    if (!video) {
      return res.status(404).json({ message: "❌ Video no encontrado." });
    }

    // Si se sube un nuevo video, eliminar el anterior
    if (req.file) {
      const nuevaRuta = req.file.filename;
      const videoPath = path.join(__dirname, "../media/videos", video.nombreArchivo);

      // Verificar si el archivo existe antes de eliminarlo
      if (fs.existsSync(videoPath)) {
        fs.unlink(videoPath, (err) => {
          if (err) {
            console.error("🚨 Error al eliminar el video anterior:", err);
          }
        });
      }

      video.nombreArchivo = nuevaRuta; // Actualizar nombre del archivo en la BD
    }

    // Actualizar descripción y proyecto (si cambia)
    video.descripcion = descripcion;
    video.proyecto = proyecto || video.proyecto; // Mantener el proyecto original si no se cambia

    await video.save(); // Guardar cambios en la base de datos

    res.status(200).json({ message: "✅ Video actualizado con éxito", video });
  } catch (error) {
    console.error("🚨 Error al actualizar el video:", error);
    res.status(500).json({ message: "❌ Error al actualizar el video", error });
  }
};
// 📌 Eliminar video
exports.eliminarVideo = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del video desde la URL

    // 📌 Buscar el video por `id_video` en lugar de `_id`
    const video = await Video.findOne({ id_video: id });

    if (!video) {
      return res.status(404).json({ message: "❌ Video no encontrado." });
    }

    // 📌 Ruta del archivo en la carpeta media/videos
    const videoPath = path.join(__dirname, "../media/videos", video.nombreArchivo);

    // 📌 Intentar eliminar el archivo del sistema
    try {
      await fs.promises.unlink(videoPath);
      console.log("✅ Video eliminado del servidor:", video.nombreArchivo);
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error("🚨 Error al eliminar el video del servidor:", err);
      }
    }

    // 📌 Eliminar el registro de la base de datos
    await Video.findOneAndDelete({ id_video: id });

    res.status(200).json({ message: "✅ Video eliminado correctamente" });
  } catch (error) {
    console.error("🚨 Error al eliminar el video:", error);
    res.status(500).json({ message: "❌ Error al eliminar el video", error });
  }
};