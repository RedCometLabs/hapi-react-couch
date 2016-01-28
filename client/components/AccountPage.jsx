import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';
import Account from './Account';

export const AccountPage = React.createClass({

  propTypes: {
    updateInProgress: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
    updateUserDetails: React.PropTypes.func.isRequired,
    applicationError: React.PropTypes.func.isRequired,
    authenticated: React.PropTypes.bool.isRequired
  },

  render() {

    return (
      <Account
        user={this.props.user.toJSON()}
        updateInProgress={this.props.updateInProgress}
        authenticated={this.props.authenticated}
        applicationError={this.props.applicationError}
        updateUserDetails={this.props.updateUserDetails}
      />
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    user: state.auth.get('user'),
    authenticated: state.auth.get('authenticated'),
    updateInProgress: state.auth.get('updateInProgress')
  };
}

export default connect(mapStateToProps, actionCreators)(AccountPage);
