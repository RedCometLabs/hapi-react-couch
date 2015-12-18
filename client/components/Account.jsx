import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';

const Account = React.createClass({

  handleClick(){
    const { dispatch } = this.props;
    dispatch(Actions.exampleAction());
  },

  render() {
    return (
      <div className="container-fluid" onClick={this.handleClick}>
        Click here to find the secret Link through Redux
      </div>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    user: state.get('user')
  };
}

export const AccountContainer = connect(mapStateToProps, actionCreators)(Account);
