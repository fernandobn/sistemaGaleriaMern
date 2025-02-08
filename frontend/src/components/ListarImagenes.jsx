import React, { useEffect, useState } from "react";
import { listarImagenes, eliminarImagen } from "../services/imagenService";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons-dt";
import "jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ListarImagenes = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const data = await listarImagenes();
        setImagenes(data);
      } catch (error) {
        console.error("🚨 Error al obtener imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagenes();
  }, []);

  useEffect(() => {
    if (!loading && imagenes.length > 0) {
      if (!$.fn.DataTable.isDataTable("#tbl_imagenes")) {
        $("#tbl_imagenes").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
        });
      }
    }
  }, [loading, imagenes]);

  const handleEliminar = (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      title: "Confirmación",
      message: "¿Estás seguro de eliminar esta imagen?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarImagen(id);
              iziToast.success({
                title: "Éxito",
                message: "Imagen eliminada con éxito.",
                position: "topRight",
              });
              setImagenes((prev) =>
                prev.filter((imagen) => imagen.id_imagen !== id)
              );
            } catch (error) {
              iziToast.error({
                title: "Error",
                message: "No se pudo eliminar la imagen.",
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
    navigate(`/editar-imagen/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando imágenes...</p>
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
                <h2>Imágenes</h2>
                {imagenes.length === 0 ? (
                  <div className="alert alert-warning text-center">
                    No hay imágenes disponibles.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover align-middle"
                      id="tbl_imagenes"
                      style={{
                        fontSize: "1rem",
                        width: "100%",
                        margin: "0 auto",
                      }}
                    >
                      <thead className="table-dark">
                        <tr>
                          <th>ID Imagen</th>
                          <th>Vista Previa</th>
                          <th>Descripción</th>
                          <th>Fecha de Subida</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {imagenes.map((imagen) => (
                          <tr key={imagen.id_imagen}>
                            <td>{imagen.id_imagen}</td>
                            <td>
                              {imagen.nombreArchivo ? (
                                <img
                                  src={`http://localhost:5000/media/images/${imagen.nombreArchivo}`}
                                  alt="Vista previa"
                                  width="150"
                                  className="img-thumbnail"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/150";
                                  }}
                                />
                              ) : (
                                <p>⚠️ Imagen no disponible</p>
                              )}
                            </td>
                            <td>{imagen.descripcion || "🔹 Sin descripción"}</td>
                            <td>
                              {imagen.fechaSubida
                                ? new Date(imagen.fechaSubida).toLocaleString()
                                : "🔸 Fecha no disponible"}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() => handleEditar(imagen.id_imagen)}
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleEliminar(imagen.id_imagen)}
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

export default ListarImagenes;
