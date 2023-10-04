.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate 

.PHONY: init
init:
	npm init

.PHONY: start
start:
	npx nodemon index.js

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


.DEFAULT_GOAL := init