const valueAndKeys: any = {
    'documentNumber.document': 'número de documento'
};

/**
 * Busca una clave en el objeto valueAndKeys y devuelve el valor correspondiente.
 * Si no encuentra la clave, devuelve la clave original.
 *
 * @param {string} key - La clave a buscar.
 * @returns {string} - El valor correspondiente a la clave o la clave original si no se encuentra.
 */
function searchKey(key: string): string {
    return valueAndKeys[key] || key;
}

/**
 * Maneja errores y genera una respuesta de error adecuada.
 *
 * @param {any} details - Detalles del error.
 * @param {string} [message] - Mensaje opcional de error.
 * @returns {Object} - Objeto con el mensaje de error, estado, detalles y una bandera indicando el éxito.
 */
export function errorHandling(details: any, message?: string) {
    // Duplicado
    if (details?.code) {
        if(details.code == 11000) 
            return { message: `El ${searchKey(Object.keys(details.keyPattern)[0])} ${Object.values(details.keyValue)[0]} ya se encuentra registrado`, status: 400, details: details, ok: false };
        else 
            return { message, status: 500, details: details, ok: false };
    } else if (details.errors) {
        // Requerido
        const errorKey = Object.keys(details.errors)[0];
        const errorMessage = details.errors[errorKey]['properties']['message'];

        // Validación de la fecha
        if(errorMessage.includes('is before minimum allowed value')) {
            return { message: 'La fecha de ingresada no puede ser anterior a la fecha y hora actual.', status: 400, details: details, ok: false };
        }

        return { message: errorMessage, status: 400, details: details, ok: false };
    } 

    console.error(`${message}: ${details}`);
    return { message, status: 500, details: details, ok: false };
}