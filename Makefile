PATH  := node_modules/.bin:$(PATH)

.PHONY: test hint build-dev less clean setup webpack-dev watch server client

all: setup less hint test

full-install: clean setup less
	npm install

test:
	npm test

less:
	lessc assets/less/index.less > dist/css/index.css

hint:
	npm run link

clean:
	rm -rf dist/

setup:
	mkdir -p dist/css

webpack-dev:
	webpack --debug --progress --colors --config ./webpack.config.dev.js

watch:
	 nodemon -e js,jsx,less,md -w ./app -w ./lib -x make build-dev

watch-tests:
	 nodemon -e js,jsx,less -w ./lib -w ./app -w ./tests -x npm test

server:
	NODE_ENV=development node server.js

client:
	webpack-dev-server

index.html:
	cp ./assets/index.html ./dist/index.html

prod: clean setup less index.html
	webpack --colors --debug --progress --config ./webpack.config.prod.js
