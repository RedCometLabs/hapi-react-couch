import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import {History } from 'react-router';
import { Link } from 'react-router';
import { Col, Input, ButtonInput } from 'react-bootstrap';

export const Login = React.createClass({
  mixins: [ History ],

  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  },

  handleFormSubmit(e) {
    e.preventDefault();


    const { loginSubmitted } = this.props;

    loginSubmitted({
      email: this.state.email,
      password: this.state.password
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.authenticated){
      this.history.replaceState(null, '/');
    }
  },

  render() {
    return (
      <Col className={"panel center-block center-panel"} md={4}>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <h5 className="text-center">Login</h5>
            <Input type="text" value={this.state.email} placeholder="Email" id="email" label="Email" onChange={this.handleChange} />
            <Input type="password" value={this.state.password} placeholder="Password" id="password" label="Password" onChange={this.handleChange} />
            <Link to="/forgot" >Forgot Password?</Link>
            <ButtonInput type="submit" value="Login" />
          </fieldset>
        </form>
      </Col>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.get('authenticated')
  };
}

export const LoginContainer = connect(mapStateToProps, actionCreators)(Login);
