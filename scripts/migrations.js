var config = require('../config');
var PouchDB = require('pouchdb');
var uuid = require('node-uuid');
PouchDB.plugin(require('pouchdb-migrate'));

const dbname = config.couch.db;
console.log('con', config.couch.connect, dbname);
const db = new PouchDB(config.couch.connect + '/' + dbname);

var migrationUser = function (doc) {
  if (doc.scope !== 'user') {
    return false;
  }

  if (doc.type) {
    return false;
  }

  if (doc.type === 'user/v1') {
    return false;
  }

  doc.type = 'user/v1';

  return [doc];
};


db.migrate(migrationUser)
  .then(function (res) {
    console.log('Migrate complete!', res);
  })
  .catch(function (err) {
    console.log('ERR ', err);
  });
