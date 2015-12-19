import * as helpers from '../server-test-helper';
import server from '../../../server';
import { assert } from 'chai';

describe('Auth login', () => {
  before(() => {
    return helpers.setup();
  });

  it('respond wrong password', done => {
    server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'guest@guest.com',
        password: 'wrong'
      }
    }, function (res) {
      assert.deepEqual(res.statusCode, 401);
      done();
    });
  });


  it('login with correct credentials works', done => {
    server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'guest@guest.com',
        password: 'guest'
      }
    }, function (res) {
      assert.deepEqual(res.statusCode, 200);
      done();
    });
  });
});


describe('Auth sign up', () => {

  before(() => {
    return helpers.setup();
  });

  it('signs up user with correct credentials', done => {

    server.inject({
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
      done();
    });
  });

  it('sesson works after sign up', done => {
    const user = {
      name: 'Garren',
      email: 'garren2@newuser.com',
      password: 'new-password'
    };

    server.inject({
      method: 'POST',
      url: '/signup',
      payload: user
    }, () => {
      server.inject({
        method: 'GET',
        url: '/session',
        credentials: user
      }, res => {
        assert.deepEqual(res.statusCode, 200);
        assert.deepEqual(JSON.parse(res.payload).user.name, user.name);

        done();
      });
    });
  });

  it('sends error for incorrect email', done => {
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
      done();
    });
  });

  it('sends error if user already exists', done => {
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
      done();
    });
  });
});

describe('Auth forgotten password', () => {
  before(() => {
    return helpers.setup();
  });

  it('creates password token and timestamp', done => {
    return server.inject({
      method: 'POST',
      url: '/forgot',
      payload: {
        email: 'garren@redcometlabs.com'
      }
    }, res => {
      assert.ok(/An email with/.test(JSON.parse(res.payload).message));
      done();
    });
  });

  it('returns error if user does not exist', done => {
    return server.inject({
      method: 'POST',
      url: '/forgot',
      payload: {
        email: 'not-exist@redcometlabs.com'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 403);
      assert.ok(/Cannot find a user with that email/.test(JSON.parse(res.payload).message));
      done();
    });
  });
});

describe('Updating an account', () => {
  beforeEach(() => {
    return helpers.setup();
  });

  it('returns error if existing email does not exist', done => {
    const user = {
      name: 'Garren',
      email: 'garren@redcometlabs.com',
      password: 'password'
    };

    server.inject({
      method: 'POST',
      url: '/update-user',
      credentials: user,
      payload: {
        email: 'new@gmail.com',
        name: 'Bill',
        oldEmail: 'noexist@guest.com'
      }
    }, res => {
      assert.deepEqual(res.statusCode, 403);
      assert.ok(/Could not update account/.test(JSON.parse(res.payload).message));
      done();
    });
  });

  it('returns error if new email already exists and not equal to old email', done => {
    const user = {
      name: 'Guest',
      email: 'guest@guest.com',
      password: 'guest'
    };

    server.inject({
      method: 'POST',
      url: '/update-user',
      credentials: user,
      payload: {
        email: 'garren@redcometlabs.com',
        name: 'Bill',
        oldEmail: 'guest@guest.com'
      }
    }, res => {
      assert.ok(/Could not update account/.test(JSON.parse(res.payload).message));
      done();
    });
  });

  it('updates just name', done => {
    const user = {
      name: 'Guest',
      email: 'guest@guest.com',
      password: 'guest'
    };

    server.inject({
      method: 'POST',
      url: '/update-user',
      credentials: user,
      payload: {
        email: 'guest@guest.com',
        name: 'Bill',
        oldEmail: 'guest@guest.com'
      }
    }, res => {
      assert.ok(JSON.parse(res.payload).ok);
      done();
    });
  });

  it('cannot update a different users details compared to authenticated user', done => {
    const user = {
      name: 'Guest',
      email: 'guest@guest.com',
      password: 'guest'
    };

    server.inject({
      method: 'POST',
      url: '/update-user',
      credentials: user,
      payload: {
        email: 'fancy@redcometlabs.com',
        name: 'Bill',
        oldEmail: 'garren@redcometlabs.com'
      }
    }, res => {
      assert.ok(/Could not update account/.test(JSON.parse(res.payload).message));
      done();
    });
  });

  it('updates users details', done => {
    const user = {
      name: 'Guest',
      email: 'guest@guest.com',
      password: 'guest'
    };

    server.inject({
      method: 'POST',
      url: '/update-user',
      credentials: user,
      payload: {
        email: 'fancyemail@redcometlabs.com',
        name: 'Bill',
        oldEmail: 'guest@guest.com'
      }
    }, res => {
      assert.ok(JSON.parse(res.payload).ok);
      done();
    });
  });
});
