import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { obtenerVideoPorId, actualizarVideo } from "../services/videoService";
import { listarProyectos } from "../services/proyectoService";

const EditarVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [subiendo, setSubiendo] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await obtenerVideoPorId(id);
        setValue("descripcion", data.descripcion);
        setValue("proyecto", data.proyecto);
        setVideoPreview(`http://localhost:5000/media/videos/${data.nombreArchivo}`);
      } catch (error) {
        console.error("🚨 Error al obtener el video:", error);
      }
    };

    const fetchProyectos = async () => {
      try {
        const data = await listarProyectos();
        setProyectos(data);
      } catch (error) {
        console.error("🚨 Error al obtener proyectos:", error);
      }
    };

    fetchVideo();
    fetchProyectos();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("descripcion", data.descripcion);
    formData.append("proyecto", data.proyecto);
    
    if (data.video && data.video[0]) {
      formData.append("video", data.video[0]);
    }

    setSubiendo(true);
    try {
      await actualizarVideo(id, formData);
      iziToast.success({
        title: "Éxito",
        message: "Video actualizado con éxito.",
        position: "topRight",
      });
      navigate("/listar-videos");
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "No se pudo actualizar el video.",
        position: "topRight",
      });
      console.error("🚨 Error al actualizar el video:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="main-warp container">
      <div className="page-section contact-page row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="contact-text bg-white p-4 rounded shadow">
            <h2 className="text-center mb-4">Editar Video</h2>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label fw-bold">
                  Descripción
                </label>
                <input
                  type="text"
                  id="descripcion"
                  {...register("descripcion", { required: "Por favor, ingresa una descripción." })}
                  className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                />
                {errors.descripcion && <div className="error-message text-danger">{errors.descripcion.message}</div>}
              </div>

              {videoPreview && (
                <div className="mb-3 text-center">
                  <label className="form-label">Vista Previa del Video:</label>
                  <video width="25%" height="auto" controls>
                    <source src={videoPreview} type="video/mp4" />
                    Tu navegador no soporta este formato de video.
                  </video>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="video" className="form-label fw-bold">
                  Cambiar Video (Opcional)
                </label>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  {...register("video")}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
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
                {errors.proyecto && <div className="error-message text-danger">{errors.proyecto.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2" disabled={subiendo}>
                {subiendo ? "Actualizando..." : "Actualizar Video"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarVideo;
