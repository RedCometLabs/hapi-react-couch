import {expect} from 'chai';

import {Map, fromJS} from 'immutable';

import reducer from '../../../client/redux/reducers/reducer';

describe('reducer', () => {

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


  it('handles APPLICATION_ERROR and sets the state appropriately', () => {
    const initialState = Map({
      error: null
    });

    const action = {
      type: 'APPLICATION_ERROR',
      data: 'Example Error'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      error: 'Example Error'
    }));
  });

  it('handles CLEAR_ERRORS and sets the state appropriately', () => {
    const initialState = Map({
      error: 'Example Error'
    });

    const action = {
      type: 'CLEAR_ERRORS',
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      error: null
    }));

  });

  it('handles APPLICATION_INFO and sets the state appropriately', () => {
    const initialState = Map({
      info: null
    });

    const action = {
      type: 'APPLICATION_INFO',
      data: 'Example Info'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      info: 'Example Info'
    }));
  });

  it('handles CLEAR_INFO and sets the state appropriately', () => {
    const initialState = Map({
      info: 'Example Info'
    });

    const action = {
      type: 'CLEAR_INFO',
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      info: null
    }));
  });

  it('handles USER_UPDATED and sets the state appropriately', () => {
    const initialState = Map({
      user: {email: 'old@gmail.com'}
    });

    const action = {
      type: 'USER_UPDATED',
      data: {email: 'new@gmail.com'}
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      user: {email: 'new@gmail.com'}
    }));
  });
});
