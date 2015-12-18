import {Map} from 'immutable';

const initialState = Map({
  authenticated: false,
  error: null,
  info: null,
  user: null
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
    console.log('logout');
    return state.merge({
      authenticated: false,
      user : null
    });
  case 'APPLICATION_ERROR':
    return state.set('error', data);
  case 'CLEAR_ERRORS':
    return state.set('error', null);
  case 'APPLICATION_INFO':
    return state.set('info', data);
  case 'CLEAR_INFO':
    return state.set('info', null);
  case 'USER_UPDATED':
    return state.merge({
      user: data
    });
  default:
    return state;
  }
}
