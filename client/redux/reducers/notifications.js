import {Map} from 'immutable';

const initialState = Map({
  error: null,
  info: null
});

export default function (state = initialState, action = {}) {

  const { data, type } = action;

  switch (type) {
  case 'APPLICATION_ERROR':
    return state.set('error', data);
  case 'CLEAR_ERRORS':
    return state.set('error', null);
  case 'APPLICATION_INFO':
    return state.set('info', data);
  case 'CLEAR_INFO':
    return state.set('info', null);
  default:
    return state;
  }
}
