import {Map} from 'immutable';

const initialState = Map({
  example: false
})

export default function (state = initialState, action = {}) {

  const { data, type } = action;

  switch (type) {
    case 'EXAMPLE_ACTION':
      return state.set('example', true);
    default:
      return state;
  }
}
