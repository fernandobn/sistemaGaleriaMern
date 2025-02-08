import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { obtenerPremioPorId, actualizarPremio } from "../services/premioService";

const EditarPremio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPremio = async () => {
      try {
        const premio = await obtenerPremioPorId(id);
        setValue("tipo", premio.tipo);
        setValue("descripcion", premio.descripcion);
        setValue("marca", premio.marca);
        setValue("proveedor", premio.proveedor);
      } catch (error) {
        iziToast.error({
          title: "Error",
          message: "Error al obtener el premio.",
          position: "topRight",
        });
        console.error("🚨 Error al obtener el premio:", error);
      }
    };

    fetchPremio();
  }, [id, setValue]);

  const tipoSeleccionado = watch("tipo");

  const onSubmit = async (data) => {
    try {
      await actualizarPremio(id, data);
      iziToast.success({
        title: "Éxito",
        message: "Premio actualizado con éxito.",
        position: "topRight",
      });
      navigate("/listar-premios");
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "No se pudo actualizar el premio.",
        position: "topRight",
      });
      console.error("🚨 Error al actualizar premio:", error);
    }
  };

  return (
    <div className="main-warp" style={{ height: "100%" }}>
      <div className="page-section contact-page" style={{ width: "700px" }}>
        <div className="contact-warp">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-12">
              <div className="contact-text bg-white p-5 rounded shadow">
                <h2 className="text-center mb-4">Editar Premio</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* TIPO DE PREMIO */}
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
                    {errors.tipo && <div className="text-danger">{errors.tipo.message}</div>}
                  </div>

                  {/* DESCRIPCIÓN */}
                  <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción
                    </label>
                    <textarea
                      id="descripcion"
                      className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                      {...register("descripcion", { required: "Ingrese una descripción." })}
                    />
                    {errors.descripcion && <div className="text-danger">{errors.descripcion.message}</div>}
                  </div>

                  {/* MARCA (Condicional) */}
                  <div className="mb-4">
                    <label htmlFor="marca" className="form-label fw-bold">
                      Marca
                    </label>
                    <input
                      type="text"
                      id="marca"
                      className={`form-control ${errors.marca ? "is-invalid" : ""}`}
                      {...register("marca", {
                        required: tipoSeleccionado === "Obsequio" ? "Ingrese la marca del premio." : false,
                      })}
                      disabled={tipoSeleccionado !== "Obsequio"}
                    />
                    {errors.marca && <div className="text-danger">{errors.marca.message}</div>}
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
                      {...register("proveedor", { required: "Ingrese el proveedor del premio." })}
                    />
                    {errors.proveedor && <div className="text-danger">{errors.proveedor.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-success w-100 py-2">
                    Actualizar Premio
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

export default EditarPremio;
