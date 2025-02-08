import React from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { crearProyecto } from "../services/proyectoService";

const NuevoProyecto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await crearProyecto(data);
      iziToast.success({
        title: "Éxito",
        message: "Proyecto agregado con éxito.",
        position: "topRight",
      });
      reset();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "No se pudo agregar el proyecto.",
        position: "topRight",
      });
      console.error("🚨 Error al agregar proyecto:", error);
    }
  };

  return (
    <div className="main-warp">
      <div className="page-section contact-page">
        <div className="contact-warp">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-12">
              <div className="contact-text bg-white p-5 rounded shadow">
                <h2 className="text-center mb-4">Agregar Nuevo Proyecto</h2>
                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  {/* TÍTULO */}
                  <div className="mb-4">
                    <label htmlFor="titulo" className="form-label fw-bold">
                      Título del Proyecto
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                      placeholder="Título del Proyecto"
                      {...register("titulo", { required: "Porfavor escriba el nombre del proyecto.", minLength: { value: 3, message: "Debe tener al menos 3 caracteres." } })}
                    />
                    {errors.titulo && <div className="error-message">{errors.titulo.message}</div>}
                  </div>

                  {/* DESCRIPCIÓN */}
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción del Proyecto
                    </label>
                    <textarea
                      id="descripcion"
                      className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                      placeholder="Descripción del Proyecto"
                      {...register("descripcion", { required: "Porfavor llene la descripción.", minLength: { value: 5, message: "Debe tener al menos 5 caracteres." } })}
                    />
                    {errors.descripcion && <div className="error-message">{errors.descripcion.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Agregar Proyecto
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

export default NuevoProyecto;
