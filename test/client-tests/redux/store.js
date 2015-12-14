import {fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../../../client/redux/reducers/reducer';
import {createStore} from 'redux';

describe('store', () => {

  it('the redux store changes correctly when EXAMPLE_ACTION is dispatched', () => {

    const store = createStore(reducer);
    expect(store.getState()).to.equal(fromJS({
      example: false
    }));

    store.dispatch({
      type: 'EXAMPLE_ACTION',
    });

    expect(store.getState()).to.equal(fromJS({
      example: true
    }));
  });
});
