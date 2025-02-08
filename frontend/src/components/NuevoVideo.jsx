import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { subirVideo } from "../services/videoService";
import { listarProyectos } from "../services/proyectoService";
import "bootstrap-fileinput/js/fileinput";
import "bootstrap-fileinput/js/locales/es";
import "bootstrap-fileinput/css/fileinput.min.css";
import $ from "jquery";

const NuevoVideo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [subiendo, setSubiendo] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    $("#video").fileinput({
      language: "es",
      allowedFileExtensions: ["mp4", "avi", "mkv"],
      dropZoneEnabled: true,
      showUpload: false,
    });

    const fetchProyectos = async () => {
      try {
        const data = await listarProyectos();
        setProyectos(data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("video", data.video[0]);
    formData.append("descripcion", data.descripcion);
    formData.append("proyecto", data.proyecto);

    setSubiendo(true);
    try {
      const response = await subirVideo(formData);
      iziToast.success({
        title: "Éxito",
        message: response?.data?.message || "Video subido con éxito.",
        position: "topRight",
      });
      reset();
    } catch (error) {
      console.error("🚨 Error al subir el video:", error);
      
      let mensajeError = "No se pudo subir el video.";
      if (error.response) {
        console.error("📌 Respuesta del servidor:", error.response);
        mensajeError = error.response.data?.message || mensajeError;
      } else if (error.request) {
        console.error("🚨 No se recibió respuesta del servidor.", error.request);
        mensajeError = "No se recibió respuesta del servidor. Verifica tu conexión.";
      } else {
        console.error("🚨 Error desconocido:", error.message);
        mensajeError = `Error inesperado: ${error.message}`;
      }
      iziToast.error({
        title: "Error",
        message: mensajeError,
        position: "topRight",
      });
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="main-warp">
      <div className="page-section contact-page">
        <div className="contact-warp">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-12">
              <div className="contact-text bg-white p-5 rounded shadow">
                <h2 className="text-center mb-4">Subir Nuevo Video</h2>
                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="video" className="form-label fw-bold">
                      Seleccionar Video
                    </label>
                    <input
                      id="video"
                      type="file"
                      accept="video/*"
                      {...register("video", { required: "Por favor, sube un video." })}
                      className={`form-control ${errors.video ? "is-invalid" : ""}`}
                    />
                    {errors.video && <div className="error-message"  style={{ color: "red" }}>{errors.video.message}</div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción
                    </label>
                    <input
                      type="text"
                      id="descripcion"
                      {...register("descripcion", { required: "Por favor, ingresa una descripción.", minLength: { value: 5, message: "Debe tener al menos 5 caracteres."  } })}
                      className={`form-control  ${errors.descripcion ? "is-invalid" : ""}`} 
                    />
                    {errors.descripcion && <div className="error-message" style={{ color: "red" }}>{errors.descripcion.message} </div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="proyecto" className="form-label fw-bold">
                      Proyecto
                    </label>
                    <select
                      id="proyecto"
                      {...register("proyecto", { required: "Por favor, selecciona un proyecto." })}
                      className={`form-select ${errors.proyecto ? "is-invalid" : ""}`}
                    >
                      <option value="">Selecciona un proyecto</option>
                      {proyectos.map((proyecto) => (
                        <option key={proyecto.id_proyecto} value={proyecto._id}>
                          {proyecto.titulo}
                        </option>
                      ))}
                    </select>
                    {errors.proyecto && <div className="error-message"  style={{ color: "red" }}>{errors.proyecto.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={subiendo}>
                    {subiendo ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : null}
                    {subiendo ? "Subiendo..." : "Subir Video"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoVideo;
