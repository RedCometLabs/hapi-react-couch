import * as Joi from 'joi';
import * as Boom from 'boom';
import {
  createUser, userSavePassword, getValidatedUser, createForgottenPasswordToken, updateAccountDetails
}
from '../../lib/user';

exports.register = function(server, options, next) {

  server.register([{
    register: require('hapi-auth-cookie')
  }], function(err) {
    if (err) {
      console.error('Failed to load a plugin:', err);
      throw err;
    }
    // Set our server authentication strategy
    server.auth.strategy('standard', 'cookie', {
      password: 'somecrazycookiesecretthatcantbeguesseswouldgohere', // cookie secret
      cookie: 'spectre-cookie-123', // Cookie name
      isSecure: false, // required for non-https applications
      isHttpOnly: false,
      ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
    });

  });

  server.auth.default({
    strategy: 'standard',
    scope: ['user']
  });

  server.route({
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(2).max(200).required()
        }
      },
      handler: function(request, reply) {
        getValidatedUser(request.payload.email, request.payload.password)
          .then(function(user) {
            var safeUser = {
              email: user.email,
              name: user.name
            };

            request.auth.session.set(safeUser);
            return reply({user:safeUser});
          })
          .catch(function(err) {
            return reply(Boom.unauthorized('Bad email or password'));
          });
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
      handler: function(request, reply) {

        request.auth.session.clear();
        return reply({ok: true, message: 'Logout Successful!'});

      }
    }
  });


  server.route({
    method: 'GET',
    path: '/session',
    config: {
      auth: 'standard',
      handler: function(request, reply) {
        //Whatever you pass to request.auth.session.set() will be available in request.auth.credentials.
        //But it will only be there on secured routes. That tripped me up a bit.
        //I figured it should always be there for every route.
        return reply({user: {
          name: request.auth.credentials.name,
          email: request.auth.credentials.email
        }});
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/signup',
    config: {
      auth: false,
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(2).max(200).required()
        }
      },
      handler: function(request, reply) {
        const {
          name, email, password
        } = request.payload;
        createUser(name, email, password)
          .then(user => {
            request.auth.session.set(user);
            //only send what is required
            return reply({user:{
              name: user.name,
              email: user.email
            }});
          })
          .catch(err => {
            console.log('err', err);
            reply(Boom.wrap(err, 403));
          });
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/update-user',
    config: {
      auth: 'standard',
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          oldEmail: Joi.string().email().required()
        }
      },
      handler: function(request, reply) {
        if (request.payload.oldEmail !== request.auth.credentials.email) {
          return reply(Boom.forbidden('Could not update account details!'));
        }

        updateAccountDetails(request.payload)
          .then(resp => {
            request.auth.session.set({
              name: resp.user.name,
              email: resp.user.email
            });

            return reply({
              message: resp.message,
              ok: true
            });
          })
          .catch(err => {
            console.log('err', err.message);
            reply(Boom.wrap(err, 403));
          });
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/forgot',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().email().required()
        }
      },
      handler: function(request, reply) {
        const email = request.payload.email;
        createForgottenPasswordToken(email)
          .then(resp => {
            return reply({
              message: resp.message,
              ok: true
            });
          })
          .catch(err => {
            console.log('err', err);
            reply(Boom.wrap(err, 403));
          });
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/reset-password',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().required(),
          resetToken: Joi.string().required(),
          newPassword: Joi.string().required()
        }
      },
      handler: function(request, reply) {
        const {
          email, resetToken, newPassword
        } = request.payload;
        userSavePassword(email, resetToken, newPassword)
          .then(resp => {
            return reply({user:user});
          })
          .catch(err => {
            console.log('err', err);
            reply(Boom.wrap(err, 403));
          });
      }
    }
  });


  next();
};

exports.register.attributes = {
  name: 'auth'
};
