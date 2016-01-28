import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import {assert} from 'chai';
import SignUpModal from '../../../client/components/Modals/SignUpModal';

describe('Sign up Modal', () => {

  function checkEmptyState(wrapper) {
    assert.deepEqual(wrapper.state().email, '');
    assert.deepEqual(wrapper.state().name, '');
    assert.deepEqual(wrapper.state().password, '');
  }

  it('initial state is empty', () => {
    const wrapper = shallow(<SignUpModal />);
    checkEmptyState(wrapper);
  });

  it('updates fields state on input', () => {
    const email = 'garren@redcometlabs.com';
    const name = 'garren';
    const password = 'password';

    const wrapper = shallow(<SignUpModal isShown={true}/>);
    wrapper.find('#email').simulate('change', {target: {id: 'email', value: email}});
    wrapper.find('#name').simulate('change', {target: {id: 'name', value: name}});
    wrapper.find('#password').simulate('change', {target: {id: 'password', value: password}});
    assert.deepEqual(wrapper.state().email, email);
    assert.deepEqual(wrapper.state().name, name);
  });

  it('hideLogin clears state', () => {
    const wrapper = shallow(<SignUpModal isShown={true} hideModals={function () {}}/>);
    wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'mypassword'}});
    wrapper.find('#email').simulate('change', {target: {id: 'email', value: 'garren@redcometlabs'}});
    wrapper.instance().hideSignup();
    checkEmptyState(wrapper);
  });

  it('calls hideModals', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<SignUpModal hideModals={spy} isShown={true}/>);
    wrapper.find('#password').simulate('change', {target: {id: 'password', value: 'mypassword'}});
    wrapper.find('#email').simulate('change', {target: {id: 'email', value: 'garren@redcometlabs'}});
    wrapper.instance().hideSignup();
    assert.ok(spy.calledOnce);
  });

  it('sends application error on invalid form submit', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<SignUpModal applicationError={spy} isShown={true}/>);
    wrapper.instance().handleInvalidFormSubmit();
    assert.ok(spy.calledOnce);
  });

  it('submits form on valid', () => {
    const spy = sinon.spy();
    const email = 'garren@redcometlabs.com';
    const password = 'password';
    const name = 'garren';

    const wrapper = shallow(<SignUpModal registerUser={spy} isShown={true}/>);
    wrapper.setState({email: email, password: password, name: name});
    wrapper.instance().handleFormSubmit();

    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.getCall(0).args[0].email, email);
    assert.deepEqual(spy.getCall(0).args[0].password, password);
    assert.deepEqual(spy.getCall(0).args[0].name, name);
  });

});
