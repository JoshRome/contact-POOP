import React, { Component } from 'react';
import axios from 'axios';

// import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

// const Contact = props => (
//   <tr>
//     <td>{props.contact.username}</td>
//     <td>{props.contact.firstName}</td>
//     <td>{props.contact.lastName}</td>
//     <td>{props.contact.phone}</td>
//     <td>{props.contact.email}</td>
//     <td>{props.contact.nickname}</td>
//     <td>{props.contact.birthday}</td>
//     <td>{props.contact.date.substring(0,10)}</td>
//     <td>
//       // TODO: make button instead of link
//       <Link to={"/edit/"+props.contact._id}>edit</Link> | <a href="#" onClick={() => { props.deleteContact(props.contact._id) }}>delete</a>
//     </td>
//   </tr>
// )

// export default class ContactList extends Component {
//   constructor(props) {
//     super(props);

//     this.deleteContact = this.deleteContact.bind(this);
//     this.state = {contacts: []};
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5000/contacts/')
//       .then(response => {
//         // captures all data, FIXME: dont list empty fields?
//         this.setState({ contact: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }

//   deleteExercise(id) {
//     axios.delete('http://localhost:5000/exercises/'+id)
//       .then(res => console.log(res.data));
//     this.setState({
//       // returns all the id's that don't match the deleted id
//       contacts: this.state.contacts.filter(el => el._id !== id)
//     })
//   }

//   contactList() {
//     return this.state.contacts.map(currentcontact => {
//       return <Contact contact={currentcontact} deleteContact={this.deleteContact} key={currentcontact._id}/>;
//     })
//   }

export default class ContactList extends Component {
  render() {
    return (
      <div>
        <p>You are on the Contact List component!</p>
      </div>
    )
  }
}




//   render() {
//     return (
//       <div>
//         <h3>Logged Exercises</h3>
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Username</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Phone Number</th>
//               <th>Email</th>
//               <th>Nickname</th>
//               <th>Birthday</th>
//               <th>Date Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             { this.contactList() }
//           </tbody>
//         </table>
//       </div>
//     )
//   }
// }