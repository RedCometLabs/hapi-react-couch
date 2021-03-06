import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import Promise from 'bluebird';
import { createUser } from '../../lib/user';
import createIndex from '../../scripts/setupdb';
import db from '../../lib/db';

chai.use(chaiImmutable);

const users = [
  {
    name: 'Guest',
    email: 'guest@guest.com',
    password: 'guest'
  },{
    name: 'Garren',
    email: 'garren@redcometlabs.com',
    password: 'password'
  }
];


const helpers = {
  createUsers: function () {
    return Promise.all(users.map(user => createUser(user.name, user.email, user.password)))
    .catch(err => {
      console.log('add users err ', err);
    });
  },

  setup: function () {
    return this.clearDB()
    .then(() => {return this.createIndex();})
    .then(() => {return this.createUsers();})
    .catch(err => {
      console.log('err', err);
    });
  },

  createIndex: function(){
    return createIndex()
      .catch(err => {
        console.log('index db err', err);
      });
  },

  clearDB: function () {
    return db.allDocs({include_docs: true})
      .then(res => {
        const docs = res.rows.map(row => {
          let doc = row.doc;
          doc._deleted = true;
          return doc;
        });

        return db.bulkDocs(docs);
      })
      .catch(err => {
        console.log('clear db err', err);
      });
  }
};

module.exports = helpers;
