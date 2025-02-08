import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { obtenerProyectoPorId, actualizarProyecto } from "../services/proyectoService";

const EditarProyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const proyecto = await obtenerProyectoPorId(id);
        setValue("titulo", proyecto.titulo);
        setValue("descripcion", proyecto.descripcion);
      } catch (error) {
        iziToast.error({
          title: "Error",
          message: "Error al obtener el proyecto.",
          position: "topRight",
        });
        console.error("🚨 Error al obtener el proyecto:", error);
      }
    };

    fetchProyecto();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await actualizarProyecto(id, data);
      iziToast.success({
        title: "Éxito",
        message: "Proyecto actualizado con éxito.",
        position: "topRight",
      });
      navigate("/listar-proyectos");
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "No se pudo actualizar el proyecto.",
        position: "topRight",
      });
      console.error("🚨 Error al actualizar proyecto:", error);
    }
  };

  return (
    <div className="main-warp">
      <div className="page-section contact-page">
        <div className="contact-warp">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-12">
              <div className="contact-text bg-white p-5 rounded shadow">
                <h2 className="text-center mb-4">Editar Proyecto</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="titulo" className="form-label fw-bold">
                      Título del Proyecto:
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                      {...register("titulo", { required: "Por favor, ingresa el título.", minLength: { value: 3, message: "Debe tener al menos 3 caracteres." } })}
                    />
                    {errors.titulo && <div className="text-danger">{errors.titulo.message}</div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción:
                    </label>
                    <textarea
                      id="descripcion"
                      className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                      {...register("descripcion", { required: "Por favor, ingresa una descripción.", minLength: { value: 5, message: "Debe tener al menos 5 caracteres." } })}
                      rows="4"
                    />
                    {errors.descripcion && <div className="text-danger">{errors.descripcion.message}</div>}
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100 py-2">
                      Actualizar Proyecto
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

export default EditarProyecto;
