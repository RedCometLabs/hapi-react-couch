import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import handleChange from '../mixins/handleChange';

const SignUpModal = React.createClass({
  propTypes: {
    registerUser: React.PropTypes.func.isRequired,
    applicationError: React.PropTypes.func.isRequired,
    isShown: React.PropTypes.bool.isRequired,
    hideModals: React.PropTypes.func.isRequired
  },

  mixins: [handleChange],

  clearState () {
    return {
      name: '',
      email: '',
      password: ''
    };
  },

  getInitialState () {
    return this.clearState();
  },

  handleFormSubmit() {
    const userObj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(userObj);
    this.clearState();
  },

  hideSignup () {
    this.setState(this.clearState());
    this.props.hideModals();
  },

  handleInvalidFormSubmit(){
    this.props.applicationError('We could not sign you up. Please check the form for errors');
  },

  render() {
    return (
      <Modal show={this.props.isShown} onHide={this.hideSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Form onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidFormSubmit}>
          <Modal.Body>
            <ValidatedInput
              type='text'
              label='Name'
              name='name' id='name'
              value={this.state.name}
              onChange={this.handleChange}
              validate='required'
              errorHelp={{required: 'Please enter your name'}} />

            <ValidatedInput
              type='text'
              label='Email'
              name='email'
              id='email'
              value={this.state.email}
              onChange={this.handleChange}
              validate='required,isEmail'
              errorHelp={{required: 'Please enter your email', isEmail: 'Email is invalid'}} />

            <ValidatedInput
              type='password'
              label='Password'
              name='password'
              id='password'
              value={this.state.password}
              onChange={this.handleChange}
              validate='required'
              errorHelp={{required: 'Please enter your password'}} />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideSignup}>Close</Button>
            <Button type='submit' bsStyle='primary'>Sign Up</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
});

export default SignUpModal;
