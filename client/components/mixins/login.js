const login = {
  clearState() {
    return {
      email: '',
      password: ''
    };
  },

  handleFormSubmit() {
    const userObj = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginSubmitted(userObj);
    this.setState(this.clearState());
  },

  handleInvalidFormSubmit(){
    this.props.applicationError('We could not log you in. Please check the form for errors');
  }

};

export default login;
