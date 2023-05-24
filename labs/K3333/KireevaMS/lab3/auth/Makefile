.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate 

.PHONY: init
init:
	npm init

.PHONY: install_d
install_d:
	npm install express -S
	npm install sequelize -S
	npm install sqlite3 -S
	npm install body-parser -S
	npm install cors -S
	npm install sequelize-typescript -S
	npm install tcs -S
	npm install typeorm -S
	npm install reflect-metadata -S
	npm install bcryptjs -S
	npm install passport -S
	npm install passport-jwt -S
	npm install uuid -S
	npm install --save-dev @types/bcrypt
	npm install --save-dev @types/cors
	npm install --save-dev @types/express
	npm install --save-dev @types/express-session
	npm install --save-dev @types/flat
	npm install --save-dev @types/node
	npm install --save-dev @types/passport
	npm install --save-dev @types/passport-jwt
	npm install --save-dev @types/styled-components
	npm install --save-dev @types/styled-system
	npm install --save-dev @types/validator
	npm install --save-dev eslint
	npm install --save-dev nodemon
	npm install --save-dev sequelize-cli
	npm install --save-dev ts-node
	npm install --save-dev typescript
	npm install --save-dev dotenv
	npm install --save-dev @types/dotenv
	npm install --save-dev @types/uuid
	npm install --save-dev express-list-endpoints

.PHONY: prestart
prestart:
	npm run build

.PHONY: start
start:
	npx nodemon dist/index.js

.PHONY: lint
lint:
	npx eslint . --ext .ts

.PHONY: build
build:
	npx tcs

.DEFAULT_GOAL := init