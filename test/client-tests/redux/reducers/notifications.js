import {expect} from 'chai';
import {Map, fromJS} from 'immutable';
import reducer from '../../../../client/redux/reducers/notifications';

describe('Notifications Reducers', () => {

  it('handles APPLICATION_ERROR and sets the error state to the error message', () => {
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

  it('handles CLEAR_ERRORS and sets the error state to null', () => {
    const initialState = Map({
      error: 'Example Error'
    });

    const action = {
      type: 'CLEAR_ERRORS'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      error: null
    }));

  });

  it('handles APPLICATION_INFO and sets the info state to the info message', () => {
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

  it('handles CLEAR_INFO and sets the info state to null', () => {
    const initialState = Map({
      info: 'Example Info'
    });

    const action = {
      type: 'CLEAR_INFO'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      info: null
    }));
  });

});
