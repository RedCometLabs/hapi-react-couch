import {Map} from 'immutable';

const initialState = Map({
  authenticated: false,
  user: null,
  loginModalShown: false,
  signupModalShown: false,
  updateInProgress: false
});

export default function (state = initialState, action = {}) {

  const { data, type } = action;

  switch (type) {
  case 'USER_LOGGED_IN':
    return state.merge({
      authenticated: true,
      user : data.user
    });
  case 'USER_LOGOUT_SUCCEEDED':
    return state.merge({
      authenticated: false,
      user : null
    });
  case 'USER_UPDATED':
    return state.merge({
      user: data.user,
      updateInProgress: false
    });
  case 'HIDE_MODALS':
    return state.merge({
      loginModalShown: false,
      signupModalShown: false
    });
  case 'SHOW_SIGN_UP_MODAL':
    return state.merge({
      loginModalShown: false,
      signupModalShown: true
    });
  case 'SHOW_LOGIN_MODAL':
    return state.merge({
      loginModalShown: true,
      signupModalShown: false
    });
  default:
    return state;
  }
}
