import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

import handleChange from '../mixins/handleChange';
import login from '../mixins/login';

export const LoginModal = React.createClass({
  mixins: [login, handleChange],

  propTypes: {
    isShown: React.PropTypes.bool.isRequired,
    hideModals: React.PropTypes.func.isRequired,
    loginSubmitted: React.PropTypes.func.isRequired,
    applicationError: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return this.clearState();
  },

  hideLogin () {
    this.setState(this.clearState());
    this.props.hideModals();
  },

  render() {
    return (
      <Modal show={this.props.isShown} onHide={this.hideLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Form id="loginform" onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidFormSubmit}>
          <Modal.Body>
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
              validate='required' errorHelp={{required: 'Please enter your password'}} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="link" href="#forgot" onClick={this.hideLogin}>Forgot your password?</Button>
            <Button onClick={this.hideLogin}>Close</Button>
            <Button type='submit' bsStyle='primary'>Login</Button>
          </Modal.Footer>
        </Form>
      </Modal>
  );
  }
});
