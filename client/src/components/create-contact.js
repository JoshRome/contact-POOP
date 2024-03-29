
import React, { Component } from "react";
import axios from 'axios';
// import {Link} from 'react-router-dom';

// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../actions/authActions";


export default class CreateContact extends Component {
  constructor(props) {
    super(props);
    //const{id} = this.props.location.state;
    // var id = '5d8e9102bfb9b671d5868a5e';
    // console.log(id);
    // defines "this"
    // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangefirst_name = this.onChangefirst_name.bind(this);
    this.onChangelast_name = this.onChangelast_name.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangenickname = this.onChangenickname.bind(this);
    this.onChangebirthday = this.onChangebirthday.bind(this);
    this.onChangecreateDate = this.onChangecreateDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // here is where we are stuck, to get the objectID of the user to add to here
      owner: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      nickname: '',
      birthday: '',
      createDate: new Date(),
      // might not need
      // users: []
    };
  }


  // FIXME: change drop down box design, dont want to be able
  // to switch between users.
  // automatically called before anything loaded on page
  // componentDidMount() {
  //   axios.get('htto://localhost:5000/login/')
  //     .then(response => {
  //       console.log(response)
  //       // // if at least one user in database
  //       // if (response.data.length > 0) {
  //       //   this.setState({
  //       //     // returns username from cell,
  //       //     // TODO: this is prob how to get contacts list to work
  //       //     users: response.data.map(user => user.username),
  //       //     // username defaults to first user in database
  //       //     username: response.data[0].username,
  //         // })
  //       // }
  //     })
  // }

  onChangefirst_name(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangelast_name(e) {
    this.setState({
      last_name: e.target.value
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

    const{id} = this.props.location.state;
    console.log("this is the owner key = " + id);
    const contact = {
      owner: id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      email: this.state.email,
      nickname: this.state.nickname,
      birthday: this.state.birthday,
      createDate: this.state.date
    };
    console.log(contact);

    // adds contact to database
    axios.post('/api/contacts/add', contact)
      .then(res => console.log(res.data));



    // goes back to contact list
    window.location = '/dashboard';
  }

  // deleteContact(id) {
  //   axios.delete('/api/contacts/'+id)
  //     .then(res => console.log(res.data));
  //   // this.setState({
  //   //   // returns all the id's that don't match the deleted id
  //   //   contacts: this.state.contacts.filter(el => el._id !== id)
  //   // })
  // }


  render() {

    return (
      // Form formatting
      <div style={{display: "flex", color:"white"}}>
        <div style={{margin: "auto", width: 400}}>
        <h3>Create New Contact</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
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
            </div> */}
            <div className="form-group">
              <label>First Name: </label>
              <input  type="text" 
                  required
                  className="form-control"
                  value={this.state.first_name}
                  onChange={this.onChangefirst_name}
                  />
            </div>
            <div className="form-group">
              <label>Last Name: </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.last_name}
                  onChange={this.onChangelast_name}
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
                  type="date"
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
            <input type="submit" value="Create Contact" className="btn btn-primary" />

          </div>
        </form>
        {/* <a href="#" onClick={() => { this.deleteContact(this.contact._id) }}>Delete</a>  */}
      </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   const userData = state.sessionReducer.userData;
// console.log((state));

//   return { userData };
// }
