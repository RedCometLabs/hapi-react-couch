import {expect} from 'chai';
import {Map, fromJS} from 'immutable';
import reducer from '../../../../client/redux/reducers/auth';

describe('Auth Reducer', () => {

  it('handles USER_LOGGED_IN and sets the state appropriately', () => {
    const initialState = Map();

    const action = {
      type: 'USER_LOGGED_IN',
      data: {user: {example: 'user'}}
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      authenticated: true,
      user: {example: 'user'}
    }));
  });

  it('handles USER_LOGOUT_SUCCEEDED and sets the state appropriately', () => {
    const initialState = Map({
      authenticated: true,
      user: {example: 'user'}
    });

    const action = {
      type: 'USER_LOGOUT_SUCCEEDED'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      authenticated: false,
      user: null
    }));
  });

  it('handles USER_UPDATED and sets the state appropriately', () => {
    const initialState = Map({
      user: {email: 'old@gmail.com'}
    });

    const action = {
      type: 'USER_UPDATED',
      data: {
        user: {
          email: 'new@gmail.com'
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      user: {email: 'new@gmail.com'},
      updateInProgress: false
    }));
  });
});
