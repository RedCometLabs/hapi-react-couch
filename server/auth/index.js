import * as Joi from 'joi';
import * as Boom from 'boom';
import {
  createUser,
  userSavePassword,
  getValidatedUser,
  createForgottenPasswordToken,
  updateAccountDetails,
  updateBusinessDetails,
  verifyUser
}
from '../../lib/user';

exports.register = function(server, options, next) {

  function createSafeUser (user) {
    return {
      email: user.email,
      name: user.name,
      verification: user.verification,
      verified: user.verification.status
    };
  }

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
      cookie: 'hapi-cookie-1222', // Cookie name
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

            const safeUser = createSafeUser(user);
            request.auth.session.set(safeUser);
            return reply({user: safeUser});

          })
          .catch(function() {
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
        return reply({user: request.auth.credentials});
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
            const safeUser = createSafeUser(user);
            request.auth.session.set(safeUser);
            return reply({user: safeUser});
          })
          .catch(err => {
            console.log('ERR', err);
            reply(Boom.wrap(err, 403));
          });
      }
    }
  });

  server.route({
    method: 'PUT',
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
            const safeUser = createSafeUser(resp.user);
            request.auth.session.set(safeUser);
            return reply({user: safeUser, ok: true});
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
    path: '/verify-user',
    config: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().email().required(),
          verificationToken: Joi.string().required()
        }
      },
      handler: function(request, reply) {

        verifyUser(request.payload)
          .then(resp => {
            const safeUser = createSafeUser(resp.user);
            request.auth.session.set(safeUser);
            return reply({user: safeUser});
          })
          .catch(err => {
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
            const safeUser = createSafeUser(resp.user);
            request.auth.session.set(safeUser);
            return reply({user: safeUser});
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
