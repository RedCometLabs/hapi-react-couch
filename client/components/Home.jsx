import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';
import {Grid} from 'react-bootstrap';

const Home = React.createClass({
  getContent () {
    if (!this.props.authenticated) {
      return 'Welcome, login or register.';
    }
    return <p>Hi {this.props.user.get('name')}, this is home</p>;
  },

  render() {
    return (
      <Grid fluid={true}>
        {this.getContent()}
      </Grid>
    );
  }
});


/* Reflux connector */
function mapStateToProps(state) {
  return {
    user: state.get('user'),
    authenticated: state.get('authenticated')
  };
}

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home);
