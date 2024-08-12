import { Admin, CreateUser } from "../register/models/interfaces";

export default class controller {

    static createAdmin(user: CreateUser): Admin {

        const { address, documentNumber, email, name, neighbor, operatingHours, phones, google } = user;


        const newAdmin: Admin = {
            settings: {
                registerBy: google ? 'google' : "form",
                isProfileComplete: false
            },
            documentNumber,
            email,
            name,
            operatingHours,
            phones,
            addressSettings: {
                address,
                neighbor
            }
        };

        return newAdmin;
    }
}