
import React, { Component } from 'react';
import axios from 'axios';

export default class EditContact extends Component {
  constructor(props) {
    super(props);

    // defines "this"
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangenickname = this.onChangenickname.bind(this);
    this.onChangebirthday = this.onChangebirthday.bind(this);
    this.onChangecreateDate = this.onChangecreateDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      nickname: '',
      birthday: '',
      createDate: new Date(),
      // might not need
      users: []
    };
  }

  // FIXME: change drop down box design, dont want to be able
  // to switch between users.
  // automatically called before anything loaded on page
  componentDidMount() {
    axios.get('http://localhost:5000/contacts/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
          nickname: response.data.nickname,
          birthday: response.data.birthday,
          dateCreated: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })



    axios.get('htto://localhost:5000/users/')
      .then(response => {
        // if at least one user in database
        if (response.data.length > 0) {
          this.setState({
            // returns username from cell, 
            // TODO: this is prob how to get contacts list to work
            users: response.data.map(user => user.username),
          })
        }
      })
  }

  //updates username element to whatever was in textbox 
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangefirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangelastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangephone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeemail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangenickname(e) {
    this.setState({
      nickname: e.target.value
    });
  }

  onChangebirthday(e) {
    this.setState({
      birthday: e.target.value
    });
  }

  onChangecreateDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const contact = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
      nickname: this.state.nickname,
      birthday: this.state.birthday,
      createDate: this.state.date
    };
    console.log(contact);

    // adds contact to database
    axios.post('http://localhost:5000/contacts/update/'+this.props.match.params.id, contact)
      .then(res => console.log(res.data));

    // goes back to contact list
    window.location = '/';
  }


  render() {
    return (
      // Form formatting
      <div>
        <h3>Edit Contact</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  // array of all users from database, map 
                  // returns something for each element of the array
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
            </div>
            <div className="form-group"> 
              <label>First Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.onChangefirstName}
                  />
            </div>
            <div className="form-group">
              <label>Last Name: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChangelastName}
                  />
            </div>

            <div className="form-group">
              <label>Phone Number: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.phone}
                  onChange={this.onChangephone}
                  />
            </div>

            <div className="form-group">
              <label>Email Address: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeemail}
                  />
            </div>

            <div className="form-group">
              <label>Nickname: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.nickname}
                  onChange={this.onChangenickname}
                  />
            </div>

            <div className="form-group">
              <label>Birthday: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.birthday}
                  onChange={this.onChangebirthday}
                  />
            </div>

            <div className="form-group">
              <label>Date Created: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.createDate}
                  onChange={this.onChangecreateDate}
                  />
            </div>

          <div className="form-group">
            <input type="submit" value="Edit Contact" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}