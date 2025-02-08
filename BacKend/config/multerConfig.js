const multer = require("multer");
const path = require("path");

// 📌 Configuración para almacenamiento de imágenes
const storageImagenes = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/images/"); // Guardar en la carpeta media/images/
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
  },
});

// 📌 Filtro para aceptar solo imágenes permitidas
const fileFilterImagenes = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb(new Error("⚠️ Solo se permiten imágenes en formato JPG, JPEG, PNG o GIF."));
};

// 📌 Configuración de Multer para imágenes
const uploadImagen = multer({
  storage: storageImagenes,
  fileFilter: fileFilterImagenes,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
});

// 📌 Configuración de almacenamiento de videos
const storageVideos = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/videos/"); // Guardar en la carpeta media/videos/
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
  },
});

// 📌 Filtros para aceptar solo videos (MP4, AVI, MOV)
const fileFilterVideos = (req, file, cb) => {
  const allowedTypes = /mp4|avi|mov/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb(new Error("⚠️ Solo se permiten videos en formato MP4, AVI o MOV."));
};

// 📌 Configuración de Multer para videos
const uploadVideo = multer({
  storage: storageVideos,
  fileFilter: fileFilterVideos,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB máximo
});

// 📌 Exportar ambos `upload`
module.exports = { uploadImagen, uploadVideo };
