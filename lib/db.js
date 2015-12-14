import config from '../config';
import PouchDB from 'pouchdb';
import PouchDbfind from 'pouchdb-find';

const dbname = config.couch.db;
PouchDB.plugin(PouchDbfind);
const db = new PouchDB(config.couch.connect + '/' + dbname)

export default db;


export function dater () {
  return (new Date()).toJSON();
}
