import {expect} from 'chai';

import {Map, fromJS} from 'immutable';

import reducer from '../../../client/redux/reducers/reducer';

describe('reducer', () => {

  it('handles EXAMPLE_ACTION and sets the state appropriately', () => {
    const initialState = Map();

    const action = {
      type: 'EXAMPLE_ACTION',
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      example: true
    }));
  });
});
