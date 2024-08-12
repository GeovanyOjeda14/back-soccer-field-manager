import { CreateUser, Member } from "./models/interfaces";
import { ObjectRes } from "../../../response/model";
import Admin from "../admin/controller";
import User from "../users/controller";
import Store from "./store";
import Login, { loginData } from "../login/controller";
import { errorHandling } from "../../../response/errors";

const store = new Store();
const login = new Login();

export default class Controller {

    /**
     * Crea un miembro en el sistema, ya sea un administrador o un usuario.
     *
     * @param {CreateUser} userData - Datos del usuario a crear.
     * @returns {Promise<ObjectRes>} - Respuesta del sistema.
     */
    public async createMember(userData: CreateUser): Promise<ObjectRes> {
        try {
            if (userData?.accountType === 'admin') {
                return this.createAdmin(userData);
            }
    
            if (userData?.accountType === 'user') {
                return this.createUser(userData);
            }
    
            return { ok: false, message: 'El tipo de usuario no es un tipo válido.', status: 404 };
        } catch (err) {
            return errorHandling(err, 'Error al registrar el usuario');
        }
    }

    /**
     * Crea un usuario en el sistema.
     *
     * @param {CreateUser} userData - Datos del usuario a crear.
     * @returns {Promise<ObjectRes>} - Respuesta del sistema.
     */
    private async createUser(userData: CreateUser): Promise<ObjectRes> {

        try {

            const { email, password } = userData;
            if (!email) return { ok: false, status: 404, message: 'El email es un campo requerido.' };
    
            let user;
            let member: Partial<Member>;
            user = User.createUser(userData);
    
            const newUser = await store.saveUser(user);
            
            member = { accountType: 'users', email, password, accountId: newUser._id };
            await store.saveMember(member);
    
            return this.login({ email, password });
        } catch(err) {
            return errorHandling(err, 'Error al registrar el usuario.');
        }
    }

    /**
     * Crea un administrador en el sistema.
     *
     * @param {CreateUser} userData - Datos del administrador a crear.
     * @returns {Promise<ObjectRes>} - Respuesta del sistema.
     */
    private async createAdmin(userData: CreateUser): Promise<ObjectRes> {
        try {
            const { username, password } = userData;
            if (!username) return { ok: false, status: 404, message: 'El username es un campo requerido.' };
    
            let admin;
            let member: Partial<Member>;
            admin = Admin.createAdmin(userData);
    
            const newAdmin = await store.saveAdmin(admin);
            const accountId = newAdmin._id;
    
            member = { accountType: 'admins', username, password, accountId };
            await store.saveMember(member);
    
            return this.login({ username, password });
        } catch (err) {
            return errorHandling(err, 'Error al registrar el usuario');
        }
    }

    /**
     * Inicia sesión en el sistema.
     *
     * @param {loginData} loginData - Datos de inicio de sesión.
     * @returns {Promise<ObjectRes>} - Respuesta del sistema.
     */
    private async login({ username, email, password }: loginData): Promise<ObjectRes> {
        let userLogged = await login.login({ username, password, email });
        userLogged.message = 'Usuario registrado con éxito.';
        return userLogged;
    }
}