import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/action-creators/index';
import { Col, Input, ButtonInput } from 'react-bootstrap';

export const Account = React.createClass({

  getUserFromProps (props) {
    return {
      email: props.user.get('email'),
      name: props.user.get('name')
    };
  },

  getInitialState: function() {

    if (!this.props.user) {
      return {
        email: '',
        name: ''
      };
    }
    return this.getUserFromProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.updateUserIfEmpty(nextProps);
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  },

  handleFormSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(actionCreators.updateUserDetails({
      email: this.state.email,
      name: this.state.name,
      oldEmail: this.props.user.get('email')
    }));
  },

  updateUserIfEmpty(props) {

    if (this.state.name.length === 0 && this.state.email.length === 0) {
      this.setState(this.getUserFromProps(props));
    }
  },

  render() {

    return (
        <Col className="panel center-block center-panel" md={4}>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <h5 className="text-center">Account</h5>
            <Input type="text" value={this.state.name} placeholder="Name" id="name" label="Name" onChange={this.handleChange} />
            <Input type="text" value={this.state.email} placeholder="Email" id="email" label="Email" onChange={this.handleChange} />
            <ButtonInput type="submit" value="Update Details" />
          </fieldset>
        </form>
      </Col>
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    user: state.get('user')
  };
}

export const AccountContainer = connect(mapStateToProps)(Account);
