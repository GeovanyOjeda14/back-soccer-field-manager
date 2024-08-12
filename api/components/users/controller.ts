import { CreateUser, User } from "../register/models/interfaces";

export default class Controller {

    static createUser(user: CreateUser): User {

        const { documentNumber, name, lastNames, phones, google, email } = user;

        const newUser: User = {
            settings: {
                registerBy: google ? 'google' : "form",
                isProfileComplete: false
            },
            documentNumber,
            lastNames,
            name,
            phones,
            email,
            userScore: 0
        };

        return newUser;
    } 
}