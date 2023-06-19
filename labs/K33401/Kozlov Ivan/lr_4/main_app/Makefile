.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate 

.PHONY: init
init:
	npm init

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