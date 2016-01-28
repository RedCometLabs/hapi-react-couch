

export const notAuthenticated = {
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.authenticated){
      this.history.replaceState(null, '/dashboard');
    }
  }
};
