const express = require("express");
const router = express.Router();
const proyectosController = require("../controllers/proyectosController");

// Rutas CRUD
router.get("/", proyectosController.obtenerProyectos);
router.get("/:id", proyectosController.obtenerProyectoPorId);
router.post("/", proyectosController.crearProyecto);
router.put("/:id", proyectosController.actualizarProyecto);
router.delete("/:id", proyectosController.eliminarProyecto);

module.exports = router;
