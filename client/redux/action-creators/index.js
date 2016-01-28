import {post, get, put} from '../../utils/ajax.js';
import history from '../../utils/history';

export function loginSubmitted(userData) {
  return function(dispatch) {
    post('login', userData)
    .then(function(data){
      dispatch(userLoggedIn(data));
    })
    .then(() => {
      dispatch(hideModals());
    })
    .then(() => {
      history.replaceState(null, '/dashboard'); /* Gonna fix this, Relax :) */
    })
    .catch(() => {
      dispatch(applicationError('Sorry! Those login details are incorrect.'));
      dispatch(hideModals());
      history.replaceState(null, '/login');
    });
  };
}

export function resetUserPassword(userData) {
  return function(dispatch) {
    post('reset-password', userData)
    .then(function(data){
      dispatch(userLoggedIn(data));
    })
    .catch(() => {
      dispatch(applicationError('Sorry! There was an error in resetting your password'));
    });
  };
}

export function forgotPassword(email) {
  return function(dispatch) {
    post('forgot', email)
    .then(() => {
      dispatch(applicationInfo('Check your emails for details on how to reset your Account'));
    })
    .catch(() => {
      dispatch(applicationError('An account with that email address does not exist'));
    });
  };
}

export function registerUser(userData) {
  return function(dispatch) {
    post('signup', userData)
    .then(function(data) {
      dispatch(userLoggedIn(data));
    })
    .then(() => {
      dispatch(hideModals());
    })
    .then(() => {
      history.replaceState(null, '/dashboard'); /* Gonna fix this, Relax :) */
    })
    .catch(() => {
      dispatch(applicationError('Sorry! Your sign up failed'));
    });
  };
}

export function checkUserSession() {
  return function(dispatch) {
    get('session')
      .then(function(data) {
        dispatch(userLoggedIn(data));
      }).catch(ex => {
        console.log(ex);
      });
  };
}

export function logout() {
  return function(dispatch) {
    get('logout')
      .then(() => {
        dispatch(userLogoutSuceeded());
        dispatch(applicationInfo('Thanks for visiting bookEu!'));
      }).catch(() => {
        dispatch(applicationError('Sorry! Logging out failed'));
      });
  };
}

export function updateUserDetails(newUserDetails) {
  return function(dispatch) {
    put('update-user', newUserDetails)
    .then((data) => {
      dispatch(userUpdated(data));
      dispatch(applicationInfo('Your details have been updated'));
    }).catch(() => {
      dispatch(applicationError('Sorry! We could not update your account details'));
    });
  };
}

export function verifyUser(userDetails) {
  return function(dispatch) {
    post('verify-user', userDetails)
    .then((verifiedAccount) => {
      dispatch(userLoggedIn(verifiedAccount));
      dispatch(applicationInfo('Your account has been verified.'));
    }).catch(() => {
      dispatch(applicationError('Sorry! We could not verify your account.'));
    });
  };
}

export function showSignUpModal(){
  return {
    type: 'SHOW_SIGN_UP_MODAL'
  };
}

export function showLoginModal(){
  return {
    type: 'SHOW_LOGIN_MODAL'
  };
}


export function hideModals() {
  return {
    type: 'HIDE_MODALS'
  };
}

export function clearErrors() {
  return {
    type: 'CLEAR_ERRORS'
  };
}

export function clearInfo(){
  return {
    type: 'CLEAR_INFO'
  };
}

function userLoggedIn(data) {
  return {
    type: 'USER_LOGGED_IN',
    data: data
  };
}

function userLogoutSuceeded() {
  return {
    type: 'USER_LOGOUT_SUCCEEDED'
  };
}

export function applicationError(error) {
  return {
    type: 'APPLICATION_ERROR',
    data: error
  };
}

export function applicationInfo(info) {
  return {
    type: 'APPLICATION_INFO',
    data: info
  };
}

function userUpdated(user) {
  return {
    type: 'USER_UPDATED',
    data: user
  };
}
