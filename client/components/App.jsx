import React from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar.jsx';

export const App = React.createClass({

  render() {
    return (
      <div>
        <div>
          <NavBar {...this.props} />
          {this.props.children}
        </div>
      </div>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    example: state.get('example')
  };
}

export const AppContainer = connect(mapStateToProps)(App);
