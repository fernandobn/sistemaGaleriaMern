const mongoose = require("mongoose");

const PremioSchema = new mongoose.Schema({
  id_premio: { type: Number, required: false, unique: true }, // No es obligatorio
  tipo: { type: String, required: true, enum: ["Economico", "Obsequio"] },
  descripcion: { type: String, required: true, trim: true },
  marca: { type: String, required: true, trim: true },
  proveedor: { type: String, required: true, trim: true },
  fecha_creacion: { type: Date, default: Date.now },
});

// Generar un `id_premio` único antes de guardar si no se proporciona
PremioSchema.pre("save", async function (next) {
  if (!this.id_premio) {
    const lastPremio = await this.constructor.findOne().sort({ id_premio: -1 });
    this.id_premio = lastPremio ? lastPremio.id_premio + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Premio", PremioSchema);
