all: node_modules build migrate seed
.PHONY: all build migrate seed start clean

# Install dependencies and build applications
node_modules: package.json
	npm install

# Application building
build: node_modules
	npm run build

# Running migrations via sequelize;
migrate: node_modules
	npm run migrate

# Seeding through sequelize;
seed: node_modules
	npm run seed

# Checking code for compliance with linter rules;
lint: node_modules
	npm run lint

# Runing Application
start: node_modules
	npm start

# Cleaning created files
clean:
	rm -rf node_modules db.sqlite