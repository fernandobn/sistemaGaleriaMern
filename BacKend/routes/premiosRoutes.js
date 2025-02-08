const express = require("express");
const router = express.Router();
const premiosController = require("../controllers/premiosController");

// Rutas CRUD para premios
router.get("/", premiosController.obtenerPremios);
router.get("/:id", premiosController.obtenerPremioPorId);
router.post("/", premiosController.crearPremio);
router.put("/:id", premiosController.actualizarPremio);
router.delete("/:id", premiosController.eliminarPremio);

module.exports = router;
