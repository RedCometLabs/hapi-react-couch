
import * as helpers from '../server-test-helper';
import {assert} from 'chai';
import {
  createUser, getValidatedUser, getUser, createForgottenPasswordToken,
  checkUserExists, userSavePassword, updateAccountDetails, verifyUser
} from '../../../lib/user';

describe('User tests', () => {

  beforeEach(() => {
    return helpers.setup();
  });

  describe('getUser', () => {
    it('returns the not found error if the user does not exist', () => {

      return getUser('another@redcometlabs.com')
        .catch(err => {
          assert.equal(err.message, 'Cannot find a user with that email');
        });
    });

    it('returns the user if the user exists', () => {

      return getUser('guest@guest.com')
        .then(user => {
          assert.equal(user.email, 'guest@guest.com');
        });
    });
  });

  describe('checkUserExists', () => {
    it('returns false if the user does not exist in the database ', () => {

      return checkUserExists('another@redcometlabs.com')
        .then(result => {
          assert.equal(result.exists, false);
        });
    });

    it('returns true if the user does exist in the database ', () => {

      return checkUserExists('guest@guest.com')
      .then(result => {
        assert.equal(result.exists, true);
      });
    });
  });

  describe('getValidatedUser', () => {

    it('returns user for correct login', () => {

      return getValidatedUser('guest@guest.com', 'guest')
      .then(user => {
        assert.deepEqual(user.email, 'guest@guest.com');
      });

    });

    it('throws error for wrong password', () => {

      return getValidatedUser('guest@guest.com', 'wrong')
      .catch(err => {
        assert.ok(/is incorrect/.test(err.message));
      });

    });

    it('throws error for wrong username', () => {

      return getValidatedUser('guest-wrong@guest.com', 'wrong')
      .catch(err => {
        assert.ok(/is incorrect/.test(err.message));
      });
    });
  });

  describe('createUser', () => {

    it('creates user with correct credentials and timestamp', () => {

      return createUser('New User', 'newuser@redcometlabs.com', 'mypassword')
        .then(user => {
          assert.equal(user.name, 'New User');
          assert.equal(user.email, 'newuser@redcometlabs.com');
        });
    });

    it('errors if user email exists', () => {
      return createUser('Another User', 'another@redcometlabs.com', 'password')
      .then(() => {
        createUser('Another User123', 'another@redcometlabs.com', 'password')
          .catch(err => {
            assert.deepEqual('Email is invalid or already taken', err.message);
          });
      });
    });
  });

  describe('createForgottenPasswordToken', () => {
    const user = {
      name: 'Forgot',
      email: 'forgot@password.com',
      password: 'Iforget'
    };

    it('creates token and timestamp', () => {
      return createUser(user.name, user.email, user.password)
      .then(user => {
        return createForgottenPasswordToken(user.email);
      })
      .then(() => {
        return getUser(user.email);
      })
      .then(foundUser => {
        assert.notEqual(foundUser.passwordReset, undefined);
        assert.notEqual(foundUser.passwordResetTimestamp, undefined);
      });
    });
  });

  describe('userSavePassword', () => {

    const user = {
      name: 'Reset',
      email: 'reset@password.com',
      password: 'Ireset'
    };

    beforeEach(() => {
      return createUser(user.name, user.email, user.password);
    });

    it('it saves a new password when the user resets their account', () => {
      return createForgottenPasswordToken(user.email)
      .then(() => {
        return getUser(user.email);
      })
      .then(foundUser => {
        return userSavePassword(user.email, foundUser.passwordReset, user.password);
      })
      .then(res => {
        assert.equal(res.message,'New Password Created');
      });
    });

    it('returns correct error when the user token is incorrect', () => {
      return getUser(user.email)
      .then(() => {
        return userSavePassword(user.email, 'wrong token', user.password);
      })
      .catch(err => {
        assert.equal(err.message,'Incorrect token');
      });
    });

    it('returns correct error when the user does not exist', () => {
      return userSavePassword('a@world', 'wrong token', 'password')
      .catch(err => {
        assert.equal(err.message,'Cannot find a user with that email');
      });
    });

  });

  describe('updateAccountDetails', () => {

    it('updates the user profile correctly when updates' , () => {

      let userObject = {
        email: 'new@gmail.com',
        name: 'Bill',
        oldEmail: 'guest@guest.com'
      };
      return updateAccountDetails(userObject)
        .then(result => {
          assert.equal(result.message, 'Account updated');
        });
    });


    it('returns the updated user using the new email address credentials', () => {
      let userObject = {
        email: 'new123@gmail.com',
        name: 'Bill',
        oldEmail: 'guest@guest.com'
      };

      return updateAccountDetails(userObject)
        .then(() => {
          return getUser('new123@gmail.com')
            .then(user => {
              assert.equal(user.email, 'new123@gmail.com');
            });
        });
    });


    it('it handles the error if the account to be updated does not exists' , () => {

      let userObject = {
        email: 'new@gmail.com',
        name: 'Bill',
        oldEmail: 'noexist@guest.com'
      };

      return updateAccountDetails(userObject)
        .catch(err => {
          assert.equal('Could not update account', err.message);
        });
    });

  });



  describe('verifyUser', () => {

    const user = {
      name: 'Verify',
      email: 'verify@example.com',
      password: 'verify'
    };

    let createdUser;

    beforeEach(() => {
      return createUser(user.name, user.email, user.password)
        .then(newUser => {createdUser = newUser;});
    });

    it('it verifies the user when they pass in their correct token', () => {
      user.verificationToken = createdUser.verification.verificationToken;
      getUser(createdUser.email)
      .then(() => {
        return verifyUser(user);
      })
      .then(res => {
        assert.equal(res.user.verification.status, true);
        assert.equal(res.message,'User Verified');
      });
    });


    it('returns correct error when the verification token is incorrect', () => {
      return getUser(user.email)
      .then(() => {
        return verifyUser({email: user.email, verificationToken: 'wrong token'});
      })
      .catch(err => {
        assert.equal(err.message,'Incorrect token');
      });
    });

  });
});
