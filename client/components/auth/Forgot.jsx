import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import { Col, Input, ButtonInput } from 'react-bootstrap';

const Forgot = React.createClass({

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

  handleFormSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(actionCreators.forgotPassword({
      email: this.state.email
    }));
  },

  render() {
    return (
      <Col className="panel center-block center-panel col-md-4">
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <h5 className="text-center">Forgot your Password?</h5>
            <Input type="text" value={this.state.email} placeholder="Email" id="email" label="Email" onChange={this.handleChange} />
            <ButtonInput type="submit" value="Reset password" />
          </fieldset>
        </form>
      </Col>
    );
  }
});

export default connect()(Forgot);
