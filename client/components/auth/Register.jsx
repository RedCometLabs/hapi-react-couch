import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';
import {History } from 'react-router';

export const Register = React.createClass({
  mixins: [ History ],

  getInitialState: function() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    })
  },

  handleFormSubmit(e) {
    e.preventDefault();

    const { registerUser } = this.props;

    registerUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
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
            <h5 className="text-center">Register</h5>
            <fieldset>
              <div className="form-group">
                <label htmlFor="email" className="col-lg-2 control-label">Name</label>
                <div className="col-lg-10">
                  <input type="text" className="form-control" placeholder="Name" id="name" value={this.state.name} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="col-lg-2 control-label">Email</label>
                <div className="col-lg-10">
                  <input type="text" className="form-control" placeholder="Email" id="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                  <input type="password" className="form-control" placeholder="Password" id="password" value={this.state.password} onChange={this.handleChange}/>
                </div>
              </div>

              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2 buttons-container">
                  <button type="submit" className="btn btn-primary submit-button">Submit</button>
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

export const RegisterContainer = connect(mapStateToProps, actionCreators)(Register);
