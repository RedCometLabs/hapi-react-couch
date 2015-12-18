# Hapi-React-Couch

This is the Red Comet Labs starter template for projects. It is Hapi.js on the server side. React.js and Redux on the client and PouchDB with CouchDB as the database.

## Setup

`npm install` to install all dependencies. By default it looks for CouchDB at http://127.0.0.1:5984. But you can override that by setting the `COUCH` environment variable.

## Tests

`npm test` to run server and client side tests.

## Development

`make server` to run the server instance and `make client` to run the client side. Then visit http://127.0.0.1:8080 for the web app.

## Production

Run `make prod`, this will bundle everything into `/dist/` and serve it via hapi.js.
