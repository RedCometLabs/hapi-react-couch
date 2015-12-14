var config = require('../config');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

var fs = require('fs');

const dbname = config.couch.db;
const db = new PouchDB(config.couch.connect + '/' + dbname)

function createIndex () {
  return db.createIndex({
    index: {
      fields: ['email']
    }
  })
}
module.exports = createIndex;
