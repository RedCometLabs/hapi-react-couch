import React from 'react';
import {Link} from 'react-router';

const NavBar = React.createClass({

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
            <a className="navbar-brand" href="#">Hapi-React-Couch</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li key='Home'><Link to="/">Home</Link></li>
              <li key='Account'><Link to="/account">Account</Link></li>
              {this.props.example?
                <li key='Secret'><Link to="/secret">Secret Page</Link></li> : null
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

export default NavBar;
