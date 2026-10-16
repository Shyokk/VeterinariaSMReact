// ESTA PAGINA NUEVODIAGNOSTICO SERA PARA LA VISTA DE DOCTOR, PARA REGISTRAR LOS DATOS DE DIAGNOSTICO DEL PACIENTE (ANTES nuevoDiagnostico.html Y nuevaConsulta.js)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { guardar, descargar, obtener } from "../core/almacenamiento.js";
import { convertirElemento } from "../core/datos.js";
import { obtenerPacienteActual, obtenerPacienteCodUnico } from "../core/obtenerPaciente.js";

const CONFIG = {tabla: "consultas", archivo: "../assets/data/consultas.json"};

// ESTOS SON LOS DATOS DEL FORMULARIO VACIO (EN EL MISMO ORDEN QUE SE GUARDABAN ANTES)
const inicial = {
    codUnico: "",
    "fecha-consulta": "",
    "motivo-consulta": "",
    sintomas: "",
    diagnostico: "",
    tratamiento: "",
    veterinario: "",
    observaciones: ""
};

function NuevoDiagnostico() {

    const { codUnico } = useParams(); // ANTES obtenerCodUnicoURL()

    const [datos, setDatos] = useState(inicial);

    const paciente = obtenerPacienteCodUnico(codUnico) ?? {}; // ANTES mostrarPaciente()

    useEffect(() => { // MUESTRA EN CONSOLA LOS MISMOS ERRORES QUE ANTES SI FALTA EL CODIGO O EL PACIENTE

        obtenerPacienteActual(codUnico);

        if (!codUnico) {
            console.error("No se encontró codUnico");
        }

    }, [codUnico]);

    function cambiar(event) { // GUARDA EN EL ESTADO LO QUE SE ESCRIBE EN CADA CAMPO

        const { name } = event.target;

        setDatos({ ...datos, [name]: convertirElemento(event.target) });

    }

    function enviar(event) { event.preventDefault();

        if (!codUnico) return; // SIN CODIGO NO SE GUARDA, IGUAL QUE ANTES

        const formulario = event.target;

        if (!formulario.reportValidity()) { // VALIDA LAS REGLAS DEL FORMULARIO
            return;
        }

        const registro = { ...datos }; // OBTIENE LOS DATOS

        registro.codUnico = codUnico;

        registro.fechaSolicitud = new Date().toISOString(); // REGISTRA CUANDO SE HIZO LA SOLICITUD

        guardar(CONFIG.tabla, registro); // LOS GUARDA EN LA TABLA

        setDatos(inicial); // LIMPIA EL FORMULARIO

        console.log(`${CONFIG.tabla}:`, obtener(CONFIG.tabla));

    }

    function botonDescargar() {

        if (!codUnico) return; // SIN CODIGO EL BOTON NO HACIA NADA

        descargar(CONFIG.tabla);

    }

    return (
        <main className="contenido-main">

            <title>Nuevo Diagnóstico - Veterinaria San Marcos</title>

            <section className="seccion-nuevo-diagnostico">

                <div className="formulario-diagnostico">

                    <h1>Nuevo Diagnóstico</h1>

                    <p>
                        Complete la información de la consulta y registre
                        los antecedentes clínicos del paciente.
                    </p>

                    <form className="formulario-ficha" id="formularioFormularioFicha" method="post" noValidate onSubmit={enviar}>

                        {/* DATOS DEL PACIENTE */}
                        <fieldset>

                            <legend>Datos del paciente</legend>

                            <div className="datoPaciente">

                                <div className="datoPaciente">
                                    <strong className="etiqueta">Nombre del Paciente: </strong>{" "}
                                    <span className="valor" data-campo="mascota">{paciente.mascota ?? ""}</span>
                                </div>

                                <div className="datoPaciente">
                                    <strong className="etiqueta">Rut o Código Único: </strong>{" "}
                                    <span className="valor" data-campo="codUnico">{paciente.codUnico ?? ""}</span>
                                </div>

                            </div>

                        </fieldset>

                        {/* DATOS DE LA CONSULTA */}
                        <fieldset>

                            <legend>Datos de la consulta</legend>

                            <div className="campo-formulario">
                                <label htmlFor="fecha-consulta">Fecha de consulta:</label>{" "}

                                <input
                                    type="date"
                                    id="fecha-consulta"
                                    name="fecha-consulta"
                                    required
                                    value={datos["fecha-consulta"]}
                                    onChange={cambiar}
                                />
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="motivo-consulta">Motivo de consulta:</label>{" "}

                                <textarea
                                    id="motivo-consulta"
                                    name="motivo-consulta"
                                    rows="4"
                                    placeholder="Describa el motivo de la consulta"
                                    required
                                    value={datos["motivo-consulta"]}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                        </fieldset>

                        {/* EVALUACIÓN DEL PACIENTE */}
                        <fieldset>

                            <legend>Evaluación del paciente</legend>

                            <div className="campo-formulario">
                                <label htmlFor="sintomas">Síntomas y observaciones:</label>{" "}

                                <textarea
                                    id="sintomas"
                                    name="sintomas"
                                    rows="5"
                                    placeholder="Ingrese los síntomas y observaciones del paciente"
                                    required
                                    value={datos.sintomas}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="diagnostico">Diagnóstico:</label>{" "}

                                <textarea
                                    id="diagnostico"
                                    name="diagnostico"
                                    rows="5"
                                    placeholder="Ingrese el diagnóstico del paciente"
                                    required
                                    value={datos.diagnostico}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                        </fieldset>

                        {/* TRATAMIENTO */}
                        <fieldset>

                            <legend>Tratamiento</legend>

                            <div className="campo-formulario">
                                <label htmlFor="tratamiento">Tratamiento indicado:</label>{" "}

                                <textarea
                                    id="tratamiento"
                                    name="tratamiento"
                                    rows="5"
                                    placeholder="Ingrese el tratamiento indicado para el paciente"
                                    required
                                    value={datos.tratamiento}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                        </fieldset>

                        {/* DATOS DEL PROFESIONAL */}
                        <fieldset>

                            <legend>Datos del profesional</legend>

                            <div className="campo-formulario">
                                <label htmlFor="veterinario">Veterinario responsable:</label>{" "}

                                <input
                                    type="text"
                                    id="veterinario"
                                    name="veterinario"
                                    placeholder="Ingrese el nombre del veterinario"
                                    required
                                    value={datos.veterinario}
                                    onChange={cambiar}
                                />
                            </div>

                        </fieldset>

                        {/* OBSERVACIONES ADICIONALES */}
                        <fieldset>

                            <legend>Observaciones adicionales</legend>

                            <div className="campo-formulario">
                                <label htmlFor="observaciones">Observaciones:</label>{" "}

                                <textarea
                                    id="observaciones"
                                    name="observaciones"
                                    rows="5"
                                    placeholder="Ingrese observaciones adicionales"
                                    value={datos.observaciones}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                        </fieldset>

                        {/* BOTONES */}
                        <div className="acciones-formulario">

                            <div>

                                <button type="submit" className="btnSolicitar">Crear ficha </button>{" "}

                                <button type="button" data-accion="descargar" onClick={botonDescargar}>Descargar JSON</button>

                            </div>

                        </div>

                    </form>

                </div>

            </section>

        </main>
    );

}

export default NuevoDiagnostico;
