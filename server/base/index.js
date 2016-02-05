var config = require('../../config');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: function(request, reply){
        reply.file('./public/index.html');
      }
    }
  });

  if (process.env.NODE_ENV === 'development') {
    server.route({
      method: 'GET',
      path:  '/{path*}',
      config: {
        auth: false,
        handler: function (req, reply) {
          console.log('proxying to ', req.url.pathname);
          reply.proxy({ passThrough: true, host: config.app.host , port: 8080, protocol: 'http' });
        }
      }
    });
  } else {
    server.route({
      method: 'GET',
      path: '/{param*}',
      config: {
        auth: false,
        handler: {
          directory: {
            path: 'public'
          }
        }
      }
    });
  }

  next();
};

exports.register.attributes = {
  name: 'base'
};
