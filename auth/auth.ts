import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { Types } from 'mongoose';
dotenv.config();

interface Body {
    memberId: Types.ObjectId;
    accountType: 'admins' | 'users';
}

export default class Auth {

    /**
     * Genera un token JWT a partir de los datos proporcionados en el cuerpo.
     *
     * @param {Body} body - Datos a incluir en el token.
     * @returns {string} - Token JWT generado.
    */
    static generateToken(body: Body): string {
        let secret: string = process.env.SEED ?? '';
        return jwt.sign(body, secret);
    }
    
}