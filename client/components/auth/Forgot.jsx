import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action-creators/index';

export const Forgot = React.createClass({

  getInitialState: function() {
    return {
      email: ''
    };
  },

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    })
  },

  handleFormSubmit(e) {
    e.preventDefault();
    const { forgotPassword } = this.props;
    forgotPassword({
      email: this.state.email
    })
  },

  render() {
    return (
      <div className="panel center-block center-panel col-md-4">
        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <h5 className="text-center">Forgot your Password?</h5>
            <div className="form-group">
              <label htmlFor="email" className="col-lg-2 control-label">Email</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" placeholder="Email" id="email" value={this.state.email} onChange={this.handleChange}/>
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
    );
  }
});

/* Reflux connector */
function mapStateToProps(state) {
  return {
    authenticated: state.get('authenticated')
  };
}

export const ForgotContainer = connect(mapStateToProps, actionCreators)(Forgot);
