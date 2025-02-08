import React, { useEffect, useState } from "react";
import { listarVideos, eliminarVideo } from "../services/videoService";
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

const ListarVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await listarVideos();
        setVideos(data);
      } catch (error) {
        console.error("🚨 Error al obtener videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (!loading && videos.length > 0) {
      // Verificar si el DataTable ya está inicializado
      if (!$.fn.DataTable.isDataTable("#tbl_video")) {
        $("#tbl_video").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
        });
      }
    }
  }, [loading, videos]);

  const handleEliminar = (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      title: "Confirmación",
      message: "¿Estás seguro de eliminar este video?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarVideo(id);
              iziToast.success({
                title: "Éxito",
                message: "Video eliminado con éxito.",
                position: "topRight",
              });
              setVideos((prev) => prev.filter((video) => video.id_video !== id));
            } catch (error) {
              iziToast.error({
                title: "Error",
                message: "No se pudo eliminar el video.",
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
    navigate(`/editar-video/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando videos...</p>
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
                <h2>Videos</h2>
                {videos.length === 0 ? (
                  <div className="alert alert-warning text-center">
                    No hay videos disponibles.
                  </div>
                ) : (
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    <table
                      className="table table-bordered table-hover align-middle"
                      id="tbl_video"
                      style={{
                        fontSize: "1rem",
                        width: "100%",
                        margin: "0 auto",
                      }}
                    >
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: "10%" }}>ID Video</th>
                          <th style={{ width: "30%" }}>Vista Previa</th>
                          <th style={{ width: "20%" }}>Descripción</th>
                          <th style={{ width: "20%" }}>Proyecto</th>
                          <th style={{ width: "15%" }}>Fecha de Subida</th>
                          <th style={{ width: "15%" }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.map((video) => (
                          <tr key={video.id_video}>
                            <td>{video.id_video}</td>
                            <td>
                              <video
                                width="250"
                                height="150"
                                controls
                                style={{ display: "block", margin: "0 auto" }}
                              >
                                <source
                                  src={`http://localhost:5000/media/videos/${video.nombreArchivo}`}
                                  type="video/mp4"
                                />
                                Tu navegador no soporta el elemento de video.
                              </video>
                            </td>
                            <td>{video.descripcion || "🔹 Sin descripción"}</td>
                            <td>{video.proyecto?.titulo || "🔹 Sin proyecto"}</td>
                            <td>
                              {video.fechaSubida
                                ? new Date(video.fechaSubida).toLocaleString()
                                : "🔸 Fecha no disponible"}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() => handleEditar(video.id_video)}
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleEliminar(video.id_video)}
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

export default ListarVideos;
