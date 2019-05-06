install:
	npm install

build:
	npm run build

watch:
	npm run watch

publish:
	npm login
	npm publish

lint:
	npx eslint .
