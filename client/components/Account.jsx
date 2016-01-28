import React from 'react';
import { Col, ButtonInput } from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

import handleChange from './mixins/handleChange';

const Account = React.createClass({
  mixins: [handleChange],

  propTypes: {
    updateInProgress: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
    updateUserDetails: React.PropTypes.func.isRequired,
    applicationError: React.PropTypes.func.isRequired
  },

  getInitialState: function() {

    if (!this.props.user) {
      return {
        email: '',
        name: '',
        updateInProgress: this.props.updateInProgress
      };
    }

    return this.getDataFromProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getDataFromProps(nextProps));
  },

  getDataFromProps (props) {
    return {
      email: props.user.email,
      name: props.user.name,
      updateInProgress: props.updateInProgress
    };
  },

  handleUserFormSubmit () {

    const { updateUserDetails} = this.props;

    updateUserDetails({
      email: this.state.email,
      name: this.state.name,
      oldEmail: this.props.user.email
    });

    this.setState({
      updateInProgress: true
    });
  },

  handleInvalidFormSubmit() {
    const { applicationError } = this.props;
    applicationError('We could not update your account. Please check the form for errors');
  },

  getUserForm(){
    return (
      <Form onValidSubmit={this.handleUserFormSubmit} onInvalidSubmit={this.handleInvalidFormSubmit}>
        <h2> Account details </h2>
        <ValidatedInput
          type='text'
          label='Name'
          name='name'
          id='name'
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

        <ButtonInput disabled={this.state.updateInProgress} type='submit' bsStyle='primary' value={this.state.updateInProgress ? 'Loading...' : 'Update Account'} />
      </Form>
    )
  },

  render() {
    return (
      <Col className="panel center-block center-panel" md={4}>
        {this.getUserForm()}
      </Col>
    );
  }
});

export default Account;
