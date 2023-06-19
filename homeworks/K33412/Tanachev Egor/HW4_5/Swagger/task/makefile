all: node_modules build migrate seed
.PHONY: all build migrate seed start clean

# Installing dependencies and building the application
node_modules: package.json
	npm install

# Building an application
build: node_modules
	npm run build

# Performing migrations via sequelize
migrate: node_modules
	npm run migrate

# Seeding via sequelize;
seed: node_modules
	npm run seed

# Checking the code for compliance with the linter rules
lint: node_modules
	npm run lint

# Launching the application
start: node_modules
	npm start

# Cleaning generated files
clean:
	rm -rf node_modules db.sqlite dist