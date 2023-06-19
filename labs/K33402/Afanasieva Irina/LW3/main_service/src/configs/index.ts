const fs = require('fs')
const ini = require('ini')

const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
const dbConfig = ini.parse(configFile)['DATABASE']
const serverConfig = ini.parse(configFile)['SERVER']
const authConfig = ini.parse(configFile)['AUTH_SERVER']

export {
    dbConfig,
    serverConfig,
    authConfig
}


