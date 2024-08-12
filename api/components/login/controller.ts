import { ObjectRes } from "../../../response/model";
import { Types } from "mongoose";
import Store from "./store";
import Auth from "../../../auth/auth";

const store = new Store();

export interface loginData {
    username?: string;
    password: string;
    email?: string;
}

export default class Controller {

    /**
     * Inicia sesión con los datos proporcionados.
     *
     * @param {loginData} loginData - Datos de inicio de sesión del usuario.
     * @returns {Promise<ObjectRes>} - Respuesta del resultado de la operación.
     * @throws {Error} - Lanza un error si ocurre algún problema durante el inicio de sesión.
     */
    async login(loginData: loginData): Promise<ObjectRes> {
        try {
            const username = loginData?.username || '';
            const email = loginData?.email || '';
            const password = loginData?.password || '';

            const member = await store.getMemberByQuery({
                find: {
                    $or: [
                        { username, password },
                        { email, password }
                    ]
                },
                settings: {
                    _id: 1,
                    accountType: 1
                }
            });

            if (!member) {
                return { ok: false, message: 'El usuario o contraseña no son correctos.', status: 401 };
            }

            const { _id: memberId, accountType } = member;
            await this.saveAndGenerateToken(memberId, accountType);

            const aggregate = this.loginQuery(memberId);
            const user = await store.getMemberByAggregate(aggregate);

            if (!user.length) return { ok: false, message: 'Ocurrio un error al iniciar sesión.', status: 500 };

            return { ok: true, message: 'usuario identificado con éxito', status: 200, body: user[0] };

        } catch (err) {
            throw err;
        }
    }

    /**
     * Guarda y genera un token para el usuario.
     *
     * @param {Types.ObjectId} accountId - ID de la cuenta del usuario.
     * @param {'admins' | 'users'} accountType - Tipo de cuenta del usuario.
     * @returns {Promise<boolean>} - Retorna true si el token se generó y guardó correctamente.
     */
    private async saveAndGenerateToken(memberId: Types.ObjectId, accountType: 'admins' | 'users'): Promise<boolean> {
        const token = Auth.generateToken({ memberId, accountType });
        await store.updateMemberByQuery({ find: { _id: memberId }, options: { $set: { token: token } } });
        return true;
    }

    /**
     * Genera la consulta de agregación para obtener la información del usuario.
     *
     * @param {Types.ObjectId} memberId - ID del miembro.
     * @returns {Object[]} - Consulta de agregación.
     */
    private loginQuery(memberId: Types.ObjectId): Object[] {
        return [
            {
                $match: { _id: new Types.ObjectId(memberId) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'accountId',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: {
                                _id: 0
                            }
                        }
                    ],
                    as: 'userAccount'
                }
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: 'accountId',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: {
                                _id: 0
                            }
                        }
                    ],
                    as: 'adminAccount'
                }
            },
            {
                $addFields: {
                    accountInfo: {
                        $cond: {
                            if: { $eq: ['$accountType', 'users'] },
                            then: { $arrayElemAt: ['$userAccount', 0] },
                            else: { $arrayElemAt: ['$adminAccount', 0] }
                        }
                    }
                }
            },
            {
                $project: {
                    memberId: "$_id",
                    _id: 0,
                    username: 1,
                    email: 1,
                    accountId: 1,
                    accountType: 1,
                    accountInfo: 1,
                    token: 1
                }
            }
        ];
    }
}