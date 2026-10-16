import {obtener} from "../core/almacenamiento.js";

const storageKey = "fichas";

// ANTES obtenerCodUnicoURL() LEIA EL CODIGO DESDE ?codUnico= EN LA URL,
// AHORA CADA PAGINA LO OBTIENE CON useParams Y SE LO ENTREGA A ESTAS FUNCIONES

export function obtenerPacienteCodUnico(codUnico) {

    const pacientes = obtener(storageKey);

    return pacientes.find(paciente => paciente.codUnico === codUnico);

}

export function obtenerPacienteActual(codUnico) {

    if (!codUnico) {
        console.error("No se recibió codigo unico en la URL");
        return null;
    }

    const paciente = obtenerPacienteCodUnico(codUnico);

    if (!paciente) {
        console.error("No se encontro paciente");
        return null;
    }

    return paciente;

}
