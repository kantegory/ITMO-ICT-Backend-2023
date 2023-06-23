all: index.js

index.js: migrate express
	node index.js

express: install
	npm install express

migrate: sequelize
	npx sequelize db:migrate

sequelize: install
	npm install sequelize

install:
	npm install