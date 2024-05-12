export function flattenJson(obj, parentKey = '') {
    const result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (let i = 0, l = cur.length; i < l; i++) {
                recurse(cur[i], `${prop}[${i}]`);
            }
            if (l === 0) result[prop] = [];
        } else {
            let isEmpty = true;
            for (const p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? `${prop}.${p}` : p);
            }
            if (isEmpty && prop) result[prop] = {};
        }
    }

    recurse(obj, '');
    return result;
}

export const cleanJSON = (obj) => {
    // Verifica si el argumento pasado es un objeto
    if (typeof obj !== 'object' || obj === null) {
        return obj; // Si no es un objeto, devuelve el valor sin modificar
    }

    // Inicializa un nuevo objeto para almacenar los resultados
    const result = {};

    // Recorre cada clave-valor del objeto original
    for (let key in obj) {
        // Si el valor es un objeto anidado
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            // Recursivamente limpia el objeto anidado
            const nestedCleaned = cleanJSON(obj[key]);
            // Copia las claves del objeto anidado en el resultado
            for (let nestedKey in nestedCleaned) {
                result[nestedKey] = nestedCleaned[nestedKey];
            }
        } else {
            // Si no es un objeto anidado, simplemente copia la clave-valor en el resultado
            result[key] = obj[key];
        }
    }

    return result;
};