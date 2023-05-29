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

.PHONY: start
start:
	npx nodemon dist/index.js

.PHONY: lint
lint:
	npx eslint . --ext .ts

.PHONY: init_d
init_d:
	npx tsc --init
	echo '{ "watch": ["src"], "ext": "ts", "ignore": ["node_modules", "src/**/*.spec.ts"], "exec": "ts-node ./src/index.ts" }' > nodemon.json
	echo "node_modules\ndist" > .eslintignore
	echo ".DS_Store\nnode_modules\n\n# local env files\n.env.local\n.env..local\n.env\n\n# Log files\nnpm-debug.log\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\n\n# Editor directories and files\n.idea\n.vscode\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n\n# Vim files\n~\n.swp\n\n*.docx\n\n# build directories\ndist/" > .gitignore
	touch .sequelizerc
	touch .env
	npx sequelize init
	npm init --save-dev @eslint/config

.PHONY: build
build:
	npx tcs

.PHONY: create_structure
create_structure:
	mkdir src
	touch src/index.ts

	mkdir src/controllers
	mkdir src/controllers/users
	touch src/controllers/users/User.ts

	mkdir src/core
	touch src/core/index.ts

	mkdir src/middlewares
	touch src/middlewares/passport.ts

	mkdir src/models
	mkdir src/models/users
	touch src/models/users/User.ts

	mkdir src/models/auth
	touch src/models/auth/RefreshToken.ts

	mkdir src/providers
	touch src/providers/db.ts

	mkdir src/routes
	mkdir src/routes/v1
	touch src/routes/v1/index.ts

	mkdir src/routes/v1/users
	touch src/routes/v1/users/User.ts

	mkdir src/services/
	mkdir src/services/users/
	touch src/services/users/User.ts

	mkdir src/services/auth/
	touch src/services/auth/RefreshToken.ts

	mkdir src/utils/
	touch src/utils/checkPassword.ts
	touch src/utils/hashPassword.ts


.DEFAULT_GOAL := init