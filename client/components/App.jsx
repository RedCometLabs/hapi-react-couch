import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';
import NavBar from './NavBar.jsx';
import notie from 'notie';


export const App = React.createClass({
  componentDidMount: function() {
    this.props.checkUserSession();
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.error){
      notie.alert(3, nextProps.error, 2.5);
      this.props.clearErrors();
    } else if (nextProps.info){
      notie.alert(4, nextProps.info, 2.5);
      this.props.clearInfo();
    }
  },

  render() {
    return (
      <div>
        <NavBar {...this.props} />
        {this.props.children}
      </div>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.get('authenticated'),
    error: state.get('error'),
    info: state.get('info')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);
