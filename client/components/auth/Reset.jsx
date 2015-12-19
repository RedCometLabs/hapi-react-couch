import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { History } from 'react-router';
import { Col, Input, ButtonInput } from 'react-bootstrap';

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

  handleFormSubmit(e){
    e.preventDefault();
    const { resetUserPassword } = this.props;
    resetUserPassword({
      email: this.props.params.userEmail,
      resetToken: this.props.params.resetToken,
      newPassword: this.state.password
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.authenticated){
      this.history.replaceState(null, '/');
    }
  },

  render() {

    return (
      <Col md={4} className="panel center-block center-panel">
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <h5 className="text-center">Reset your password</h5>
            <Input type="password" value={this.state.password} placeholder="Password" id="password" label="Password" onChange={this.handleChange} />
            <ButtonInput type="submit" value="Reset" />
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

export const ResetContainer = connect(mapStateToProps, actionCreators)(Reset);
