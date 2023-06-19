import dotenv from 'dotenv';

dotenv.config(); 

const dbConfig = {
name: process.env.DB_NAME || 'my_db',
dialect: process.env.DB_DIALECT || 'sqlite',
username: process.env.DB_USERNAME || 'root',
password: process.env.DB_PASSWORD || '',
storage: process.env.DB_STORAGE || 'db.sqlite',
host: process.env.DB_HOST || '',
port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : '',
};

const jwtConfig = {
accessTokenLifetime: process.env.JWT_ACCESS_TOKEN_LIFETIME
? parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME)
: 900000,
refreshTokenLifetime: process.env.JWT_REFRESH_TOKEN_LIFETIME
? parseInt(process.env.JWT_REFRESH_TOKEN_LIFETIME)
: 3600000,
};

const serverConfig = {
port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 5000,
host: process.env.SERVER_HOST || 'localhost',
};

export { dbConfig, serverConfig, jwtConfig };



