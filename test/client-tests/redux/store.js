import {fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../../../client/redux/reducers/reducer';
import {createStore} from 'redux';

describe('store', () => {

  it('the redux store changes correctly when the user logs in and out', () => {

    const store = createStore(reducer);
    expect(store.getState()).to.equal(fromJS({
      authenticated: false,
      error: null,
      info: null,
      user: null
    }));

    store.dispatch({
      type: 'USER_LOGGED_IN',
      data: {user: {example: 'user'}}
    });
    expect(store.getState()).to.equal(fromJS({
      authenticated: true,
      error: null,
      info: null,
      user: {example: 'user'}
    }));

    store.dispatch({
      type: 'USER_LOGOUT_SUCCEEDED'
    });

    expect(store.getState()).to.equal(fromJS({
      authenticated: false,
      error: null,
      info: null,
      user: null
    }));
  });
});
