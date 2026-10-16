// ESTA PAGINA GESTION ES PARA ADMINISTRAR LOS PACIENTES EN LA VISTA DE RECEPCIONISTA (ANTES gestion.html Y gestion.js)

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtener } from "../core/almacenamiento.js";

const storageKey = "fichas";

function obtenerPacientes() { // ESTA FUNCION CARGA LOS PACIENTES

    return obtener(storageKey);

}

function filtrarPacientes(pacientes, filtroPaciente, filtroCodunico, filtroRutTutor, filtroEspecie) {

    const textoPaciente = filtroPaciente.trim().toLowerCase();
    const textoCodUnico = filtroCodunico.trim().toLowerCase();
    const textoRutTutor = filtroRutTutor.trim().toLowerCase();
    const especieSeleccionada = filtroEspecie.trim().toLowerCase();

    return pacientes.filter(paciente => {

        const nombrePaciente = String(paciente.mascota ?? "").toLocaleLowerCase();
        const codUnico = String(paciente.codUnico ?? "").toLowerCase();
        const rutTutor = String(paciente.rut ?? "").toLowerCase();
        const especie = String(paciente.especie ?? "").toLowerCase();

        const coicidePaciente = nombrePaciente.includes(textoPaciente);
        const coincideCodUnico = codUnico.includes(textoCodUnico);
        const coincideRutTutor = rutTutor.includes(textoRutTutor);
        const coincideEspecie = !especieSeleccionada || especie === especieSeleccionada;

        return (coicidePaciente && coincideCodUnico && coincideRutTutor && coincideEspecie);

    });

}

function Gestion() {

    const navigate = useNavigate();

    const [filtroPaciente, setFiltroPaciente] = useState("");
    const [filtroCodunico, setFiltroCodunico] = useState("");
    const [filtroRutTutor, setFiltroRutTutor] = useState("");
    const [filtroEspecie, setFiltroEspecie] = useState("");

    const [paginaActual, setPaginaActual] = useState(1);
    const [pacientesPorPagina, setPacientesPorPagina] = useState(10);

    const pacientesFiltrados = filtrarPacientes(obtenerPacientes(), filtroPaciente, filtroCodunico, filtroRutTutor, filtroEspecie);

    // ESTO ANTES ESTABA EN actualizarTabla()
    const totalPacientes = pacientesFiltrados.length;
    const totalPaginas = Math.ceil(totalPacientes / pacientesPorPagina);

    let pagina = paginaActual;

    if (pagina > totalPaginas && totalPaginas > 0) {
        pagina = totalPaginas;
    }

    const inicio = (pagina -1) * pacientesPorPagina;
    const fin = inicio + pacientesPorPagina;
    const pacientesPagina = pacientesFiltrados.slice(inicio, fin);

    // AL CAMBIAR UN FILTRO SE VUELVE A LA PRIMERA PAGINA
    function cambiarFiltro(setFiltro) {

        return event => {
            setFiltro(event.target.value);
            setPaginaActual(1);
        };

    }

    function paginaSiguiente() {

        if (pagina < totalPaginas) {
            setPaginaActual(pagina + 1);
        }

    }

    function paginaAnterior() {

        if (pagina > 1) {
            setPaginaActual(pagina - 1);
        }

    }

    function cambiarCantidad(event) {

        setPacientesPorPagina(Number(event.target.value));
        setPaginaActual(1);

    }

    // ESTO ANTES ESTABA EN renderPaginacion()
    const numeros = [];

    for (
        let numero = 1;
        numero <= totalPaginas;
        numero++
    ) {
        numeros.push(numero);
    }

    return (
        <main className="contenido-main">

            {/* ESTE ES EL COMIENZO DEL BLOQUE PARA GESTIONAR LOS PACIENTES */}
            <section className="gestion-pacientes">

                <div>

                    <button type="button">
                        <Link to="/crearFicha">Nuevo Paciente</Link>
                    </button>

                    <h1>Gestión de Pacientes</h1>


                    {/* ESTE ES LA BARRA DE BUSQUEDA */}

                    <div className="controlBusqueda">

                        <input type="text" id="filtroPaciente" placeholder="Nombre del paciente" value={filtroPaciente} onChange={cambiarFiltro(setFiltroPaciente)} />{" "}

                        <input type="text" id="filtroCodunico" placeholder="Código Único" value={filtroCodunico} onChange={cambiarFiltro(setFiltroCodunico)} />{" "}

                        <input type="text" id="filtroRutTutor" placeholder="Rut Tutor" value={filtroRutTutor} onChange={cambiarFiltro(setFiltroRutTutor)} />{" "}

                        <select id="filtro-especie" value={filtroEspecie} onChange={cambiarFiltro(setFiltroEspecie)}>
                            <option value="">Especie (Todas)</option>
                            <option value="Canino">Canino</option>
                            <option value="Felino">Felino</option>
                            <option value="Exótico">Exótico</option>
                        </select>

                        <div className="filtroCantidad">

                            <label htmlFor="cantidadPacientes">Mostrar:</label>{" "}

                            <select id="cantidadPacientes" value={pacientesPorPagina} onChange={cambiarCantidad}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>

                        </div>

                    </div>

                    {/* ESTA ES LA BARRA DE BUSQUEDA */}

                    {/* ESTA ES LA TABLA DONDE ESTARAN LOS PACIENTES */}
                    <div className="tablaResponsive table-responsive">

                        <table className="tablaGeneral">

                            <thead>

                                <tr>

                                    <th>Código Único</th>
                                    <th>Paciente</th>
                                    <th>Especie</th>
                                    <th>RUT Tutor</th>
                                    <th>Tutor</th>
                                    <th>Última Visita</th>
                                    <th>Acciones</th>

                                </tr>

                            </thead>

                            <tbody id="tablaPacientes">

                                {pacientesPagina.map((paciente, indice) => (

                                    <tr key={`${paciente.codUnico}-${indice}`}>

                                        <td data-campo="codUnico">{paciente.codUnico ?? ""}</td>
                                        <td data-campo="mascota">{paciente.mascota ?? ""}</td>
                                        <td data-campo="especie">{paciente.especie ?? ""}</td>
                                        <td data-campo="rut">{paciente.rut ?? ""}</td>
                                        <td data-campo="nombreTutor">{paciente.nombreTutor ?? ""}</td>
                                        <td data-campo="ultimaVisita"></td>
                                        <td>
                                            <div className="accionesTabla">
                                                <button type="button" className="btnHistorial" data-accion="historial"
                                                    onClick={() => navigate(`/historial/${encodeURIComponent(paciente.codUnico)}`)}>Historial</button>
                                            </div>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                    {/* ESTA ES LA TABLA DONDE ESTARAN LOS PACIENTES */}

                    <div className="paginacion">
                        <button type="button" id="paginaAnterior" disabled={totalPaginas === 0 || pagina === 1} onClick={paginaAnterior}>Anterior</button>
                        <div id="numerosPaginas">
                            {numeros.map(numero => (
                                <button type="button" key={numero} className={numero === pagina ? "activa" : undefined} onClick={() => setPaginaActual(numero)}>{numero}</button>
                            ))}
                        </div>
                        <button type="button" id="paginaSiguiente" disabled={totalPaginas === 0 || pagina === totalPaginas} onClick={paginaSiguiente}>Siguiente</button>
                    </div>

                </div>

            </section>
            {/* ESTE ES EL FINAL DEL BLOQUE PARA GESTIONAR LOS PACIENTES */}

        </main>
    );

}

export default Gestion;
