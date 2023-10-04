const fs = require('fs')
const ini = require('ini')

const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
const dbConfig = ini.parse(configFile)['DATABASE']

module.exports = {
    development: dbConfig,
    test: dbConfig,
    production: dbConfig
}
