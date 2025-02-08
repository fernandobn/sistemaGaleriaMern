const Premio = require("../models/Premio");

// Obtener todos los premios
exports.obtenerPremios = async (req, res) => {
  try {
    const premios = await Premio.find();
    res.status(200).json(premios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los premios", error });
  }
};

// Obtener un premio por ID
exports.obtenerPremioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const premio = await Premio.findOne({ id_premio: Number(id) });

    if (!premio) {
      return res.status(404).json({ message: "Premio no encontrado" });
    }

    res.status(200).json(premio);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el premio", error });
  }
};

// Crear un nuevo premio
exports.crearPremio = async (req, res) => {
  try {
    const { tipo, descripcion, marca, proveedor } = req.body;

    if (!tipo || !descripcion || !marca || !proveedor) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const nuevoPremio = new Premio({ tipo, descripcion, marca, proveedor });
    await nuevoPremio.save();

    res.status(201).json(nuevoPremio);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el premio", error });
  }
};

// Actualizar un premio
exports.actualizarPremio = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { tipo, descripcion, marca, proveedor } = req.body;

    const premioActualizado = await Premio.findOneAndUpdate(
      { id_premio: id },
      { tipo, descripcion, marca, proveedor },
      { new: true }
    );

    if (!premioActualizado) {
      return res.status(404).json({ message: "Premio no encontrado" });
    }

    res.status(200).json(premioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el premio", error });
  }
};

// Eliminar un premio
exports.eliminarPremio = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const premioEliminado = await Premio.findOneAndDelete({ id_premio: id });

    if (!premioEliminado) {
      return res.status(404).json({ message: "Premio no encontrado" });
    }

    res.status(200).json({ message: "Premio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el premio", error });
  }
};