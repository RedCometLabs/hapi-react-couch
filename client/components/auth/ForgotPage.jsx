import React from 'react';
import {Button, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

const ForgotPage = React.createClass({

  getInitialState: function() {
    return {
      email: ''
    };
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  },

  handleFormSubmit() {

    const { dispatch } = this.props;

    const userObj = {
      email: this.state.email
    };
    dispatch(actionCreators.forgotPassword(userObj));
  },

  handleInvalidFormSubmit(){
    const { dispatch } = this.props;
    dispatch(actionCreators.applicationError('Please enter a valid email address.'));
  },

  render() {
    return (
      <Col md={4} className="panel center-block center-panel">
        <Form onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidFormSubmit}>
          <h2>Forgot your Password?</h2>
          <ValidatedInput type='text' label='Email' name='email' id='email' value={this.state.email} onChange={this.handleChange} validate='required,isEmail' errorHelp={{required: 'Please enter your email', isEmail: 'Email is invalid'}} />
          <Button bsStyle="link" href="#login">Login</Button>
          <Button type='submit' bsStyle='primary' style={{float:'right'}}>Send Reset Password Email</Button>
        </Form>
      </Col>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.get('authenticated')
  };
}

export default connect(mapStateToProps)(ForgotPage);
