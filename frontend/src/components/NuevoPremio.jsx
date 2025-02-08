import React from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { crearPremio } from "../services/premioService";

const NuevoPremio = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const tipoSeleccionado = watch("tipo");

  const onSubmit = async (data) => {
    try {
      await crearPremio(data);
      iziToast.success({
        title: "Éxito",
        message: "Premio agregado con éxito.",
        position: "topRight",
      });
      reset();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "No se pudo agregar el premio.",
        position: "topRight",
      });
      console.error("🚨 Error al agregar premio:", error);
    }
  };

  return (
    <div className="main-warp"style={{ height: "900px" }}>
      <div className="page-section contact-page" style={{ width: "100%" }}>
        <div className="contact-warp">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-12">
              <div className="contact-text bg-white p-5 rounded shadow" style={{ height: "100%" }}>
                <h2 className="text-center mb-4">Agregar Nuevo Premio</h2>
                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  {/* TIPO */}
                  <div className="mb-4">
                    <label htmlFor="tipo" className="form-label fw-bold">
                      Tipo de Premio
                    </label>
                    <select
                      id="tipo"
                      className={`form-control ${errors.tipo ? "is-invalid" : ""}`}
                      {...register("tipo", { required: "Seleccione un tipo de premio." })}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Economico">Económico</option>
                      <option value="Obsequio">Obsequio</option>
                    </select>
                    {errors.tipo && <div className="error-message">{errors.tipo.message}</div>}
                  </div>

                  {/* DESCRIPCIÓN */}
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción
                    </label>
                    <textarea
                      id="descripcion"
                      className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                      placeholder="Descripción del Premio"
                      {...register("descripcion", { required: "Ingrese una descripción." })}
                    />
                    {errors.descripcion && <div className="error-message">{errors.descripcion.message}</div>}
                  </div>

                  {/* MARCA (Se habilita solo si el tipo es 'Obsequio') */}
                  <div className="mb-4">
                    <label htmlFor="marca" className="form-label fw-bold">
                      Marca
                    </label>
                    <input
                      type="text"
                      id="marca"
                      className={`form-control ${errors.marca ? "is-invalid" : ""}`}
                      placeholder="Marca del Premio"
                      {...register("marca", {
                        required: tipoSeleccionado === "Obsequio" ? "Ingrese la marca del premio." : false,
                      })}
                      disabled={tipoSeleccionado !== "Obsequio"}
                    />
                    {errors.marca && <div className="error-message">{errors.marca.message}</div>}
                  </div>

                  {/* PROVEEDOR */}
                  <div className="mb-4">
                    <label htmlFor="proveedor" className="form-label fw-bold">
                      Proveedor
                    </label>
                    <input
                      type="text"
                      id="proveedor"
                      className={`form-control ${errors.proveedor ? "is-invalid" : ""}`}
                      placeholder="Proveedor del Premio"
                      {...register("proveedor", { required: "Ingrese el proveedor del premio." })}
                    />
                    {errors.proveedor && <div className="error-message">{errors.proveedor.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-success w-100 py-2">
                    Agregar Premio
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

export default NuevoPremio;
