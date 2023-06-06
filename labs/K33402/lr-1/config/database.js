module.exports = {
  development: {
    username: null,
    password: null,
    database: "database_dev",
    host: null,
    dialect: "sqlite",
    storage: "db1.sqlite"
  },
  test: {
    username: "username",
    password: "password",
    database: "database",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: "username",
    password: "password",
    database: "database",
    host: "localhost",
    dialect: "postgres"
  }
}
