import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { subirImagen } from "../services/imagenService";
import "bootstrap-fileinput/js/fileinput";
import "bootstrap-fileinput/js/locales/es";
import "bootstrap-fileinput/css/fileinput.min.css";
import $ from "jquery";

const NuevaImagen = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    $("#imagen").fileinput({
      language: "es",
      allowedFileExtensions: ["jpg", "jpeg", "png", "gif", "bmp"],
      dropZoneEnabled: true,
      showUpload: false,
    });
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("imagen", data.imagen[0]);
    formData.append("descripcion", data.descripcion);

    setSubiendo(true);
    try {
      const response = await subirImagen(formData);
      iziToast.success({
        title: "Éxito",
        message: response.data.message || "Imagen subida con éxito.",
        position: "topRight",
      });
      reset();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "Ocurrió un error al subir la imagen.",
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
                <h2 className="text-center mb-4">Subir Nueva Imagen</h2>
                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="imagen" className="form-label fw-bold">
                      Seleccionar Imagen
                    </label>
                    <input
                      id="imagen"
                      type="file"
                      accept="image/*"
                      {...register("imagen", { required: "Por favor, sube una imagen." })}
                      className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
                    />
                    {errors.imagen && <div className="error-message">{errors.imagen.message}</div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción
                    </label>
                    <input
                      type="text"
                      id="descripcion"
                      {...register("descripcion", { required: "Por favor, ingresa una descripción.", minLength: { value: 3, message: "Debe tener al menos 3 caracteres." } })}
                      className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                    />
                    {errors.descripcion && <div className="error-message">{errors.descripcion.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={subiendo}>
                    {subiendo ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : null}
                    {subiendo ? "Subiendo..." : "Subir Imagen"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .main-warp {
            background-color: #f8f9fa;
            min-height: 100vh;
            padding: 20px;
          }
          .contact-page {
            margin-left: 300px;
            padding: 20px;
          }
          .contact-text {
            max-width: 900px;
            margin: auto;
          }
          .error-message {
            color: red;
            font-size: 0.9rem;
            margin-top: 0.3rem;
            display: block;
          }
          .is-invalid {
            border-color: red;
          }
        `}
      </style>
    </div>
  );
};

export default NuevaImagen;
