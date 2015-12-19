exports.register = function(server, options, next){

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: function(request, reply){
        reply.file('./dist/index.html');
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
          reply.proxy({ passThrough: true, host: '127.0.0.1', port: 8080, protocol: 'http' });
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
            path: 'dist'
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
