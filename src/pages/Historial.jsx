// ESTA PAGINA HISTORIAL SERA PARA LOS DOCTORES DONDE PODRÁN VER EL PACIENTE COMO DOCTOR, MODIFICAR DATOS, ETC (ANTES historial.html Y historial.js)

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtener } from "../core/almacenamiento.js";

const storageKey = "fichas";

function Historial() {

    const { codUnico } = useParams(); // ANTES SE LEIA DE ?codUnico= EN LA URL
    const navigate = useNavigate();

    const [previewAbierto, setPreviewAbierto] = useState(false);

    function obtenerPaciente() {

        const pacientes = obtener(storageKey);
        return pacientes.find(paciente => paciente.codUnico === codUnico);

    }

    const paciente = obtenerPaciente() ?? {}; // SI NO SE ENCUENTRA, LOS CAMPOS QUEDAN VACIOS COMO ANTES

    useEffect(() => {

        if (!obtenerPaciente()) {
            console.error("No se encontró paciente");
        }

    }, [codUnico]);

    function irAVista(vista) { // LOS BOTONES LLEVAN AL FORMULARIO CON EL CODIGO DEL PACIENTE

        if (!vista || !codUnico) return;

        navigate(`/${vista}/${encodeURIComponent(codUnico)}`);

    }

    function abrirPreviewConsulta() {
        setPreviewAbierto(true);
    }

    function cerrarPreviewConsulta() {
        setPreviewAbierto(false);
    }

    return (
        <main className="contenido-main">

            {/* ESTE ES EL COMIENZO DEL BLOQUE PARA VER EL HISTORIAL DE LOS PACIENTES */}
            <section className="seccion-historial">

                <h1>Historial Clínico del Paciente</h1>

                <div className="infoPaciente">

                    <div className="datoTutor">
                        <div>
                            <strong className="etiqueta">Rut del Tutor: </strong>{" "}
                            <span className="valor" id="rut">{paciente.rut ?? ""}</span>
                        </div>

                        <div>
                            <strong className="etiqueta">Nombre del Tutor: </strong>{" "}
                            <span className="valor" id="nombreTutor">{paciente.nombreTutor ?? ""}</span>
                        </div>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Nombre del Paciente: </strong>{" "}
                        <span className="valor" id="nombreMascota">{paciente.mascota ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Rut o Código Único: </strong>{" "}
                        <span className="valor" id="codUnico">{paciente.codUnico ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Fecha de nacimiento: </strong>{" "}
                        <span className="valor" id="nacimientoMascota">{paciente.nacimientoMascota ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Edad: </strong>{" "}
                        <span className="valor" id="edadMascota">{paciente.edadMascota ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Pelaje:</strong>{" "}
                        <span className="valor" id="pelajeMascota">{paciente.pelajeMascota ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Ciudad:</strong>{" "}
                        <span className="valor" id="ciudadMascota">{paciente.ciudadMascota ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Especie:</strong>{" "}
                        <span className="valor" id="especie">{paciente.especie ?? ""}</span>
                    </div>

                    <div className="datoPaciente">
                        <strong className="etiqueta">Raza:</strong>{" "}
                        <span className="valor" id="raza">{paciente.raza ?? ""}</span>
                    </div>

                </div>

                <div className="contenedorTarjetasHistorial">

                    <div className="grill-tarjetaConsulta">

                        <h1>Consultas</h1>

                        <button type="button" className="btnAccion" data-vista="nuevoDiagnostico" onClick={() => irAVista("nuevoDiagnostico")}>Nueva Consulta</button>

                        <section className="tarjeta-historial">

                            <div className="controlBusqueda">

                                <select name="filtroAno" id="FiltroAno">
                                    <option value="">Año (todos)</option>
                                    <option value="2026">2026</option>
                                    <option value="2025">2025</option>
                                </select>{" "}

                                <select name="filtroMes" id="filtroMes">
                                    <option value="">Mes (Todos)</option>
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                </select>{" "}

                                <select name="filtroDia" id="filtroDia">
                                    <option value="">Día (Todos)</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                </select>{" "}

                                <input type="text" id="busqueda-nombre" placeholder="Buscar por nombre de archivo..." />{" "}
                                <button>Buscar</button>

                            </div>

                            <div className="tablaResponsive">

                                <table className="tablaGeneral">

                                    <thead>
                                        <tr>
                                            <th>Archivo</th>
                                            <th>Fecha</th>
                                            <th>Doctor</th>
                                            <th>Motivo</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>{/* ESTOS SON SOLO EJEMPLOS */}

                                        <tr>
                                            <td>Consulta_General.pdf</td>
                                            <td>15-02-2026</td>
                                            <td>Dra. Ana Gómez</td>
                                            <td>Hilo en el recto anal</td>
                                            <td>
                                                <div className="accionesTabla">
                                                    <button type="button" onClick={abrirPreviewConsulta}>Ver</button>{" "}
                                                    <button type="button">Des</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Chequeo_Rutina.pdf</td>
                                            <td>20-01-2025</td>
                                            <td>Dr. Juan Pérez</td>
                                            <td>Vista nublada</td>
                                            <td>
                                                <div className="accionesTabla">
                                                    <button type="button" onClick={abrirPreviewConsulta}>Ver</button>{" "}
                                                    <button type="button">Des</button>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>{/* ESTOS SON SOLO EJEMPLOS */}

                                </table>

                            </div>

                            <div className="paginacion">
                                <button type="button" disabled>Anterior</button>{" "}
                                <button type="button">1</button>{" "}
                                <button type="button">2</button>{" "}
                                <button type="button">Siguiente</button>
                            </div>

                        </section>

                    </div>

                    {/* ESTE ES PARA LOS EXAMENES */}

                    <div className="grill-tarjetaExamen">

                        <h1>Examenes</h1>

                        <button type="button" className="btnAccion" data-vista="nuevoExamen" onClick={() => irAVista("nuevoExamen")}>Nuevo Examen</button>

                        <section className="tarjeta-historial">

                            <div className="controlBusqueda">

                                <select name="filtroAno" id="FiltroAno">
                                    <option value="">Año (todos)</option>
                                    <option value="2026">2026</option>
                                    <option value="2025">2025</option>
                                </select>{" "}

                                <select name="filtroMes" id="filtroMes">
                                    <option value="">Mes (Todos)</option>
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                </select>{" "}

                                <select name="filtroDia" id="filtroDia">
                                    <option value="">Día (Todos)</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                </select>{" "}

                                <input type="text" id="busqueda-nombre" placeholder="Buscar por nombre de archivo..." />{" "}
                                <button>Buscar</button>

                            </div>

                            <div className="tablaResponsive">

                                <table className="tablaGeneral">

                                    <thead>
                                        <tr>
                                            <th>Archivo</th>
                                            <th>Fecha</th>
                                            <th>Doctor</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>{/* ESTOS SON SOLO EJEMPLOS */}

                                        <tr>
                                            <td>Consulta_General.pdf</td>
                                            <td>15-02-2026</td>
                                            <td>Dra. Ana Gómez</td>
                                            <td>
                                                <div className="accionesTabla">
                                                    <button type="button" onClick={abrirPreviewConsulta}>Ver</button>{" "}
                                                    <button type="button">Descargar</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Chequeo_Rutina.pdf</td>
                                            <td>20-01-2025</td>
                                            <td>Dr. Juan Pérez</td>
                                            <td>
                                                <div className="accionesTabla">
                                                    <button type="button" onClick={abrirPreviewConsulta}>Ver</button>{" "}
                                                    <button type="button">Descargar</button>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>{/* ESTOS SON SOLO EJEMPLOS */}

                                </table>

                                </div>

                                <div className="paginacion">
                                    <button type="button" disabled>Anterior</button>{" "}
                                    <button type="button">1</button>{" "}
                                    <button type="button">2</button>{" "}
                                    <button type="button">Siguiente</button>
                                </div>

                        </section>

                    </div>

                    {/* ESTE ES PARA LAS RECETAS */}

                    <div className="grill-tarjetaReceta">

                        <h1>Recetas</h1>

                        <button type="button" className="btnAccion" data-vista="nuevaReceta" onClick={() => irAVista("nuevaReceta")}>Nueva Receta</button>

                        <section className="tarjeta-historial">

                            <div className="controlBusqueda">

                                <select name="filtroAno" id="FiltroAno">
                                    <option value="">Año (todos)</option>
                                    <option value="2026">2026</option>
                                    <option value="2025">2025</option>
                                </select>{" "}

                                <select name="filtroMes" id="filtroMes">
                                    <option value="">Mes (Todos)</option>
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                </select>{" "}

                                <select name="filtroDia" id="filtroDia">
                                    <option value="">Día (Todos)</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                </select>{" "}

                                <input type="text" id="busqueda-nombre" placeholder="Buscar por nombre de archivo..." />{" "}
                                <button>Buscar</button>

                            </div>

                            <div className="tablaResponsive">
                                <table className="tablaGeneral">

                                    <thead>
                                        <tr>
                                            <th>Archivo</th>
                                            <th>Fecha</th>
                                            <th>Doctor</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>{/* ESTOS SON SOLO EJEMPLOS */}

                                        <tr>
                                            <td>Consulta_General.pdf</td>
                                            <td>15-02-2026</td>
                                            <td>Dra. Ana Gómez</td>
                                            <td>
                                                <div className="accionesTabla">
                                                    <button type="button" onClick={abrirPreviewConsulta}>Ver</button>{" "}
                                                    <button type="button">Descargar</button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Chequeo_Rutina.pdf</td>
                                            <td>20-01-2025</td>
                                            <td>Dr. Juan Pérez</td>
                                            <td>
                                                <div className="accionesTabla">
                                                    <button type="button" onClick={abrirPreviewConsulta}>Ver</button>{" "}
                                                    <button type="button">Descargar</button>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>{/* ESTOS SON SOLO EJEMPLOS */}

                                </table>
                            </div>

                            <div className="paginacion">
                                <button type="button" disabled>Anterior</button>{" "}
                                <button type="button">1</button>{" "}
                                <button type="button">2</button>{" "}
                                <button type="button">Siguiente</button>
                            </div>

                        </section>

                    </div>

                    <div className="grill-tarjetaVacuna">

                        <h1>Vacunas</h1>

                        <button type="button" className="btnAccion" data-vista="nuevaVacuna" onClick={() => irAVista("nuevaVacuna")}>Nueva Vauna</button>

                        <section className="tarjeta-vacunas">
                            {/* MI IDEA ES PONER UN SELECTOR DE VACUNAS POR DOSIS Y MOSTRAR LA INFORMACIÓN */}
                        </section>

                    </div>

                </div>

                <div className="previewConsulta" id="previewConsulta" style={previewAbierto ? { display: "flex" } : undefined}>

                    <div>
                        <button onClick={cerrarPreviewConsulta}>x</button>
                        <h2>Vista previa del documento</h2>
                    </div>

                </div>

            </section>
            {/* ESTE ES EL FINAL DEL BLOQUE PARA VER EL HISTORIAL DE LOS PACIENTES */}

        </main>
    );

}

export default Historial;
