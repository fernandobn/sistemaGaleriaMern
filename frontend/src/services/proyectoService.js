import API from "../api"; // Asegúrate de que la ruta sea correcta

// Crear un nuevo proyecto
export const crearProyecto = async (proyectoData) => {
  const response = await API.post("/proyectos", proyectoData);
  return response.data;
};

// Obtener todos los proyectos
export const listarProyectos = async () => {
  const response = await API.get("/proyectos");
  return response.data; // Retorna los datos de los proyectos
};

// Eliminar un proyecto
export const eliminarProyecto = async (id) => {
  const response = await API.delete(`/proyectos/${id}`);
  return response.data;
};

// Actualizar un proyecto
export const actualizarProyecto = async (id, proyectoData) => {
  const response = await API.put(`/proyectos/${id}`, proyectoData);
  return response.data; // Retorna el proyecto actualizado
};

// Obtener un proyecto por ID
export const obtenerProyectoPorId = async (id) => {
  const response = await API.get(`/proyectos/${id}`);
  return response.data; // Retorna los datos del proyecto
};
