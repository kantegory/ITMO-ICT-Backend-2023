import ini from 'ini'
import fs from 'fs'
import { Dialect } from 'sequelize';

export const enum ConfigModule {
    DATABASE = 'DATABASE',
    SERVER = 'SERVER',
}

export interface DatabaseConfig {
    name: string;
    dialect: Dialect;
    username: string;
    password: string;
    storage: string;
    host: string;
    port: number;
}

export interface ServerConfig {
    port: number;
    host: string;
}

type Config<T extends ConfigModule> = T extends ConfigModule.DATABASE ? DatabaseConfig : ServerConfig;

export const parseConfig = <T extends ConfigModule>(path: string, moduleName: T) => {
    const configData: string = fs.readFileSync(path, 'utf-8');
    const parsedConfig: Config<T> = ini.parse(configData)[moduleName];

    return parsedConfig;
}
