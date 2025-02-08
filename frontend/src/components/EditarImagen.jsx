import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { obtenerImagenPorId, actualizarImagen } from "../services/imagenService";

const EditarImagen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [imagenActual, setImagenActual] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState(null);

  useEffect(() => {
    const fetchImagen = async () => {
      try {
        const imagen = await obtenerImagenPorId(id);
        setValue("descripcion", imagen.descripcion);
        setImagenActual(imagen.nombreArchivo);
      } catch (error) {
        iziToast.error({
          title: "Error",
          message: "Error al obtener la imagen.",
          position: "topRight",
        });
        console.error("🚨 Error al obtener la imagen:", error);
      }
    };

    fetchImagen();
  }, [id, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNuevaImagen(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("descripcion", data.descripcion);
    if (nuevaImagen) {
      formData.append("imagen", nuevaImagen);
    }

    try {
      await actualizarImagen(id, formData);
      iziToast.success({
        title: "Éxito",
        message: "Imagen actualizada con éxito.",
        position: "topRight",
      });
      navigate("/listar-imagenes");
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "Ocurrió un error al actualizar la imagen.",
        position: "topRight",
      });
      console.error("🚨 Error al actualizar la imagen:", error);
    }
  };

  return (
    
    <div className="main-warp">
      <div className="page-section contact-page">
        <div className="contact-warp">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="contact-text bg-white p-5 rounded shadow">
                <h2 className="text-center mb-4">Editar Imagen</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 text-center">
                    <label className="form-label fw-bold">Imagen Actual:</label>
                    {imagenActual ? (
                      <img
                        src={`http://localhost:5000/media/images/${imagenActual}`}
                        alt="Imagen actual"
                        className="img-thumbnail mb-3"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    ) : (
                      <p className="text-muted">⚠️ No hay imagen disponible</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Subir Nueva Imagen:</label>
                    <input
                      id="imagen"
                      type="file"
                      accept="image/*"
                      {...register("imagen")}
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Descripción:</label>
                    <input
                      type="text"
                      id="descripcion"
                      {...register("descripcion", {
                        required: "Por favor, ingresa una descripción.",
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                      })}
                      className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                    />
                    {errors.descripcion && <div className="text-danger">{errors.descripcion.message}</div>}
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100 py-2">
                      Actualizar Imagen
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarImagen;
