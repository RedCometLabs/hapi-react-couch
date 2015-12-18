import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import {History } from 'react-router';

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
    })
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
      <div>
        <div className="panel center-block center-panel col-md-4">
          <form onSubmit={this.handleFormSubmit}>
            <fieldset>
              <h5 className="text-center">Reset your password</h5>
              <div className="form-group">
                <label htmlFor="password" className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                  <input type="password" className="form-control" placeholder="Password" id="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2 buttons-container">
                  <button type="submit" className="btn btn-primary submit-button">Reset</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
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
