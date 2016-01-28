import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import {assert} from 'chai';
import Account from '../../../client/components/Account';

const user = {
  name: 'Garren',
  email: 'garren@redcometlabs.com'
};

describe('Account', () => {

  it('sets state on render', () => {
    const wrapper = shallow(<Account user={user} updateInProgress={false} />);

    assert.deepEqual(wrapper.state().name, user.name);
    assert.deepEqual(wrapper.state().email, user.email);
  });

  it('sends application error on invalid form submit', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Account applicationError={spy} user={user}/>);
    wrapper.instance().handleInvalidFormSubmit();
    assert.ok(spy.calledOnce);
  });

  it('submits user form on valid', () => {
    const newEmail = 'new@redcometlabs.com';
    const spy = sinon.spy();
    const wrapper = shallow(<Account updateUserDetails={spy} user={user}/>);
    wrapper.setState({email: newEmail});
    wrapper.instance().handleUserFormSubmit();

    assert.ok(spy.calledOnce);
    assert.deepEqual(spy.getCall(0).args[0].email, newEmail);
    assert.deepEqual(spy.getCall(0).args[0].oldEmail, user.email);
    assert.deepEqual(spy.getCall(0).args[0].name, user.name);
  });

  it('updates state on input change', () => {
    const wrapper = shallow(<Account/>);
    wrapper.find('#name').simulate('change', {target: {id: 'name', value: user.name}});
    wrapper.find('#email').simulate('change', {target: {id: 'email', value: user.email}});

    assert.deepEqual(wrapper.state().name, user.name);
    assert.deepEqual(wrapper.state().email, user.email);
  });

});
