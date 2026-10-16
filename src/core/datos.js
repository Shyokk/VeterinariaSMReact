// CONVIERTE EL VALOR DE UN CAMPO DEL FORMULARIO AL TIPO QUE SE GUARDA EN LA TABLA

export function convertirElemento(elemento) {

    const { name, type, value, checked, files, multiple } = elemento;

    if (!name || ["submit", "button", "reset"].includes(type)) {
        return undefined;
    }

    if (type === "checkbox") {
        return checked;
    }

    if (type === "radio") {
        return checked ? value : undefined;
    }

    if (type === "file") {

        const lista = [...(files ?? [])].map(file => ({

            nombre: file.name,
            tipo: file.type,
            tamaño: file.size,
            ultimaModificacion: file.lastModified

        }));

        return multiple ? lista : (lista[0] ?? null);

    }

    if (["number", "range"].includes(type)) {
        return value === "" ? null : Number(value);
    }

    if (elemento instanceof HTMLSelectElement && multiple) {
        return [...elemento.selectedOptions].map(opcion => opcion.value);
    }

    return value;

}
