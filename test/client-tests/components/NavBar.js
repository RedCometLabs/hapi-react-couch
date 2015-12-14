import React from 'react/addons';
import  NavBar from '../../../client/components/NavBar';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag}
  = React.addons.TestUtils;


describe('NavBar', () => {

  it('renders the Navbar component correctly when EXAMPLE is set to true', () => {
    const component = renderIntoDocument(
      <NavBar example={true} />
    );

    const links = scryRenderedDOMComponentsWithTag(component, 'li');
    expect(links.length).to.equal(3);

    expect(links[0].getDOMNode().textContent).to.equal('Home');
    expect(links[1].getDOMNode().textContent).to.equal('Account');
    expect(links[2].getDOMNode().textContent).to.equal('Secret Page');
  });

  it('renders the Navbar component correctly when EXAMPLE is set to false', () => {
    const component = renderIntoDocument(
      <NavBar example={false} />
    );

    const links = scryRenderedDOMComponentsWithTag(component, 'li');
    expect(links.length).to.equal(2);

    expect(links[0].getDOMNode().textContent).to.equal('Home');
    expect(links[1].getDOMNode().textContent).to.equal('Account');
  });
});
