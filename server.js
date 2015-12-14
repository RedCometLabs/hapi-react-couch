var Hapi = require('hapi');
var config = require('./config');

// Create a new server
var server = new Hapi.Server();

// Setup the server with a host and port
server.connection({
    port: config.app.port,
    host: '0.0.0.0',
    router: {
        stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*']
      }
    }
});

/*
    Load all plugins and then start the server.
    First: community/npm plugins are loaded
    Second: project specific plugins are loaded
 */
server.register([
    {
        register: require("good"),
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: { ops: '*', request: '*', log: '*', response: '*', 'error': '*' }
            }]
        }
    },
    {
        register: require('inert')
    },
    {
        register: require('./server/auth/index.js')
    },
    {
        register: require('./server/example/index.js')
    },
    {
        register: require('./server/base/index.js')
    }
], function (err) {
    //Start the server
    if (require.main !== module) {
      return;
    }

    server.start(function() {
        //Log to the console the host and port info
        console.log('Server started at: ' + server.info.uri);
    });
});

// Export the server to be required elsewhere.
module.exports = server;
