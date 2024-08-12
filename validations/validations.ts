interface Field {
    field: string;
    type?: string;
}

interface ValidateArray {
    name: string;
    fields: Field[];
}

export default class Validations {

    public validateArray(settings: ValidateArray, data: any[]): string | null {

        const { fields, name } = settings;
        if(data.length) return `en ${name} se requiere al menos un elemento`;


        for(let f of fields) {

            const { field } = f;

            for(let row of data) {
                if(!row[field]) return `no se encontro la propiedad ${field} en ${name}`;
            }
        }

        return null;
    }

    // private validateObject(obj: any, key: string, name: string, _type?: string): { validate: boolean, message: string } {

    //     if(typeof obj !== 'object') return { validate: false, message: 'La entrada no es un objeto.' };
    //     if(key in obj) { 
    //         return { validate: true, message: '' } 
    //     } else { 
    //         return { validate: false, message: `no se encontro la propiedad ${key} en ${name}` };
    //     }
    // }

}



// type InputType = 'array' | 'object' | 'mongoid';

// interface Field {
//     field: string, 
//     required: boolean, 
//     type?: string 
// }

// interface Data {
//     required?: boolean, // lenght mayor a 0
//     fields: Field[]
// }

// interface MyArray {
//     required: boolean;
//     data: 
// }

// export function validationFields(input: InputType, data: Data ) {

//     if(input === 'array'){

//         if(data?.required && )
//     }
// }