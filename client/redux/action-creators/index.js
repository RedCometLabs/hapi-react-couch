import {post, get} from '../../utils/ajax.js';

export function loginSubmitted(userData) {
  return function(dispatch) {
    post('login', userData)
    .then(function(data){
      dispatch(userLoggedIn(data));
    })
    .catch(function(ex) {
      dispatch(applicationError('Sorry! Those login details are incorrect.'));
    })
  }
}

export function resetUserPassword(userData) {
  return function(dispatch) {
    post('reset-password', userData)
    .then(function(data){
      dispatch(userLoggedIn(data));
    })
    .catch(function(ex) {
      dispatch(applicationError('Sorry! There was an error in resetting your password'));
    })
  }
}

export function forgotPassword(email) {
  return function(dispatch) {
    post('forgot', email)
    .then(response => {
      dispatch(applicationInfo('Check your emails for details on how to reset your Account'));
    }).catch(ex => {
      dispatch(applicationError('An account with that email address does not exist'));
    });
  }
}

export function registerUser(userData) {
  return function(dispatch) {
    post('signup', userData)
    .then(function(data) {
      dispatch(userLoggedIn(data));
    }).catch(function(ex) {
      dispatch(applicationError('Sorry! Your sign up failed'));
    })
  }
}

export function checkUserSession() {
  return function(dispatch) {
    get('session')
      .then(function(data) {
        dispatch(userLoggedIn(data));
      }).catch(function(ex) {
        console.log(ex);
      });
  };
}

export function logout() {
  return function(dispatch) {
    get('logout')
      .then(function(response) {
        dispatch(userLogoutSuceeded());
      }).catch(function(ex) {
        dispatch(applicationError('Sorry! Logging out failed'));
      })
  };
}

export function updateUserDetails(newUserDetails) {
  return function(dispatch) {
    post('update-user', newUserDetails)
    .then(function(data) {
      dispatch(userUpdated(newUserDetails));
    }).catch(function(ex) {
      console.log(ex);
      dispatch(applicationError('Sorry! We could not update your account details'));
    })
  }
}




export function clearErrors() {
    return {
      type: 'CLEAR_ERRORS'
    };
}

export function clearInfo(){
  return {
    type: 'CLEAR_INFO'
  }
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

function applicationError(error) {
  return {
    type: 'APPLICATION_ERROR',
    data: error
  };
}

function applicationInfo(info) {
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
