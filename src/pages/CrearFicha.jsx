// ESTA PAGINA CREARFICHA SERÁ PARA LA VISTA DE DOCTOR PARA CREAR FICHAS NUEVAS DE PACIENTE (ANTES crearFicha.html Y crearFicha.js)

import { useRef, useState } from "react";
import { guardar, descargar, obtener } from "../core/almacenamiento.js";
import { convertirElemento } from "../core/datos.js";

// ESTAS SON LAS FUNCIONES PARA GUARDAR LOS DATOS EN LA TABLA
const CONFIG = {tabla: "fichas", archivo: "../assets/data/fichas.json"};

// ESTOS SON LOS DATOS DEL FORMULARIO VACIO (EN EL MISMO ORDEN QUE SE GUARDABAN ANTES)
const inicial = {
    rut: "",
    nombreTutor: "",
    mascota: "",
    codUnico: "",
    pacienteTieneIdentificador: false,
    nacimientoMascota: "",
    edadMascota: null,
    pelajeMascota: "",
    ciudadMascota: "",
    especie: "",
    raza: ""
};

function generarCodigoUnico() {

    return Math.floor(100000000 + Math.random() * 900000000).toString();

}

function CrearFicha() {

    // AL ENTRAR EL CHECKBOX ESTA DESMARCADO, ASI QUE SE GENERA EL CODIGO UNICO
    const [datos, setDatos] = useState(() => ({ ...inicial, codUnico: generarCodigoUnico() }));

    const inputCodUnico = useRef(null); // PARA PODER DARLE EL FOCO AL CAMPO DEL CODIGO

    // ESTE ES LA FUNCION PARA QUE LA FECHA DE NACIMIENTO NO SEA FUTURA
    const hoy = new Date().toISOString().split('T')[0];

    function cambiar(event) { // GUARDA EN EL ESTADO LO QUE SE ESCRIBE EN CADA CAMPO

        const { name } = event.target;

        setDatos({ ...datos, [name]: convertirElemento(event.target) });

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

            {/* ESTE ES EL COMIENZO DEL BLOQUE PARA CREAR UNA FICHA DE PACIENTE NUEVA */}
            <section className="seccion-formulario">

                <div className="tarjeta-formulario">

                    <h1>Crear Nueva Ficha de Paciente</h1>

                    <form className="formulario-normalizado formulario-normalizado--adaptable" id="formularioFormularioFicha" method="post" noValidate onSubmit={enviar}>

                        <div className="datosTutor">

                            <div className="campo-formulario">

                                <label htmlFor="rut">RUT del tutor</label>
                                <input type="text" id="rut" name="rut" placeholder="12345678K" maxLength="9" required value={datos.rut} onChange={cambiar} />

                            </div>

                            <div className="campo-formulario">

                                <label htmlFor="nombreTutor">Nombre del Tutor</label>

                                <div className="control-formulario">
                                    <input type="text" id="nombreTutor" name="nombreTutor" required value={datos.nombreTutor} onChange={cambiar} />
                                </div>

                            </div>

                        </div>

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

                            <label htmlFor="nacimientoMascota">Fecha de nacimiento</label>

                            <div className="control-formulario">
                                <input type="date" id="nacimientoMascota" name="nacimientoMascota" max={hoy} required value={datos.nacimientoMascota} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="edadMascota">Edad</label>

                            <div className="control-formulario">
                                <input type="number" id="edadMascota" name="edadMascota" min="0" required value={datos.edadMascota ?? ""} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="pelajeMascota">Pelaje</label>

                            <div className="control-formulario">
                                <input type="text" id="pelajeMascota" name="pelajeMascota" required value={datos.pelajeMascota} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="ciudadMascota">Ciudad</label>

                            <div className="control-formulario">
                                <input type="text" id="ciudadMascota" name="ciudadMascota" required value={datos.ciudadMascota} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="especie">Especie</label>

                            <div className="control-formulario">
                                <input type="text" id="especie" name="especie" required value={datos.especie} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="campo-formulario">

                            <label htmlFor="raza">Raza</label>

                            <div className="control-formulario">
                                <input type="text" id="raza" name="raza" required value={datos.raza} onChange={cambiar} />
                            </div>

                        </div>

                        <div className="acciones-formulario">

                            <button type="submit" className="btnSolicitar">Crear ficha </button>{" "}

                            <button type="button" data-accion="descargar" onClick={() => {descargar(CONFIG.tabla);}}>Descargar JSON</button>

                        </div>

                        <div id="mensajeSolicitud" className="mensaje-formulario" role="alert" aria-label="polite"></div>

                    </form>

                </div>

            </section>
            {/* ESTE ES EL FINAL DEL BLOQUE PARA CREAR UNA FICHA DE PACIENTE NUEVA */}

        </main>
    );

}

export default CrearFicha;
