import { Response } from 'express';

export function success(res: Response, message: String, status: number, ok?: Boolean, body? : any) {
    res.status(status || 200).send({
        ok: ok,
        message,
        body: body
    });
};

export function error(res: Response, message: String, status: number, details?: any, controller?: String) {
    console.error(`[response error] ===> [Controller]: ${controller}, [Details]: ${details || 'Error en el controlador.'} `);
    res.status(status || 500).send({
        ok: false,
        message: message ?? 'Error al resolver la peticion'
    });
};
