var config = require('../config');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const dbname = config.couch.db;
console.log('con', config.couch.connect);
const db = new PouchDB(config.couch.connect + '/' + dbname);

function createIndex () {
  return db.createIndex({
    index: {
      fields: ['email']
    }
  }).then(() => {
    return db.createIndex({
      index: {
        fields: ['type']
      }
    });
  });
}
module.exports = createIndex;

if (require.main === module) {
  console.log('CREATING INDEXES');
  createIndex();
}
