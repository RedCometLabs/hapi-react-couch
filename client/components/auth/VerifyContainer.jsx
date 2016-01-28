import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { History } from 'react-router';
import {notAuthenticated} from '../mixins/auth';
import VerifyPage from './VerifyPage';

export const VerifyContainer = React.createClass({
  mixins: [ History, notAuthenticated ],

  propTypes: {
    verifyUser: React.PropTypes.func.isRequired
  },

  render() {

    return (
      <VerifyPage params={this.props.params} verifyUser={this.props.verifyUser}/>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.get('authenticated')
  };
}

export default connect(mapStateToProps, actionCreators)(VerifyContainer);
