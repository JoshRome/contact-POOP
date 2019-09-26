import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Contact = props => (
  <tr>
    <td>{props.contact.username}</td>
    <td>{props.contact.firstName}</td>
    <td>{props.contact.lastName}</td>
    <td>{props.contact.phone}</td>
    <td>{props.contact.email}</td>
    <td>{props.contact.nickname}</td>
    <td>{props.contact.birthday}</td>
    <td>{props.contact.date.substring(0,10)}</td>
    <td>
      {/* TODO: make button instead of link */}
      <Link to={"/edit/"+props.contact._id}>edit</Link> | <a href="#" onClick={() => { props.deleteContact(props.contact._id) }}>delete</a>
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
  }

  // state = {contacts: []}

  componentDidMount() {
        axios.get('http://localhost:5000/contacts')
          .then(response => {
            // captures all data, FIXME: dont list empty fields?
            this.setState({ contact: response.data });
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      deleteContact(id) {
        axios.delete('http://localhost:5000/contacts/'+id)
          .then(res => console.log(res.data));
        this.setState({
          // returns all the id's that don't match the deleted id
          contacts: this.state.contacts.filter(el => el._id !== id)
        })
      }
    
      contactList() {
        return this.state.contacts.map(currentcontact => {
          return <Contact contact={currentcontact} deleteContact={this.deleteContact} key={currentcontact._id}/>;
        })
      }
        

render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "25vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s6 pull-s7 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into your{" "}
                <span style={{ fontFamily: "monospace" }}>Contact Manager</span> app 👏
              </p>
            </h4>
            <div>
              <a href="/create" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">create</i></a>
            </div>
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
            </button>
          </div>
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

            

        <div className="col s6 push-s5  center-align">
        <table class="responsive-table">
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
         { this.contactList() }
        </tbody>
      </table>
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