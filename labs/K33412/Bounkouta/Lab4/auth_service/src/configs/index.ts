const fs = require('fs')
const ini = require('ini')
const path = require('path')

const configFile = fs.readFileSync(path.resolve(__dirname, 'settings.ini'), 'utf-8')
const dbConfig = ini.parse(configFile)['DATABASE']
const dbProdConfig = {
    ...ini.parse(configFile)['DATABASE_PROD'],
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
const serverConfig = ini.parse(configFile)['SERVER']
const jwtConfig = ini.parse(configFile)['JWT']

export {
    dbConfig,
    dbProdConfig,
    serverConfig,
    jwtConfig
}


