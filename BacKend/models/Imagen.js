const mongoose = require("mongoose");

const ImagenSchema = new mongoose.Schema({
  id_imagen: { type: Number, required: false, unique: true }, // Generado automáticamente
  nombreArchivo: { type: String, required: true }, // Solo se guarda el nombre del archivo
  descripcion: { type: String }, // Descripción opcional
  fechaSubida: { type: Date, default: Date.now },
});

// 📌 Generar un `id_imagen` único antes de guardar
ImagenSchema.pre("save", async function (next) {
  if (!this.id_imagen) {
    const lastImage = await this.constructor.findOne().sort({ id_imagen: -1 });
    this.id_imagen = lastImage ? lastImage.id_imagen + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Imagen", ImagenSchema);
