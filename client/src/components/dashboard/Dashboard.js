import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Contacts = props => (
  <tr>
    {/* <td>{props.contact.username}</td> */}
    <td>{props.contacts.first_name}</td>
    <td>{props.contacts.last_name}</td>
    <td>{props.contacts.phone}</td>
    <td>{props.contacts.email}</td>
    <td>{props.contacts.nickname}</td>
    <td>{props.contacts.birthday}</td>
    <td>{props.contacts.createDate.substring(0,10)}</td>
    <td>
      {/* TODO: make button instead of link */}
      {/* {/* <Link to={"/edit/"+props.contact._id}>edit</Link> |  */}
    <a href="#" onClick={() => { props.deleteContact(props.contact._id) }}>Delete</a> | 
      <Link to={"edit/"+props.contacts._id}> Edit</Link>
    </td>
  </tr>
)

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();

  };

    constructor(props) {
    super(props);

    this.deleteContact = this.deleteContact.bind(this);
    this.state = {contacts: []};
    // const email = this.state.owner;

  }

  // state = {contacts: []}

  componentDidMount() {
    const {email} = this.props.auth;
    const {user} = this.props.auth;
    // const email = 'help@help.zzz';
    // console.log(user);
        axios.post('/api/contacts/dashboard/', email)
          .then(response => {
            // captures all data, FIXME: dont list empty fields?
            this.setState({ contacts: response.data });
          })
          .catch((error) => {
            console.log(error);
          })
      }

      // axios.post('http://localhost:5000/', user)
      // .then(res => console.log(res.data));

      deleteContact(id) {
        axios.delete('/api/contacts/'+id)
          .then(res => console.log(res.data));
        this.setState({
          // returns all the id's that don't match the deleted id
          contacts: this.state.contacts.filter(el => el._id !== id)
        })
      }

      // contactList() {
      //   return this.state.contacts.map(currentcontact => {
      //     return <Contacts contacts={currentContact} key={i} />;

      //     // return <Contact contact={currentcontact} deleteContact={this.deleteContact} key={currentcontact._id}/>;
      //   })
      // }

      ContactList() {
        return this.state.contacts.map(function(currentContact, i){
            return <Contacts contacts={currentContact} key={i} />;
        })
    }



render() {
    const { user } = this.props.auth;
    // console.log(user);
return (
      <div>
        {/* <div className="row">
          <div className="col s1 center-align">

          </div>
        </div> */}

        <div className="column middle">
        <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into your{" "}
                <span style={{ fontFamily: "monospace" }}>Contact Manager</span> app 👏
              </p>
            </h4>
            <div style={{display: "flex", color:"white"}}>
            <div style={{margin: "auto", width: 600}}>
              <input
                value={this.state.value}
                onChange={e => this.onChangeHandler(e)}
                placeholder="search contacts"
              />
              {this.renderContacts}
            </div>
            </div>
            <div class="row">
            <div className="col s3 center-align">

<a href="/create" class="waves-effect waves-light btn">create</a></div>
<div className="col s3 center-align">

<a  onClick={this.onLogoutClick} class="waves-effect waves-light btn">logout</a></div>

{/* <div class="search-container">
    <form action="/action_page.php">
      <input type="text" placeholder="Search.." name="search">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form> */}
  {/* </div> */}
</div>

{/* 
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button> */}
  </div>
      {/* formatting stuff: testing card layout, look at if time */}
        {/* <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="sample-1.jpeg"/>
          <span class="card-title"></span>
          <a href="/create" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">create</i></a>
        </div>
        <div class="card-content">
        <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into your{" "}
                <span style={{ fontFamily: "monospace" }}>Contact Manager</span> app 👏
              </p>
            </h4>
        </div>
      </div>
    </div>
  </div> */}
  <div style={{display: "flex", color:"white"}}>
<div style={{margin: "auto", width: 800}}>
      <div className="column middle">
        <table className="highlight">
        <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Nickname</th>
              <th>Birthday</th>
              <th>Date Created</th>
          </tr>
        </thead>

        <tbody>
        {/* table should generate here, but contacts not added to db so can't test */}
         { this.ContactList() }
        </tbody>
      </table>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
