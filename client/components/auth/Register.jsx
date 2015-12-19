import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { History } from 'react-router';
import { Col, Input, ButtonInput } from 'react-bootstrap';

export const Register = React.createClass({
  mixins: [ History ],

  getInitialState: function() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    })
  },

  handleFormSubmit(e) {
    e.preventDefault();

    const { registerUser } = this.props;

    registerUser({
      name: this.state.name,
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
        <Col className="panel center-block center-panel" md={4}>
          <form onSubmit={this.handleFormSubmit}>
            <h5 className="text-center">Register</h5>
            <fieldset>
            <Input type="text" value={this.state.name} placeholder="Name" id="name" label="Name" onChange={this.handleChange} />
            <Input type="text" value={this.state.email} placeholder="Email" id="email" label="Email" onChange={this.handleChange} />
            <Input type="password" value={this.state.password} placeholder="Password" id="password" label="Password" onChange={this.handleChange} />
            <ButtonInput type="submit" value="Register" />

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

export const RegisterContainer = connect(mapStateToProps, actionCreators)(Register);
