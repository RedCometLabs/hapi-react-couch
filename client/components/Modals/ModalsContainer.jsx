import React from 'react';

import {LoginModal} from './LoginModal';
import SignUpModal from './SignUpModal';

export const ModalsContainer = React.createClass({

  render() {
    return (
      <div>
        <LoginModal isShown={this.props.loginModalShown} hideModals={this.props.hideModals} applicationError={this.props.applicationError} loginSubmitted={this.props.loginSubmitted} />
        <SignUpModal isShown={this.props.signupModalShown} hideModals={this.props.hideModals} applicationError={this.props.applicationError} registerUser={this.props.registerUser}/>
      </div>
    );
  }
});
