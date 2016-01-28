import React from 'react';
import {Col} from 'react-bootstrap';

const VerifyPage = React.createClass({

  propTypes: {
    verifyUser: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.props.verifyUser({
      email: this.props.params.userEmail,
      verificationToken: this.props.params.verificationToken
    });
  },

  render() {

    return (
      <Col md={4} className="panel center-block center-panel">
        <h4>Hi <strong>{this.props.params.userEmail}</strong>, we are verifying your account. Please wait to be re-directed!</h4>
      </Col>
    );
  }
});

export default VerifyPage;
