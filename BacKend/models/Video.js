const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  id_video: { type: Number, required: false, unique: true }, // Generado automáticamente
  nombreArchivo: { type: String, required: true }, // Solo se guarda el nombre del archivo
  descripcion: { type: String }, // Descripción opcional
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "Proyecto", required: true }, // Relación con un proyecto
  fechaSubida: { type: Date, default: Date.now },
});

// 📌 Generar un `id_video` único antes de guardar
VideoSchema.pre("save", async function (next) {
  if (!this.id_video) {
    const lastVideo = await this.constructor.findOne().sort({ id_video: -1 });
    this.id_video = lastVideo ? lastVideo.id_video + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Video", VideoSchema);
