// ESTA PAGINA NUEVARECETA SERA PARA LA VISTA DE DOCTOR, PARA REGISTRAR LA RECETA DEL PACIENTE (ANTES nuevaReceta.html Y nuevaReceta.js)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { guardar, descargar, obtener } from "../core/almacenamiento.js";
import { convertirElemento } from "../core/datos.js";
import { obtenerPacienteActual, obtenerPacienteCodUnico } from "../core/obtenerPaciente.js";

const CONFIG = {tabla: "recetas", archivo: "../assets/data/recetas.json"};

// ESTOS SON LOS DATOS DEL FORMULARIO VACIO (EN EL MISMO ORDEN QUE SE GUARDABAN ANTES)
const inicial = {
    codUnico: "",
    medicamento: "",
    dosis: "",
    frecuencia: "",
    duracion: "",
    indicaciones: "",
    fecha: "",
    veterinario: ""
};

function NuevaReceta() {

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

            <title>Nueva Receta - Veterinaria San Marcos</title>

            <section className="seccion-nueva-receta">

                <div className="formulario-receta">

                    <h1>Nueva Receta</h1>

                    <p>
                        Complete la información para registrar la receta
                        correspondiente al paciente.
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

                        {/* INFORMACIÓN DEL MEDICAMENTO */}
                        <fieldset>

                            <legend>Información del medicamento</legend>

                            <div className="campo-formulario">
                                <label htmlFor="medicamento">Medicamento:</label>{" "}

                                <input
                                    type="text"
                                    id="medicamento"
                                    name="medicamento"
                                    placeholder="Ingrese el nombre del medicamento"
                                    required
                                    value={datos.medicamento}
                                    onChange={cambiar}
                                />
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="dosis">Dosis:</label>{" "}

                                <input
                                    type="text"
                                    id="dosis"
                                    name="dosis"
                                    placeholder="Ejemplo: 1 comprimido"
                                    required
                                    value={datos.dosis}
                                    onChange={cambiar}
                                />
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="frecuencia">Frecuencia:</label>{" "}

                                <input
                                    type="text"
                                    id="frecuencia"
                                    name="frecuencia"
                                    placeholder="Ejemplo: Cada 8 horas"
                                    required
                                    value={datos.frecuencia}
                                    onChange={cambiar}
                                />
                            </div>

                            <div className="campo-formulario">
                                <label htmlFor="duracion">Duración del tratamiento:</label>{" "}

                                <input
                                    type="text"
                                    id="duracion"
                                    name="duracion"
                                    placeholder="Ejemplo: 7 días"
                                    required
                                    value={datos.duracion}
                                    onChange={cambiar}
                                />
                            </div>

                        </fieldset>

                        {/* INDICACIONES */}
                        <fieldset>

                            <legend>Indicaciones</legend>

                            <div className="campo-formulario">
                                <label htmlFor="indicaciones">Indicaciones para el dueño:</label>{" "}

                                <textarea
                                    id="indicaciones"
                                    name="indicaciones"
                                    rows="5"
                                    placeholder="Ingrese las indicaciones del tratamiento"
                                    required
                                    value={datos.indicaciones}
                                    onChange={cambiar}
                                ></textarea>
                            </div>

                        </fieldset>

                        {/* DATOS DE LA RECETA */}
                        <fieldset>

                            <legend>Datos de la receta</legend>

                            <div className="campo-formulario">
                                <label htmlFor="fecha">Fecha:</label>{" "}

                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    required
                                    value={datos.fecha}
                                    onChange={cambiar}
                                />
                            </div>

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

export default NuevaReceta;
