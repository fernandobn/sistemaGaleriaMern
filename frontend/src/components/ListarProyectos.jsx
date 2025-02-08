import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarProyectos, eliminarProyecto } from "../services/proyectoService";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons-dt";
import "jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ListarProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const data = await listarProyectos();
        setProyectos(data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  useEffect(() => {
    if (!loading && proyectos.length > 0) {
      // Verificar si la tabla ya está inicializada
      if (!$.fn.DataTable.isDataTable("#tbl_proyectos")) {
        $("#tbl_proyectos").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
        });
      }
    }
  }, [loading, proyectos]);

  const handleEliminar = (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      title: "Confirmación",
      message: "¿Estás seguro de eliminar este proyecto?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarProyecto(id);
              iziToast.success({
                title: "Éxito",
                message: "Proyecto eliminado con éxito.",
                position: "topRight",
              });
              setProyectos((prev) =>
                prev.filter((proyecto) => proyecto.id_proyecto !== id)
              );
            } catch (error) {
              iziToast.error({
                title: "Error",
                message: "No se pudo eliminar el proyecto.",
                position: "topRight",
              });
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
    navigate(`/editar-proyecto/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando proyectos...</p>
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
                <span>Gestión de</span>
                <h2>Proyectos</h2>
                {proyectos.length === 0 ? (
                  <div className="alert alert-warning text-center">
                    No hay proyectos disponibles.
                  </div>
                ) : (
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    <table
                      className="table table-bordered table-hover align-middle"
                      id="tbl_proyectos"
                      style={{
                        fontSize: "1rem",
                        width: "100%",
                        margin: "0 auto",
                      }}
                    >
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: "10%" }}>ID Proyecto</th>
                          <th style={{ width: "30%" }}>Título</th>
                          <th style={{ width: "40%" }}>Descripción</th>
                          <th style={{ width: "15%" }}>Fecha de Creación</th>
                          <th style={{ width: "15%" }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proyectos.map((proyecto) => (
                          <tr key={proyecto.id_proyecto}>
                            <td>{proyecto.id_proyecto}</td>
                            <td>{proyecto.titulo}</td>
                            <td>{proyecto.descripcion}</td>
                            <td>
                              {new Date(proyecto.fecha_creacion).toLocaleString()}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() => handleEditar(proyecto.id_proyecto)}
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleEliminar(proyecto.id_proyecto)}
                                >
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

export default ListarProyectos;
