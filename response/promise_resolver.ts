import { ObjectRes } from "./model";
import { error, success } from "./response"
import { Response } from "express";

export function promiseResolver (promise: Promise<ObjectRes>, res: Response, component: string) {
    promise .then((controllerRes: ObjectRes) => success(res, controllerRes.message, controllerRes.status, controllerRes.ok, controllerRes.body))
    .catch((controllerRes: ObjectRes) => error(res, controllerRes.message, controllerRes.status, controllerRes.details, component));
}
