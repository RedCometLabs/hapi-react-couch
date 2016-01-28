import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { History } from 'react-router';
import { Col, Button } from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

export const Reset = React.createClass({
  mixins: [ History ],

  getInitialState: function() {
    return {
      password: ''
    };
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  },

  handleFormSubmit(){
    const { resetUserPassword } = this.props;
    resetUserPassword({
      email: this.props.params.userEmail,
      resetToken: this.props.params.resetToken,
      newPassword: this.state.password
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.authenticated){
      this.history.replaceState(null, '/dashboard');
    }
  },

  handleInvalidFormSubmit(){
    const { applicationError } = this.props;
    applicationError('Please enter your new password');
  },

  render() {

    return (
      <Col md={4} className="panel center-block center-panel">

        <Form onValidSubmit={this.handleFormSubmit} onInvalidSubmit={this.handleInvalidFormSubmit}>
          <h3 className="text-center">Reset your password</h3>
          <ValidatedInput type='password' label='New Password' name='password' id='password' value={this.state.password} onChange={this.handleChange} validate='required' errorHelp={{required: 'Please enter your new password'}} />
          <Button type='submit' bsStyle='primary'>Set New Password</Button>
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

export const ResetContainer = connect(mapStateToProps, actionCreators)(Reset);
