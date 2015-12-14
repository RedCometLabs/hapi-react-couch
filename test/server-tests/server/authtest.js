import * as helpers from '../server-test-helper';
import server from '../../../server';
import { assert } from 'chai';

describe('Auth login', () => {
  before(() => {
    return helpers.setup();
  });

  it('respond wrong password', () => {
    return server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'guest@guest.com',
        password: 'wrong'
      }
    }, function (res) {
      assert.deepEqual(res.statusCode, 401);
    });
  });


  it('login with correct credentials works', () => {
    return server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'guest@guest.com',
        password: 'guest'
      }
    }, function (res) {
      assert.deepEqual(res.statusCode, 200);
    });
  });
});


describe('Auth sign up', () => {

  before(() => {
    return helpers.setup();
  });

  it('signs up user with correct credentials', () => {

    return server.inject({
      method: 'POST',
      url: '/signup',
      payload: {
        name: 'Garren',
        email: 'garren@newuser.com',
        password: 'new-password'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 200);

      let returnedUser = JSON.parse(res.payload);

      assert.deepEqual(returnedUser.user.name, 'Garren');
      assert.deepEqual(returnedUser.user.email, 'garren@newuser.com');
    });
  });

  it('sends error for incorrect email', () => {
    return server.inject({
      method: 'POST',
      url: '/signup',
      payload: {
        name: 'Garren',
        email: 'garren',
        password: 'new-password'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 400);
      assert.ok(/must be a valid email/.test(JSON.parse(res.payload).message));
    });
  });

  it('sends error if user already exists', () => {
    return server.inject({
      method: 'POST',
      url: '/signup',
      payload: {
        name: 'Guest',
        email: 'guest@guest.com',
        password: 'new-password'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 403);
      assert.ok(/Email is invalid or already taken/.test(JSON.parse(res.payload).message));
    });
  });
});

describe('Auth forgotten password', () => {
  before(() => {
    return helpers.setup();
  });

  it('creates password token and timestamp', () => {
    return server.inject({
      method: 'POST',
      url: '/forgot',
      payload: {
        email: 'garren@redcometlabs.com'
      }
    }, res => {
      assert.equal(JSON.parse(res.payload).message, 'Cannot find a user with that email');
    });
  });

  it('returns error if user does not exist', () => {
    return server.inject({
      method: 'POST',
      url: '/forgot',
      payload: {
        email: 'not-exist@redcometlabs.com'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 403);
      assert.ok(/Cannot find a user with that email/.test(JSON.parse(res.payload).message));
    });
  });
});

describe('Updating an account', () => {
  before(() => {
    return helpers.setup();
  });

  it('returns error if user does not exist', () => {
    return server.inject({
      method: 'POST',
      url: '/update-user',
      payload: {
        email: 'new@gmail.com',
        name: 'Bill',
        oldEmail: 'noexist@guest.com'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 403);
      assert.ok(/Cannot find a user with that email/.test(JSON.parse(res.payload).message));
    });
  });

  it('returns error if user does exist', () => {
    return server.inject({
      method: 'POST',
      url: '/update-user',
      payload: {
        email: 'new@gmail.com',
        name: 'Bill',
        oldEmail: 'guest@guest.com'
      }
    }, res => {
      assert.ok(/Cannot find a user with that email/.test(JSON.parse(res.payload).message));
    });
  });

});
