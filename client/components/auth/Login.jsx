import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { Link } from 'react-router';
import { Col, Input, ButtonInput } from 'react-bootstrap';

export const Login = React.createClass({

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

    const { dispatch } = this.props;

    dispatch(actionCreators.loginSubmitted({
      email: this.state.email,
      password: this.state.password
    }));
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

export default connect()(Login);
