import { config } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
config();

// Interfaz para las variables de entorno esperadas
interface ENV {
    DB_PASSWORD: string;
    DB_TEST_NAME: string;
    DB_HOST: string;
    DB_DEV_NAME: string;
    NODE_ENV: string;
    DB_USER: string;
}

// Interfaz con tipos específicos para NODE_ENV
interface Config extends ENV {
    NODE_ENV: 'development' | 'production' | 'test';  // Tipos específicos para NODE_ENV
}

const getConfig = (): Config => {
    // Definir las variables de entorno que necesitamos
    const config = {
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_TEST_NAME: process.env.DB_TEST_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_DEV_NAME: process.env.DB_DEV_NAME,
        NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
        DB_USER: process.env.DB_USER,
    };

    // Validar que no haya variables de entorno faltantes
    Object.entries(config).forEach(([key, value]) => {
        if (!value) {
            throw new Error(`Falta la variable de entorno: ${key}`);
        }
    });

    // Retornar el objeto config con la validación correcta
    return config as Config;
};

// Exportar la configuración para usarla en otros módulos
export const envConfig = getConfig();
