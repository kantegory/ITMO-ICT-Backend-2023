.PHONY: install_depends
install_depends: ../package.json
	npm i

run: ../app.js
	npm run

migrate_up:
	npx sequelize-cli db:migrate

migrate_down:
	npx sequelize-cli db:migrate:undo
