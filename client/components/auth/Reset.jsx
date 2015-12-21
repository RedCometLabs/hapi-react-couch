import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { Col, Input, ButtonInput } from 'react-bootstrap';

const Reset = React.createClass({

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

    const { dispatch } = this.props;

    dispatch(actionCreators.resetUserPassword({
      email: this.props.params.userEmail,
      resetToken: this.props.params.resetToken,
      newPassword: this.state.password
    }));
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

export default connect()(Reset);
