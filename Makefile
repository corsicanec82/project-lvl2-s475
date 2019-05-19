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

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage
