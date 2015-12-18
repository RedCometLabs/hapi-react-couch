import db, {dater} from './db';
import {encrypt} from './crypto';
import uuid from 'node-uuid';
import {sendResetPasswordEmail} from './email';


export function getUser(email) {

  return db.find({
    selector: {email: email}
  }).then(function (result) {
    if(result.docs.length === 0){
      throw new Error('Cannot find a user with that email');
    } else {
      return result.docs[0];
    }
  }).catch(() => {
    throw new Error('Cannot find a user with that email');
  });
}

export function createUser(name, email, password) {
  const date = dater();
  let user = {
    name: name,
    email: email,
    password: encrypt(password),
    scope: 'user',
    'created_at': date,
    'updated_at': date,
    upgraded: false
  };

  return checkUserExists(email)
    .then(check => {

      if (check.exists) {
        throw new Error('Email is invalid or already taken');
      }

      return db.put(user, uuid.v4())
        .then(({id, rev}) => {
          user._rev = rev;
          user._id = id;
          return user;
        });
    });
}

export function checkUserExists(email) {
  return getUser(email)
    .then(() => {
      return {
        exists: true
      };
    })
    .catch(() => {
      return {
        exists: false
      };
    });
}

export function getValidatedUser(email, password) {
  const err = new Error('Email or Password is incorrect');
  return getUser(email)
    .then((user) => {
      if (user.password !== encrypt(password)) {
        throw err;
      }
      return user;
    })
    .catch(() => {
      throw err;
    });
}

export function updateAccountDetails(newDetails) {
  const err = new Error('Could not update account');
  return checkUserExists(newDetails.email)
    .then(res => {
      if (res.exists) {
        throw new err;
      }
      return getUser(newDetails.oldEmail);
    })
    .then((user) => {
      let updatedUser = Object.assign(user, newDetails);
      return db.put(updatedUser, user._id);
    })
    .then(() => {
      return {
        message: 'Account updated'
      };
    })
    .catch(() => {
      throw err;
    });
}

export function createForgottenPasswordToken(email) {
  let uniqueIdentifier; //There must definitely be a better way of passing down this variable in the promise chain
  return getUser(email)
    .then(user => {
      uniqueIdentifier = uuid.v4();
      user.passwordReset = uniqueIdentifier;
      user.passwordResetTimestamp = dater();
      return db.put(user, user._id);
    })
    .then(() => {
      return sendResetPasswordEmail(uniqueIdentifier, email);
    })
    .then(() => {
      return {
        message: 'An email with instructions on how to save your password has been sent to you.'
      };
    })
    .catch(() => {
      throw new Error('Cannot find a user with that email');
    });
}

export function userSavePassword(email, resetToken, password) {
  return getUser(email)
    .then((user) => {
      if(user.passwordReset === resetToken){
        user.password = encrypt(password);
        return db.put(user, user._id);
      } else {
        throw new Error('Incorrect token');
      }
    })
    .then(() => {
      return {
        message: 'New Password Created'
      };
    })
    .catch(err => {
      if (err.reason && err.reason === 'missing') {
        throw new Error('Could not reset account');
      }
      throw err;
    });
}
