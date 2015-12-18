import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

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
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Run Pouch Run</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              {this.getHeaderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

export default NavBar;
