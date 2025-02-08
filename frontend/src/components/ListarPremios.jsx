import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPremios, eliminarPremio } from "../services/premioService";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons-dt";
import "jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ListarPremios = () => {
  const [premios, setPremios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPremios = async () => {
      try {
        const data = await listarPremios();
        setPremios(data);
      } catch (error) {
        console.error("Error al obtener premios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremios();
  }, []);

  useEffect(() => {
    if (!loading && premios.length > 0) {
      if (!$.fn.DataTable.isDataTable("#tbl_premios")) {
        $("#tbl_premios").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
        });
      }
    }
  }, [loading, premios]);

  const handleEliminar = (id) => {
    iziToast.question({
      timeout: 20000,
      overlay: true,
      title: "Confirmación",
      message: "¿Estás seguro de eliminar este premio?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarPremio(id);
              iziToast.success({ title: "Éxito", message: "Premio eliminado con éxito.", position: "topRight" });
              setPremios((prev) => prev.filter((premio) => premio.id_premio !== id));
            } catch (error) {
              iziToast.error({ title: "Error", message: "No se pudo eliminar el premio.", position: "topRight" });
            }
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
          true,
        ],
        [
          "<button>NO</button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
        ],
      ],
    });
  };

  const handleEditar = (id) => {
    navigate(`/editar-premio/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando premios...</p>
      </div>
    );
  }

  return (
    <div className="main-warp">
      <div className="page-section contact-page">
        <div className="contact-warp">
          <div className="row">
            <div className="col-xl-12 mx-auto p-0">
              <div className="contact-text">
                <span>Listado de</span>
                <h2>Premios</h2>
                {premios.length === 0 ? (
                  <div className="alert alert-warning text-center">No hay premios disponibles.</div>
                ) : (
                  <div className="table-responsive" style={{ maxHeight: "600px", overflowY: "auto" }}>
                    <table className="table table-bordered table-hover align-middle" id="tbl_premios" style={{ fontSize: "1rem", width: "100%", margin: "0 auto" }}>
                      <thead className="table-dark">
                        <tr>
                          <th>ID Premio</th>
                          <th>Tipo</th>
                          <th>Descripción</th>
                          <th>Marca</th>
                          <th>Proveedor</th>
                          <th>Fecha de Creación</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {premios.map((premio) => (
                          <tr key={premio.id_premio}>
                            <td>{premio.id_premio}</td>
                            <td>{premio.tipo}</td>
                            <td>{premio.descripcion}</td>
                            <td>{premio.marca}</td>
                            <td>{premio.proveedor}</td>
                            <td>{new Date(premio.fecha_creacion).toLocaleString()}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditar(premio.id_premio)}>
                                  ✏️ Editar
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(premio.id_premio)}>
                                  🗑️ Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarPremios;