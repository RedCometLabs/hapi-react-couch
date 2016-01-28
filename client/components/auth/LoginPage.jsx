import React from 'react';
import {connect} from 'react-redux';
import {History } from 'react-router';
import * as actionCreators from '../../redux/action-creators/index';
import {notAuthenticated} from '../mixins/auth';
import LoginForm from './LoginForm';

export const LoginPage = React.createClass({
  propTypes: {
    loginSubmitted: React.PropTypes.func.isRequired,
    applicationError: React.PropTypes.func.isRequired
  },
  mixins: [ History, notAuthenticated],

  render() {
    return (
      <LoginForm loginSubmitted={this.props.loginSubmitted}
        applicationError={this.props.applicationError} />
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.get('authenticated')
  };
}

export default connect(mapStateToProps, actionCreators)(LoginPage);
