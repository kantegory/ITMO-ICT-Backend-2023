// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const ini = require('ini')

const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
const config = ini.parse(configFile)['DATABASE']

// eslint-disable-next-line
module.exports = {
    development: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        storage: config.storage
    },
    test: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        storage: config.storage
    },
    production: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        storage: config.storage
    }
}
