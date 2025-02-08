import axios from "axios";

const API_URL = "http://localhost:5000/api/imagenes"; // URL correcta

// 📌 Subir una imagen
export const subirImagen = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("🚨 Error en la petición al servidor:", error);
    throw error;
  }
};



// 📌 Obtener todas las imágenes (CORRECCIÓN AQUI 👇)
export const listarImagenes = async () => {
  try {
    const response = await axios.get(`${API_URL}`); // Se usa API_URL en lugar de BASE_URL
    return response.data;
  } catch (error) {
    console.error("🚨 Error al obtener las imágenes:", error);
    throw error;
  }
};

// 📌 Eliminar una imagen por ID (CORRECCIÓN AQUI 👇)
export const eliminarImagen = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); // Se usa API_URL en lugar de BASE_URL
  } catch (error) {
    console.error("🚨 Error al eliminar la imagen:", error);
    throw error;
  }
};

// 📌 Obtener una imagen por ID_IMAGEN
export const obtenerImagenPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("🚨 Error al obtener la imagen:", error);
    throw error;
  }
};

// 📌 Actualizar imagen por ID_IMAGEN (con posible cambio de imagen)
export const actualizarImagen = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 Error en la API:", error.response || error.message);
    throw error;
  }
};