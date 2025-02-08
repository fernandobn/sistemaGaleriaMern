import API from "../api"; // Asegúrate de que la ruta sea correcta

// Crear un nuevo premio
export const crearPremio = async (premioData) => {
  const response = await API.post("/premios", premioData);
  return response.data;
};

// Obtener todos los premios
export const listarPremios = async () => {
  const response = await API.get("/premios");
  return response.data; // Retorna los datos de los premios
};

// Eliminar un premio
export const eliminarPremio = async (id) => {
  const response = await API.delete(`/premios/${id}`);
  return response.data;
};

// Actualizar un premio
export const actualizarPremio = async (id, premioData) => {
  const response = await API.put(`/premios/${id}`, premioData);
  return response.data; // Retorna el premio actualizado
};

// Obtener un premio por ID
export const obtenerPremioPorId = async (id) => {
  const response = await API.get(`/premios/${id}`);
  return response.data; // Retorna los datos del premio
};
