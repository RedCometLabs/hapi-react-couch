import React from 'react';
import { shallow } from 'enzyme';
import {assert} from 'chai';
import sinon from 'sinon';
import LoginForm from '../../../client/components/auth/LoginForm';

describe('Login', () => {

  function checkEmptyState(wrapper) {
    assert.deepEqual(wrapper.state().email, '');
    assert.deepEqual(wrapper.state().password, '');
  }

  it('initial state is empty', () => {
    const wrapper = shallow(<LoginForm />);
    checkEmptyState(wrapper);
  });

  it('updates email state on input', () => {
    const email = 'garren@redcometlabs.com';
    const wrapper = shallow(<LoginForm/>);
    wrapper.find('#email').simulate('change', {target: {id: 'email', value: email}});
    assert.deepEqual(wrapper.state().email, email);
  });

  it('updates password state on input', () => {
    const password = 'my-password';
    const wrapper = shallow(<LoginForm />);
    wrapper.find('#password').simulate('change', {target: {id: 'password', value: password}});
    assert.deepEqual(wrapper.state().password, password);
  });

  it('sends application error on invalid form submit', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<LoginForm applicationError={spy} isShown={true}/>);
    wrapper.instance().handleInvalidFormSubmit();
    assert.ok(spy.calledOnce);
  });

  it('submits form on valid', () => {
    const spy = sinon.spy();
    const email = 'garren@redcometlabs.com';
    const password = 'password';
    const wrapper = shallow(<LoginForm loginSubmitted={spy} isShown={true}/>);
    wrapper.setState({email: email, password: password});
    wrapper.instance().handleFormSubmit();

    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.getCall(0).args[0].email, email);
    assert.deepEqual(spy.getCall(0).args[0].password, password);
  });

});
