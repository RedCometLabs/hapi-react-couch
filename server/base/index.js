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

  next();
};

exports.register.attributes = {
    name: 'base'
};
