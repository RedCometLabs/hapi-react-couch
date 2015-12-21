import React from 'react/addons';
import  {Login} from '../../../client/components/auth/Login';
import {expect} from 'chai';
import sinon from 'sinon';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate}
  = React.addons.TestUtils;


describe('Login', () => {

  it('renders the Login component correctly', () => {
    const component = renderIntoDocument(
      <Login />
    );

    const form = findRenderedDOMComponentWithTag(component, 'form');
    expect(form).to.be.ok;

    const labels = scryRenderedDOMComponentsWithTag(component, 'label');
    expect(labels.length).to.equal(2);


    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(inputs.length).to.equal(3);
  });


  it('invokes callback when a button is clicked', () => {


    var handleFormSubmit = sinon.spy(Login.prototype.__reactAutoBindMap, 'handleFormSubmit');
    expect(handleFormSubmit).to.not.have.been.calledOnce;


    const dispatch = sinon.spy();

    const component = renderIntoDocument(
      <Login dispatch={dispatch}/>
    );
    const form = findRenderedDOMComponentWithTag(component, 'form');
    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');

    const emailInput = React.findDOMNode(inputs[0]);
    const passwordInput = React.findDOMNode(inputs[1]);

    emailInput.value = 'a@gmail.com';
    passwordInput.value='password';


    Simulate.change(emailInput);
    Simulate.change(passwordInput);

    Simulate.submit(form);
    expect(handleFormSubmit).to.have.been.calledOnce;

    expect(dispatch).to.have.been.calledOnce;
  });
});
