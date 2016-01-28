import React from 'react';
import {assert} from 'chai';
import sinon from 'sinon';
import VerifyPage from '../../../client/components/auth/VerifyPage';
import { mount, describeWithDOM, shallow } from 'enzyme';


describeWithDOM('Verify', () => {

  it('calls the correct function when the verify component mounts', () => {

    const spy = sinon.spy();

    const params = {
      userEmail: 'example@gmail.com',
      verificationToken: '1234'
    };

    const wrapper = mount(<VerifyPage verifyUser={spy} params={params}/>);
    assert.ok(spy.calledOnce);

    assert.deepEqual(spy.getCall(0).args[0].email, params.userEmail);
    assert.deepEqual(spy.getCall(0).args[0].verificationToken, params.verificationToken);
  });

});
