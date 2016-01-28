import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';
import NavigationBar from './NavigationBar';
import notie from 'notie';
import Progress from 'react-progress-2';

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
        <NavigationBar {...this.props} />
        <Progress.Component/>
        {this.props.children}
      </div>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.get('authenticated'),
    error: state.notifications.get('error'),
    info: state.notifications.get('info')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);
