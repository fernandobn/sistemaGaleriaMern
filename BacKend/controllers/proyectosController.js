const Proyecto = require("../models/Proyecto");

// Obtener todos los proyectos
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find(); // Obtenemos todos los proyectos
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos", error });
  }
};

// Obtener un proyecto por ID
exports.obtenerProyectoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Asegúrate de convertir `id` a un número, ya que `id_proyecto` es un número en la base de datos
    const proyecto = await Proyecto.findOne({ id_proyecto: Number(id) });

    if (!proyecto) {
      console.log("Proyecto no encontrado:", id);
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(proyecto);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ message: "Error al obtener el proyecto", error });
  }
};


exports.crearProyecto = async (req, res) => {
  try {
    console.log("📥 Datos recibidos en el backend:", req.body); // Verifica qué datos llegan
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const nuevoProyecto = new Proyecto({ titulo, descripcion });
    await nuevoProyecto.save();

    res.status(201).json(nuevoProyecto);
  } catch (error) {
    console.error("🚨 Error al crear el proyecto:", error); // Captura el error
    res.status(500).json({ message: "Error al crear el proyecto", error });
  }
};



// 📌 ACTUALIZAR PROYECTO
exports.actualizarProyecto = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // Convertir ID a número
    const { titulo, descripcion } = req.body;

    const proyectoActualizado = await Proyecto.findOneAndUpdate(
      { id_proyecto: id }, // Buscar por id_proyecto en lugar de _id
      { titulo, descripcion },
      { new: true } // Retorna el proyecto actualizado
    );

    if (!proyectoActualizado) {
      return res.status(404).json({ message: "❌ Proyecto no encontrado" });
    }

    res.status(200).json(proyectoActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar el proyecto:", error);
    res.status(500).json({ message: "Error al actualizar el proyecto", error });
  }
};

// 📌 ELIMINAR PROYECTO
exports.eliminarProyecto = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // Convertir ID a número

    const proyectoEliminado = await Proyecto.findOneAndDelete({ id_proyecto: id });

    if (!proyectoEliminado) {
      return res.status(404).json({ message: "❌ Proyecto no encontrado" });
    }

    res.status(200).json({ message: "✅ Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el proyecto:", error);
    res.status(500).json({ message: "Error al eliminar el proyecto", error });
  }
};