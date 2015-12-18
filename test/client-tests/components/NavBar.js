import React from 'react/addons';
import  NavBar from '../../../client/components/NavBar';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag}
  = React.addons.TestUtils;


describe('NavBar', () => {

  it('renders the Navbar component correctly when the user is authenticated', () => {
    const component = renderIntoDocument(
      <NavBar authenticated={true} />
    );

    const links = scryRenderedDOMComponentsWithTag(component, 'li');
    expect(links.length).to.equal(3);

    expect(links[0].getDOMNode().textContent).to.equal('Home');
    expect(links[1].getDOMNode().textContent).to.equal('Account');
    expect(links[2].getDOMNode().textContent).to.equal('Logout');
  });

  it('renders the Navbar component correctly when the user is NOT authenticated', () => {
    const component = renderIntoDocument(
      <NavBar authenticated={false} />
    );

    const links = scryRenderedDOMComponentsWithTag(component, 'li');
    expect(links.length).to.equal(3);

    expect(links[0].getDOMNode().textContent).to.equal('Home');
    expect(links[1].getDOMNode().textContent).to.equal('Login');
    expect(links[2].getDOMNode().textContent).to.equal('Register');
  });
});
