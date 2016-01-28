import React from 'react';
import { mount, describeWithDOM } from 'enzyme';
import NavBar from '../../../client/components/NavigationBar';
import {expect} from 'chai';

describeWithDOM('NavBar', () => {

  it('renders the Navbar component correctly when the user is authenticated', () => {
    const wrapper = mount(
      <NavBar authenticated={true} />
    );

    const links = wrapper.find('li');
    expect(links.length).to.equal(3);

    const leftLinks = wrapper.instance().getLeftHeaderLinks();
    const rightLinks = wrapper.instance().getRightHeaderLinks();

    expect(leftLinks[0].key).to.equal('Dashboard');

    expect(rightLinks[0].key).to.equal('Account');
    expect(rightLinks[1].key).to.equal('Logout');
  });

  it('renders the Navbar component correctly when the user is NOT authenticated', () => {
    const wrapper = mount(
      <NavBar authenticated={false} />
    );

    const links = wrapper.find('li');
    expect(links.length).to.equal(2);

    const leftLinks = wrapper.instance().getLeftHeaderLinks();
    const rightLinks = wrapper.instance().getRightHeaderLinks();

    expect(rightLinks[0].key).to.equal('Login');
    expect(rightLinks[1].key).to.equal('SignUp');
  });
});
