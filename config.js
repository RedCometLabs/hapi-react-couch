const env = process.env.NODE_ENV || 'dev';

var config = {
  couch: {
    connect: process.env.COUCH || 'http://127.0.0.1:5984/',
    db: 'test-db-' + env
  },
  crypto: {
    salt: 'THIS IS THE VERY LONG TEST SALT',
    keylen: 10,
    iterations: 1
  },
  app: {
    port: process.env.PORT || 3000,
    clientport: 8080,
    host: process.env.HOST || 'localhost'
  },
  mandrill: {
    user: process.env.MANDRILL_USER || 'example@gmail.com',
    password: process.env.MANDRILL_PASSWORD || 'PUT YOUR MANDRILL PASSWORD HERE',
    emailFromAddress: 'example@gmail.com'
  }
};

module.exports = config;
