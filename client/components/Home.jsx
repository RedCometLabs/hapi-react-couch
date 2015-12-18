import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';

const Home = React.createClass({
  render() {
    if (!this.props.user) {
      return (
        <div className="container-fluid">
          Welcome, login or register.
        </div>
      );
    }
    return (
      <div className="container-fluid">
        Hi {this.props.user.get('name')}, this is home
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

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home);
