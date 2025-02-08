const mongoose = require("mongoose");

const ProyectoSchema = new mongoose.Schema({
  id_proyecto: { type: Number, required: false, unique: true }, // Ya no es obligatorio
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  fecha_creacion: { type: Date, default: Date.now },
});

// Generar un `id_proyecto` único antes de guardar si no se proporciona
ProyectoSchema.pre("save", async function (next) {
  if (!this.id_proyecto) {
    const lastProject = await this.constructor.findOne().sort({ id_proyecto: -1 });
    this.id_proyecto = lastProject ? lastProject.id_proyecto + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
