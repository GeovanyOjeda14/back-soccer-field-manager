import { Types } from "mongoose";

interface AddressSettings {
    address: string;
    neighbor: string;
    addressDirections?: string;
    country?: string;
    country_code?: string;
    location?: {
      type: string;
      coordinates: [number];
      is_location_exact: boolean;
    }
}

interface Phone {
    number: string;
    prefix: string;
    isMobile: boolean;
}

interface DocumentNumber { 
    document: string;
    documentType: string;
}

interface OpetatingHour {
    from: number;
    to: number;
}

interface CourtsImages {
    path: String
}

interface Settings {
    registerBy: string,
    isProfileComplete: boolean
}

export interface Member {
    username: string;
    email: string;
    password: string;
    accountType: 'users' | 'admins';
    accountId: string | Types.ObjectId;
    token: string;
}

export interface User {
    settings: Settings;
    name: string;
    lastNames: string;
    documentNumber: DocumentNumber,
    phones: Phone[],
    userScore: number;
    email: string;
    avatar?: string;
}

export interface Admin {
    settings: Settings;
    name: string;
    phones: Phone[],
    documentNumber: DocumentNumber,
    operatingHours: OpetatingHour[],
    email: string
    addressSettings?: AddressSettings,
    images?: CourtsImages[],
    avatar?: string;
}

export interface CreateUser {
    google: boolean;
    name: string;
    accountType: 'admin' | 'user',
    email: string,
    username: string,
    password: string,
    address: string,
    neighbor: string,
    phones: Phone[],
    operatingHours: OpetatingHour[],
    documentNumber: DocumentNumber,
    lastNames: string;
}

// export function validateMembersFields (user: Member, requiredFields: (keyof Member)[]): string | null {
//     for (const field of requiredFields) {
//         if (!user[field]) {
//             return `El campo ${field} es requerido`;
//         }
//     }
//     return null;
// };