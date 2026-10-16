// ESTA PAGINA PACIENTES SERA PARA VER DE FORMA GENERAL A LOS PACIENTES PARA USO DE LA CLINICA (ANTES pacientes.html Y pacientes.js)

import { useState } from "react";
import { obtener, reemplazar } from "../core/almacenamiento.js";

const storageKey = "agendamientos";

// ESTE ES EL BLOQUE PARA LA GESTION DE CITAS

function cargarCitasAgendadas(agendamientos) { // FUNCION PARA ORDENAR LAS CITAS AGENDADAS POR FECHA

    const citasAgendadas = {};

    agendamientos.filter(cita => cita.estadoSolicitud === "agendada").forEach(cita => {

        if(!citasAgendadas[cita.fechaAgendar]) {
            citasAgendadas[cita.fechaAgendar] = [];
        }

        citasAgendadas[cita.fechaAgendar].push({
            hora: cita.horaCita,
            mascota: cita.mascota,
            codigo: cita.codUnico
        });

    });

    return citasAgendadas;

}

const horasAgenda = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
]

const nombresMeses = [ // ESTO SON DATOS DE PRUEBA PORQUE SE USARA UNA API PARA EL CALENDARIO
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

function formatoFecha(fecha) { // ESTO ES PARA SACAR EL FORMATO DESEADO DE LA FECHA

    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;

}

function nombreDia(fecha) { // ESTA FUNCION ES PARA MOSTRAR LA FECHA EN EL CRONOGRAMA

    return fecha.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric"});

}

// ESTE BLOQUE SERÁ PARA MANEJAR LA TABLA DE SOLICITUDES

function formatoFechaSolicitud(fecha) {

    if (!fecha) {
        return "—";
    }

    const partes = fecha.split("-");

    if (partes.length !== 3) {
        return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function Pacientes() {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date(2026, 8, 2));
    const [mesMostrado, setMesMostrado] = useState(new Date(2026, 8, 1));

    // AHORA SE USA obtener() DE almacenamiento.js PARA QUE TODAS LAS PAGINAS VEAN LOS MISMOS DATOS
    const [solicitudesGuardadas, setSolicitudesGuardadas] = useState(() => obtener(storageKey));

    const [citaSeleccionada, setCitaSeleccionada] = useState(null); // LA CITA QUE SE MUESTRA EN LA VENTANA (null = VENTANA CERRADA)

    const citas = cargarCitasAgendadas(solicitudesGuardadas); // EL CRONOGRAMA SE ACTUALIZA SOLO CUANDO CAMBIAN LAS SOLICITUDES

    function seleccionarFecha(fecha) {  // ESTA FUNCION ES PARA AL SELECCIONAR ALGUN DIA SE CAMBIE A ESE DIA

        const nuevaFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

        setFechaSeleccionada(nuevaFecha);
        setMesMostrado(new Date(nuevaFecha.getFullYear(), nuevaFecha.getMonth(), 1));

    }

    function cambiarMes(direccion) { // ESTA FUNCION ES PARA MOSTRAR EL MES SIGUIENTE O ANTERIOR

        setMesMostrado(new Date(mesMostrado.getFullYear(), mesMostrado.getMonth() + direccion, 1));

    }

    function abrirPopupCita(cita) { // ESTA FUNCION MUESTRA LA VENTANA CON LOS DETALLES DE LA CITA PRESIONADA

        setCitaSeleccionada(cita);

    }

    function cerrarPopupCita() {  // ESTA FUNCION SACA LA VENTANA DE LOS DETALLES DE LA CITA

        setCitaSeleccionada(null);

    }

    function cerrarAlHacerClicFuera(event) { // ESTA FUNCION ES PARA CERRAR EL POPUP AL HACER CLIC FUERA DE LA VENTANA

        if (event.target === event.currentTarget) {
            cerrarPopupCita();
        }

    }

    function confirmarSolicitud(solicitud) {

        const solicitudes = [...obtener(storageKey)];

        const indice = solicitudes.findIndex(cita => cita.codUnico === solicitud.codUnico);

        if (indice !== -1) {
            solicitudes[indice] = { ...solicitudes[indice], estadoSolicitud: "agendada" };
        }

        reemplazar(storageKey, solicitudes);

        setSolicitudesGuardadas(solicitudes);

    }

    function rechazarSolicitud(solicitud) {

        const solicitudesRestantes = obtener(storageKey).filter(cita => cita.codUnico !== solicitud.codUnico);

        reemplazar(storageKey, solicitudesRestantes);

        setSolicitudesGuardadas(solicitudesRestantes);

    }

    // ESTO ANTES ESTABA EN renderCalendario()
    const titulo = `${nombresMeses[mesMostrado.getMonth()]} ${mesMostrado.getFullYear()}`;

    const primerDia = new Date(mesMostrado.getFullYear(), mesMostrado.getMonth(), 1);

    const offset = (primerDia.getDay() + 6) % 7;
    const diasMes = new Date( mesMostrado.getFullYear(), mesMostrado.getMonth() + 1,0).getDate();

    const diasMesAnterior = new Date( mesMostrado.getFullYear(), mesMostrado.getMonth(), 0).getDate();

    const totalCeldas = Math.ceil((offset + diasMes) / 7) * 7;

    const diasCalendario = [];

    for (let i = 0; i < totalCeldas; i++) {

        const clases = ["dia-calendario"];

        let dia;
        let mes = mesMostrado.getMonth();
        let anio = mesMostrado.getFullYear();

        if (i < offset) { // ESTA ES PARA CAMBIAR EL MES

            dia = diasMesAnterior - offset + i + 1;
            mes--;

            if (mes < 0) {
                mes = 11; anio--;
            }

            clases.push("otro-mes");

        } else if (i >= offset + diasMes) {

            dia = i - offset - diasMes + 1;
            mes++;

            if (mes > 11) {
                mes = 0; anio++;
            }

            clases.push("otro-mes");

        } else {

            dia = i - offset + 1;
        }


        const fecha = new Date(anio, mes, dia);

        if (formatoFecha(fecha) === formatoFecha(new Date())) { // ESTO ES PARA EL CRONOGRAMA
            clases.push("hoy");
        }

        if (formatoFecha(fecha) === formatoFecha(fechaSeleccionada)) {
            clases.push("seleccionado");
        }

        diasCalendario.push({ dia, fecha, clase: clases.join(" ") });
    }

    // ESTO ANTES ESTABA EN renderCronograma()
    const fechaKey = formatoFecha(fechaSeleccionada);
    const citasDelDia = citas[fechaKey] || [];

    // ESTO ANTES ESTABA EN renderSolicitudes()
    const solicitudes = solicitudesGuardadas.filter(solicitud => solicitud.estadoSolicitud === "pendiente");

    return (
        <main className="contenido-main">

            {/* ESTE ES EL COMIENZO DEL BLOQUE PARA LA VISTA DE LA RECEPCIONISTA PARA VER LAS CITAS */}
            <section className="seccion-gestion">

                <h1>Gestión de agenda y solicitudes</h1>

                <div className="calendarioContenedor">

                    <div className="calendario">

                        <div className="calendarioNav">
                            <button type="button" className="btnNavMes" onClick={() => cambiarMes(-1)} aria-label="Mes anterior">&lsaquo;</button>
                            <h2 id="mesAno">{titulo}</h2>
                            <button type="button" className="btnNavMes" onClick={() => cambiarMes(1)} aria-label="Mes siguiente">&rsaquo;</button>
                        </div>

                        <div className="diasSemana">
                            <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span>
                            <span>Vie</span><span>Sab</span><span>Dom</span>
                        </div>

                        <div className="diasCalendario" id="diasCalendario">
                            {diasCalendario.map(celda => (
                                <button type="button" key={formatoFecha(celda.fecha)} className={celda.clase} onClick={() => seleccionarFecha(celda.fecha)}>{celda.dia}</button>
                            ))}
                        </div>

                        <div className="leyendaCalendario">
                            Seleccione un día
                        </div>

                    </div>

                    <div className="cronogramaPanel">

                        <h3 id="fechaSeleccionada">{nombreDia(fechaSeleccionada)}</h3>
                        <div className="cronograma" id="cronograma">

                            {horasAgenda.map(hora => {

                                const citasHora = citasDelDia.filter(cita => cita.hora.startsWith(hora.split(":")[0] + ":"));

                                return (
                                    <div className="bloque-hora" key={hora}>

                                        <div className="hora-etiqueta">{`${hora} hrs.`}</div>

                                        <div className="espacio-citas">

                                            {citasHora.length ? (

                                                citasHora.map((cita, indice) => (
                                                    <div className="cita-aprobada" key={`${cita.codigo}-${indice}`} onClick={() => abrirPopupCita(cita)}>
                                                        <strong>{cita.hora}</strong> - {cita.mascota}
                                                    </div>
                                                ))

                                            ) : (

                                                <div className="sin-citas">Sin citas</div>

                                            )}

                                        </div>

                                    </div>
                                );

                            })}

                        </div>

                    </div>

                </div>

                <div className="solicitudesPanel">

                    <div className="solicitudesTitulo">
                        <div>
                            <h2>Solicitudes pendientes</h2>
                            <p>Solicitudes que requieren de recepcion</p>
                        </div>
                        <span className="contadorSolicitudes">{`${solicitudes.length} ${solicitudes.length === 1? "Pendiente" : "Pendientes"}`}</span>
                    </div>

                </div>

                <div className="tablaResponsive">

                    <table className="tablaGeneral">

                        <thead>
                            <tr>
                                <th>Fecha / Hora</th>
                                <th>Mascota</th>
                                <th>Código Único</th>
                                <th>Tutor</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody id="solicitudesPendientes">

                            {solicitudes.map((solicitud, indice) => (

                                <tr key={`${solicitud.codUnico}-${indice}`}>

                                    <td>

                                        <span data-campo="fecha">{formatoFechaSolicitud(solicitud.fechaAgendar)}</span><br />
                                        <span data-campo="hora">{solicitud.horaCita ?? "—"}</span>

                                        <div className="edicionFechaHora" hidden>
                                            <input type="date" className="inputFecha" />{" "}
                                            <input type="time" className="inputHora" min="08:00" max="16:00" step="1800" />
                                        </div>

                                    </td>
                                    <td data-campo="mascota">{solicitud.mascota ?? "—"}</td>
                                    <td data-campo="codigo">{solicitud.codUnico ?? "—"}</td>
                                    <td data-campo="tutor">{solicitud.tutor ?? "—"}</td>
                                    <td data-campo="telefono">{solicitud.telefonoCita ?? "—"}</td>
                                    <td data-campo="correo">{solicitud.correo ?? "—"}</td>
                                    <td>

                                        <div className="accionesTabla">
                                            <button className="btnConfirmar" type="button" onClick={() => confirmarSolicitud(solicitud)}>Confirmar</button>{" "}
                                            <button className="btnReagendar" type="button">Reagendar</button>{" "}
                                            <button className="btnRechazar" type="button" onClick={() => rechazarSolicitud(solicitud)}>Rechazar</button>
                                        </div>

                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>
            {/* ESTE ES EL FINAL DEL BLOQUE PARA LA VISTA DE LA RECEPCIONISTA PARA VER LAS CITAS */}

            <div id="popupCita" className="modal" style={citaSeleccionada ? { display: "block" } : undefined} onClick={cerrarAlHacerClicFuera}>
                <div className="modal-contenido">
                    <span className="cerrar" onClick={cerrarPopupCita}>&times;</span>
                    <h2>Detalles de la Cita</h2>
                    <p><strong>Mascota:</strong> {citaSeleccionada?.mascota}</p>
                    {/* EL FORMULARIO DE AGENDAR TODAVIA NO PIDE EL MOTIVO */}
                    <p><strong>Motivo:</strong> —</p>
                    <p><strong>Hora:</strong> {citaSeleccionada?.hora}</p>

                    <div className="acciones-modal">
                        <button type="button">Llegó / Asistió</button>{" "}
                        <button type="button">No asistió</button>{" "}
                        <button type="button">Reagendar cita</button>{" "}
                        <button type="button">Cancelar cita</button>
                    </div>
                </div>
            </div>

        </main>
    );

}

export default Pacientes;
