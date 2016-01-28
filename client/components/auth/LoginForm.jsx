import React from 'react';
import {Button, Col} from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import handleChange from '../mixins/handleChange';
import login from '../mixins/login';

const LoginForm = React.createClass({
  propTypes: {
    loginSubmitted: React.PropTypes.func.isRequired,
    applicationError: React.PropTypes.func.isRequired
  },

  mixins: [login, handleChange],

  getInitialState: function() {
    return this.clearState();
  },

  render () {
    return (
      <Col md={4} className="panel center-block center-panel">
        <h2>Login</h2>
        <Form onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidFormSubmit}>
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

          <Button bsStyle="link" href="#forgot">Forgot your password?</Button>
          <Button type='submit' bsStyle='primary' style={{float:'right'}}>Login</Button>
        </Form>
      </Col>
    );
  }
});

export default LoginForm;
