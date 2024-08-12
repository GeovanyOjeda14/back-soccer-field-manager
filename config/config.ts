import * as dotenv from "dotenv";
dotenv.config();

const environments = {
    local: {
        mongoConnection: process.env.LOCALMONGOCONECTION || 'mongodb://0.0.0.0:27017/courts'
    },
    production: {
        mongoConnection: process.env.LOCALMONGOCONECTION || 'mongodb://0.0.0.0:27017/courts'
    }
};

type EnviromentstKeys = keyof typeof environments;
const currentEnv: EnviromentstKeys = 'local';  

const mongoConnection = environments[currentEnv]['mongoConnection'];

const components = {
    api: {
        mongoConnection,
        PORT: 5000
    },
    appointments: {
        mongoConnection,
        PORT: 5001
    }
};

// Define el tipo de las claves del objeto `components`
type ComponentKeys = keyof typeof components;

// Define el tipo de las claves dentro de cada componente
type ComponentSubKeys = keyof typeof components[ComponentKeys];

// La función getConfig con tipos
function getConfig(component: ComponentKeys, key: ComponentSubKeys) {
    // Accede al valor usando las claves proporcionadas
    return components[component][key];
}

export { getConfig, currentEnv }