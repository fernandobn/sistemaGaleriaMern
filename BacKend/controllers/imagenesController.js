const Imagen = require("../models/Imagen");
const fs = require("fs");
const path = require("path");

// 📌 Subir imagen
exports.subirImagen = async (req, res) => {
  try {
    console.log("📩 Archivo recibido:", req.file);
    console.log("📩 Datos recibidos:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen." });
    }

    // Generar ID automático
    const lastImage = await Imagen.findOne().sort({ id_imagen: -1 });
    const newId = lastImage ? lastImage.id_imagen + 1 : 1;

    const nuevaImagen = new Imagen({
      id_imagen: newId, // Asignar ID secuencial
      nombreArchivo: req.file.filename,
      descripcion: req.body.descripcion || "",
    });

    await nuevaImagen.save();

    res.status(201).json({
      message: "✅ Imagen subida con éxito",
      imagen: {
        id_imagen: nuevaImagen.id_imagen,
        nombreArchivo: nuevaImagen.nombreArchivo,
        descripcion: nuevaImagen.descripcion,
        fechaSubida: nuevaImagen.fechaSubida,
      },
    });
  } catch (error) {
    console.error("🚨 Error en el servidor:", error);
    res.status(500).json({ message: "Error al subir la imagen", error });
  }
};

// 📌 Obtener todas las imágenes
exports.obtenerImagenes = async (req, res) => {
  try {
    const imagenes = await Imagen.find().sort({ id_imagen: 1 }); // Ordenadas por ID
    res.status(200).json(imagenes);
  } catch (error) {
    console.error("🚨 Error al obtener las imágenes:", error);
    res.status(500).json({ message: "Error al obtener las imágenes", error });
  }
};

// 📌 Editar imagen por id_imagen (permite actualizar la descripción y reemplazar imagen)
exports.editarImagen = async (req, res) => {
  try {
    const { id } = req.params; // Este es id_imagen
    const { descripcion } = req.body;

    console.log("📌 Editando imagen con ID:", id);
    console.log("📌 Datos recibidos:", req.body);
    console.log("📌 Archivo recibido:", req.file);

    // Buscar la imagen en la base de datos usando id_imagen
    const imagen = await Imagen.findOne({ id_imagen: id });
    if (!imagen) {
      console.error("❌ Imagen no encontrada en la BD.");
      return res.status(404).json({ message: "Imagen no encontrada." });
    }

    // Si se sube una nueva imagen, reemplazarla
    if (req.file) {
      console.log("📷 Nueva imagen subida:", req.file.filename);

      // Ruta de la imagen anterior
      const imagePath = path.join(__dirname, "../media/images", imagen.nombreArchivo);

      // Eliminar la imagen anterior del servidor
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("🚨 Error al eliminar la imagen anterior:", err);
        } else {
          console.log("✅ Imagen anterior eliminada correctamente.");
        }
      });

      // Guardar el nuevo nombre del archivo en la BD
      imagen.nombreArchivo = req.file.filename;
    }

    // Actualizar la descripción si se proporciona
    if (descripcion) {
      imagen.descripcion = descripcion;
    }

    // Guardar cambios en la BD
    await imagen.save();

    res.status(200).json({ message: "✅ Imagen actualizada con éxito", imagen });
  } catch (error) {
    console.error("🚨 Error en el backend al actualizar la imagen:", error);
    res.status(500).json({ message: "Error al actualizar la imagen", error });
  }
};

// 📌 Obtener una imagen por ID_IMAGEN
exports.obtenerImagenPorId = async (req, res) => {
  try {
    const imagen = await Imagen.findOne({ id_imagen: req.params.id });

    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada." });
    }

    res.status(200).json(imagen);
  } catch (error) {
    console.error("🚨 Error al obtener la imagen:", error);
    res.status(500).json({ message: "Error al obtener la imagen", error });
  }
};

// 📌 Eliminar imagen
exports.eliminarImagen = async (req, res) => {
  try {
    const imagen = await Imagen.findOne({ id_imagen: req.params.id });

    if (!imagen) {
      return res.status(404).json({ message: "❌ Imagen no encontrada." });
    }

    // Ruta del archivo en la carpeta media/images
    const imagePath = path.join(__dirname, "../media/images", imagen.nombreArchivo);

    // Eliminar el archivo físico si existe
    fs.unlink(imagePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("🚨 Error al eliminar la imagen del servidor:", err);
      }
    });

    // Eliminar el registro de la base de datos
    await Imagen.findOneAndDelete({ id_imagen: req.params.id });

    res.status(200).json({ message: "✅ Imagen eliminada correctamente" });
  } catch (error) {
    console.error("🚨 Error al eliminar la imagen:", error);
    res.status(500).json({ message: "❌ Error al eliminar la imagen", error });
  }
};
