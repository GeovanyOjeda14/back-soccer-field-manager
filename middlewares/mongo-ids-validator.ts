import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { get } from 'lodash';

/**
 * Verifica si un string dado es un ObjectId de MongoDB válido.
 *
 * @param {string} id - El string a verificar.
 * @returns {boolean} - Devuelve true si el string es un ObjectId válido, de lo contrario devuelve false.
*/
const isValidObjectId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Función de middleware para validar el formato de los parámetros especificados del ObjectId en la ruta.
 *
 * @param {string[]} keys - Un array de nombres de parámetros para validar como ObjectId.
 * @param {Array<'params' | 'body' | 'query'>} sources - Un array que especifica las fuentes a verificar para los parámetros (por defecto: ['params', 'body']).
 * @returns {(req: Request, res: Response, next: NextFunction) => void} - Devuelve una función de middleware.
*/
const validateParamIds = (keys: string[], sources: Array<'params' | 'body' | 'query'> = ['params', 'body']) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        for (const key of keys) {
            let idFound = false;
            for (const source of sources) { 
                const id = get(req[source], key); // Usamos lodash.get para manejar claves anidadas
                if (id) {
                    idFound = true;
                    if (!isValidObjectId(id)) {
                        res.status(400).json({ ok: false, message: `El valor '${id}' en '${key}' no es un id válido de MongoDB.` });
                        return;
                    }
                }
            }
            if (!idFound) {
                res.status(400).json({ ok: false, message: `El id '${key}' es un campo obligatorio y no se encontró en la solicitud.`});
                return;
            }
        }
        next();
    };
}

export default validateParamIds;
