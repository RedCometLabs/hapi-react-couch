const handleChange = {

  handleChange: function(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }
};

export default handleChange;
