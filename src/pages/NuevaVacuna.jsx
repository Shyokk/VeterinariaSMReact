// ESTA PAGINA NUEVAVACUNA SERA PARA LA VISTA DE DOCTOR, PARA REGISTRAR LAS VACUNAS DEL PACIENTE (ANTES nuevaVacuna.html Y nuevaVacuna.js)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { guardar, descargar, obtener } from "../core/almacenamiento.js";
import { convertirElemento } from "../core/datos.js";
import { obtenerPacienteActual, obtenerPacienteCodUnico } from "../core/obtenerPaciente.js";

const CONFIG = {tabla: "vacunas", archivo: "../assets/data/vacunas.json"};

// ESTOS SON LOS DATOS DEL FORMULARIO VACIO (EN EL MISMO ORDEN QUE SE GUARDABAN ANTES)
const inicial = {
    codUnico: "",
    vacuna: "",
    "fecha-aplicacion": "",
    "proxima-dosis": "",
    veterinario: "",
    observaciones: ""
};

function NuevaVacuna() {

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

            <title>Nueva Vacuna - Veterinaria San Marcos</title>

            <section className="seccion-nueva-vacuna">

                <div className="formulario-vacuna">

                    <h1>Registrar Vacuna</h1>

                    <p>
                        Complete la información correspondiente a la vacunación
                        del paciente.
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

                        {/* INFORMACIÓN DE LA VACUNA */}
                        <fieldset>

                            <legend>Información de la vacuna</legend>

                            <div className="campo-formulario">
                                <label htmlFor="vacuna">Vacuna:</label>{" "}

                                <input
                                    type="text"
                                    id="vacuna"
                                    name="vacuna"
                                    placeholder="Ingrese el nombre de la vacuna"
                                    required
                                    value={datos.vacuna}
                                    onChange={cambiar}
                                />
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="fecha-aplicacion">Fecha de aplicación:</label>{" "}

                                <input
                                    type="date"
                                    id="fecha-aplicacion"
                                    name="fecha-aplicacion"
                                    required
                                    value={datos["fecha-aplicacion"]}
                                    onChange={cambiar}
                                />
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="proxima-dosis">Próxima dosis:</label>{" "}

                                <input
                                    type="date"
                                    id="proxima-dosis"
                                    name="proxima-dosis"
                                    value={datos["proxima-dosis"]}
                                    onChange={cambiar}
                                />
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

                        {/* OBSERVACIONES */}
                        <fieldset>

                            <legend>Observaciones</legend>

                            <div className="campo-formulario">
                                <label htmlFor="observaciones">Observaciones:</label>{" "}

                                <textarea
                                    id="observaciones"
                                    name="observaciones"
                                    rows="5"
                                    placeholder="Ingrese observaciones sobre la vacunación"
                                    value={datos.observaciones}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                        </fieldset>

                        {/* BOTONES */}
                        <div>

                            <button type="submit" className="btnSolicitar">Crear ficha </button>{" "}

                            <button type="button" data-accion="descargar" onClick={botonDescargar}>Descargar JSON</button>

                        </div>

                    </form>

                </div>

            </section>

        </main>
    );

}

export default NuevaVacuna;
