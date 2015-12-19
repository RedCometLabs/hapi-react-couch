import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import {li, Navbar, Nav} from 'react-bootstrap';

const NavBar = React.createClass({

  getHeaderLinks: function() {
    var universalLinks = [<li key='Home'><Link to="/">Home</Link></li>];
    var authenticatedLinks = [
      <li key='Account'><Link to="/account">Account</Link></li>,
      <li key='Logout'><a onClick={this.props.logout}>Logout</a></li>
    ];
    var unAuthenticatedLinks = [
      <li key='Login'><Link to="/login">Login</Link></li>,
      <li key='Register'><Link to="/register" >Register</Link></li>
    ];

    if (this.props.authenticated) {
      return _.union(universalLinks, authenticatedLinks);
    }

    return _.union(universalLinks, unAuthenticatedLinks);
  },

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Main Title</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.getHeaderLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    );
  }
});

export default NavBar;
