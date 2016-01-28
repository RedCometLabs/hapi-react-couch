import React from 'react';
import {Link} from 'react-router';
import {li, Navbar, Nav, NavItem} from 'react-bootstrap';
import {History } from 'react-router';

const NavigationBar = React.createClass({

  mixins: [ History ],

  getLeftHeaderLinks: function() {
    var allLeftHeaderLinks = [
      <li key='Dashboard'><Link to="/dashboard">Dashboard</Link></li>
    ];

    if(this.props.authenticated){
      return allLeftHeaderLinks;
    } else {
      return [];
    }
  },

  getRightHeaderLinks: function() {
    var authenticatedLinks = [
      <li key='Account'><Link to="/account">Account</Link></li>,
      <NavItem key='Logout' href="#" onClick={this.props.logout}>Logout</NavItem>
    ];
    var unAuthenticatedLinks = [
      <NavItem key='Login' onClick={this.props.showLoginModal}>Login</NavItem>,
      <NavItem key='SignUp' onClick={this.props.showSignUpModal}>Sign Up</NavItem>
    ];

    if (this.props.authenticated) {
      return authenticatedLinks;
    } else if (!this.getIsActive()) {
      return unAuthenticatedLinks;
    }
  },

  getIsActive () {
    if (this.context.history) {
      return !this.context.history.isActive('');
    }
    return false;
  },

  render() {
    return (
      <Navbar inverse={this.getIsActive()}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={"#"}>
              HAPI-COUCH-REACT
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.getLeftHeaderLinks()}
          </Nav>
          <Nav pullRight>
            {this.getRightHeaderLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

export default NavigationBar;
