import axios from "axios";

const API_URL = "http://localhost:5000/api/videos";

// 📌 Subir un nuevo video
export const subirVideo = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("🚨 Error al subir el video:", error);
    throw error;
  }
};
// 📌 Obtener todos los videos
export const listarVideos = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("🚨 Error al obtener los videos:", error);
      throw error;
    }
  };
  
  // 📌 Función para eliminar un video
export const eliminarVideo = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("✅ Video eliminado:", response.data);
      return response.data;
    } catch (error) {
      console.error("🚨 Error al eliminar el video:", error);
      throw error;
    }
  };
  
// 📌 Obtener un video por ID
export const obtenerVideoPorId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("🚨 Error al obtener el video:", error);
      throw error;
    }
  };
  
 // 📌 Editar un video (cambiar descripción y video opcional)

// 📌 Editar un video (cambiar descripción y video opcional)
export const actualizarVideo = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Video actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("🚨 Error al actualizar el video:", error);
      if (error.response) {
        console.error("📡 Respuesta del servidor:", error.response.data);
      }
      throw error;
    }
  };