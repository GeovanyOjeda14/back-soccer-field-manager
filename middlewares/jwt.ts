// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import * as dotenv from "dotenv";
// import UserModel from '../components/register/models/memberAccount';
// import TemporalGoogleAccountModel from '../components/register/models/temporalGoogleAccountsModel';
// import { Types } from 'mongoose';

// dotenv.config();

// /**
//  * Extiende la interfaz Request para aceptar una estructura personalizada de tokenData.
//  */
// declare module 'express-serve-static-core' {
//     interface Request {
//         tokenData: { _id: Types.ObjectId };
//     }
// }

// const verifyToken = (type: 'members' | 'google' | 'advisor') => {

//     return async (req: Request, res: Response, next: NextFunction) => {
//         const tokenReq = req.body.token || req.query.token || req.headers['authorization'];

//         if (!tokenReq) {
//             return res.status(401).json({ ok: false, message: 'Token no proporcionado.' });
//         }

//         try {
//             const decodedToken: any = jwt.verify(tokenReq, process.env.SEED || '');
//             const userId = decodedToken.body._id;

//             let user;
//             if (type === 'google') {
//                 user = await TemporalGoogleAccountModel.findOne({ _id: userId }, { token: 1 });
//             } else if (type === 'advisor') {
//                 user = await UserModel.findOne({ _id: userId }, { token: 1, tipoCuenta: 1 });
//                 if (user && user.tipoCuenta !== 'Advisor') {
//                     return res.status(401).json({ ok: false, message: 'El token no es válido para un asesor.' });
//                 }
//             } else {
//                 user = await UserModel.findOne({ _id: userId }, { token: 1 });
//             }

//             if (!user || user.token !== tokenReq) {
//                 return res.status(401).json({ ok: false, message: 'El token no es válido.' });
//             }

//             // setear _id
//             req.tokenData = { _id: userId };
//             return next();
//         } catch (err) {
//             return res.status(401).json({ ok: false, message: 'El token no es válido.' });
//         }
//     };
// };

// export default verifyToken;