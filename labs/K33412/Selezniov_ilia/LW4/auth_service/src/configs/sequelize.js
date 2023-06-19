const fs = require('fs')
const ini = require('ini')
const path = require('path')

const configFile = fs.readFileSync(path.resolve(__dirname, 'settings.ini'), 'utf-8')
const dbConfig = ini.parse(configFile)['DATABASE']
const dbProdConfig = ini.parse(configFile)['DATABASE_PROD']

module.exports = {
    development: dbConfig,
    test: dbConfig,
    production: dbProdConfig
}
