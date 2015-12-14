import {spectrePost, spectreGet} from '../../utils/spectreFetch.js';

/* Example Redux Action */
export function exampleAction() {
  return {
    type: 'EXAMPLE_ACTION'
  };
}

/* Example of a AJAX Post through Redux */
export function loginSubmitted(userData) {
  return function(dispatch) {
    spectrePost('login', userData)
    .then(function(data){
      dispatch(userLoggedIn(data));
    })
    .catch(function(ex) {
      alert('Sorry! Those login details are incorrect.');
    })
  }
}

/* Example of a AJAX Get through Redux */
export function logout() {
  return function(dispatch) {
    spectreGet('logout')
      .then(function(response) {
        dispatch(userLogoutSuceeded());
      }).catch(function(ex) {
        alert('Sorry! Logging out failed');
      })
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
