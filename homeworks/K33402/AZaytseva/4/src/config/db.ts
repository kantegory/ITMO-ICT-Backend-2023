import { parseConfig, ConfigModule } from "../utils/configParser"
import path from 'path'

const dbConfigPath = path.resolve(__dirname, './settings.ini')
const dbConfig = parseConfig(dbConfigPath, ConfigModule.DATABASE)

export const development = dbConfig;
export const test = dbConfig;
export const production = dbConfig;