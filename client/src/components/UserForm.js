import React from "react";

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '' };
    // need to use arrow function on these functions instead
    // without these this binds
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  async handleSubmit(event) {
    event.preventDefault();
    try{
      const url = '/api/users'
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }
      let _ = await fetch(url , options);
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let header = <h2>Hello</h2>;
    if (this.state.username) {
      header = <h2>Hello {this.state.username}</h2>;
    }
    return (
      <form onSubmit={this.handleSubmit}>
      {header}
      <label>
        Enter a username to submit
        <input
          type='text'
          value={this.state.value}
          name="username"
          onChange={this.handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UserForm;