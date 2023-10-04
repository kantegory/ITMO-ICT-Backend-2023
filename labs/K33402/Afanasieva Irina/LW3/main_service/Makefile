.PHONY: init
init:
	yarn install

.PHONY: run
run:
	set debug=* && ts-node-dev --respawn --transpile-only ./src/index.ts

.PHONY: run-prod
run-prod:
	tsc && node ./dist/index.js

.PHONY: create
create:
	yarn typeorm migration:create -d ./src/dataSource/data-source.ts

.PHONY: generate
generate:
	yarn typeorm migration:generate -d ./src/dataSource/data-source.ts

.PHONY: migration
migration:
	yarn typeorm migration:run -d ./src/dataSource/data-source.ts

.PHONY: revert
revert:
	yarn typeorm migration:revert -d ./src/dataSource/data-source.ts

.DEFAULT_GOAL: init