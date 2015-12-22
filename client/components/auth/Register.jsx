import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { Col, Input, ButtonInput } from 'react-bootstrap';

const Register = React.createClass({

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

    const { dispatch } = this.props;

    dispatch(actionCreators.registerUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }));
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

export default connect()(Register);
