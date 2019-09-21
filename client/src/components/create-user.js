import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    // defines "this" command
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  // updating username in the state to data from textbox 
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  // updating password in the state to data from textbox 
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  // updating email in the state to data from textbox 
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    // variable with data from form
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    // TODO: this is where submit contact to database
    // just logs in console for bugfixing
    console.log(user);

    // sends post request to database
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    // goes back to contact list page (home page)
    window.location = '/';
  }

  render() {
    return (
      // form formatting
      <div>
      <h3>Create New User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>

        <div className="form-group"> 
          <label>Password: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>

        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}