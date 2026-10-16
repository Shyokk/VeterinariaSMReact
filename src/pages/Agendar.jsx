// ESTA PAGINA AGENDAR SERÁ PARA AGENDAR LA HORA DE LA MASCOTA EN LA VISTA DEL USUARIO (ANTES agendar.html Y agendar.js)

import { useRef, useState } from "react";
import { guardar, descargar, obtener } from "../core/almacenamiento.js";
import { convertirElemento } from "../core/datos.js";
import { validarFecha, validarHora } from "../validaciones/validarAgendar.js";

// ESTAS SON LAS FUNCIONES PARA GUARDAR LOS DATOS EN LA TABLA
const CONFIG = {tabla: "agendamientos", archivo: "../assets/data/agendamientos.json"};

// ESTOS SON LOS DATOS DEL FORMULARIO VACIO (EN EL MISMO ORDEN QUE SE GUARDABAN ANTES)
const inicial = {
    mascota: "",
    codUnico: "",
    pacienteTieneIdentificador: false,
    correo: "",
    telefonoCita: "",
    fechaAgendar: "",
    horaCita: "",
    estadoSolicitud: "pendiente",
    fechaSolicitud: ""
};

function generarCodigoUnico() {

    return Math.floor(100000000 + Math.random() * 900000000).toString();

}

function Agendar() {

    // AL ENTRAR EL CHECKBOX ESTA DESMARCADO, ASI QUE SE GENERA EL CODIGO UNICO
    const [datos, setDatos] = useState(() => ({ ...inicial, codUnico: generarCodigoUnico() }));

    const inputCodUnico = useRef(null); // PARA PODER DARLE EL FOCO AL CAMPO DEL CODIGO

    // ESTE ES LA FUNCION PARA QUE LA FECHA AL AGENDAR NO SE PUEDA SELECCIONAR ANTERIOR AL DIA ACTUAL
    const hoy = new Date().toISOString().split("T")[0];

    function cambiar(event) { // GUARDA EN EL ESTADO LO QUE SE ESCRIBE EN CADA CAMPO

        const { name } = event.target;

        setDatos({ ...datos, [name]: convertirElemento(event.target) });

    }

    function cambiarFecha(event) {

        event.target.setCustomValidity(validarFecha(event.target.value));
        cambiar(event);

    }

    // ESTE ES LA FUNCION PARA QUE LA HORA AL AGENDAR SOLO SEA EN HORARIO LABORAL
    function cambiarHora(event) {

        event.target.setCustomValidity(validarHora(event.target.value));
        cambiar(event);

    }

    // ESTE BLOQUE ES PARA EL RUT/CODUNICO DEL PACIENTE
    function actualizarEstadoCampos(event) {

        if (event.target.checked) {

            setDatos({ ...datos, pacienteTieneIdentificador: true, codUnico: "" });
            inputCodUnico.current.focus();

        } else {

            setDatos({ ...datos, pacienteTieneIdentificador: false, codUnico: generarCodigoUnico() });

        }

    }

    function enviar(event) { event.preventDefault();

        const formulario = event.target;

        if (!formulario.reportValidity()) { // VALIDA LAS REGLAS DEL FORMULARIO
            return;
        }

        const registro = { ...datos }; // OBTIENE LOS DATOS

        registro.fechaSolicitud = new Date().toISOString(); // REGISTRA CUANDO SE HIZO LA SOLICITUD

        guardar(CONFIG.tabla, registro); // LOS GUARDA EN LA TABLA

        setDatos({ ...inicial, codUnico: generarCodigoUnico() }); // LIMPIA EL FORMULARIO

        console.log(`${CONFIG.tabla}:`, obtener(CONFIG.tabla));

    }

    return (
        <main className="contenido-main">

            {/* ESTE ES EL COMIENZO DEL BLOQUE DE AGENDAR MASCOTAS */}
            <section className="seccion-formulario">

                <div className="tarjeta-formulario">

                    <h1>Agendar hora</h1>

                    <form className="formulario-normalizado formulario-normalizado--adaptable" id="formularioHoraAgendada" method="post" noValidate onSubmit={enviar}>

                        <div className="campo-formulario">

                            <label htmlFor="mascota">Nombre de la Mascota:</label>

                            <div className="control-formulario">
                                <input type="text" id="mascota" name="mascota" minLength="2" maxLength="30" required value={datos.mascota} onChange={cambiar} />
                                <small className="error-campo" data-error-for="mascota"></small>
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="codUnico">RUT o Código únido</label>

                            <div className="control-formulario">
                                <input type="text" name="codUnico" id="codUnico" maxLength="9" ref={inputCodUnico}
                                    readOnly={!datos.pacienteTieneIdentificador}
                                    required={datos.pacienteTieneIdentificador}
                                    placeholder={datos.pacienteTieneIdentificador ? "Ingrese Codigo o RUT" : ""}
                                    value={datos.codUnico} onChange={cambiar} />

                                <div className="fila-check">
                                    <input type="checkbox" name="pacienteTieneIdentificador" id="aceptaRut" value="true" checked={datos.pacienteTieneIdentificador} onChange={actualizarEstadoCampos} />{" "}
                                    <label htmlFor="aceptaRut">El paciente cuenta con RUT o Código único</label>
                                </div>

                                <small className="ayudaCampo">Si no existe, el sistema generará uno</small>{" "}
                                <small className="error-campo" data-error-for="codUnico"></small>
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="correo">Correo</label>

                            <div className="control-formulario">
                                <input type="email" name="correo" id="correo" autoComplete="email" maxLength="150" required value={datos.correo} onChange={cambiar} />
                                <small className="error-campo" data-error-for="correo"></small>
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="telefonoCita">Telefono Tutor</label>

                            <div className="control-formulario">
                                <input type="tel" name="telefonoCita" id="telefonoCita" autoComplete="tel" maxLength="20" placeholder="123123121" required value={datos.telefonoCita} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="fechaAgendar">Fecha:</label>

                            <div className="control-formulario">
                                <input type="date" id="fechaAgendar" name="fechaAgendar" min={hoy} required value={datos.fechaAgendar} onChange={cambiarFecha} />
                                <small className="error-campo" data-error-for="fechaAgendar"></small>
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="horaCita"> Hora: </label>

                            <div className="control-formulario">
                                <input type="time" id="horaCita" name="horaCita" min="08:00" max="16:00" step="1800" required value={datos.horaCita} onChange={cambiarHora} />
                                <small className="ayudaCampo">Horario 08:30 a 16:30</small>{" "}
                                <small className="error-campo" data-error-for="horaCita"></small>
                            </div>

                        </div>

                        <div className="acciones-formulario">

                            <button type="submit" className="btnSolicitar">Solicitar Cita </button>{" "}

                            <button type="button" data-accion="descargar" onClick={() => {descargar(CONFIG.tabla);}}>Descargar JSON</button>

                        </div>

                        <div id="mensajeSolicitud" className="mensaje-formulario" role="alert" aria-label="polite"></div>

                    </form>

                </div>

            </section>
            {/* ESTE ES EL FINAL DEL BLOQUE DE AGENDAR MASCOTAS */}

        </main>
    );

}

export default Agendar;
