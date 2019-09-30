import React, { Component } from 'react';
import axios from 'axios';



export default class EditContact extends Component {

    constructor(props) {
        super(props);

        this.onChangefirst_name = this.onChangefirst_name.bind(this);
        this.onChangelast_name = this.onChangelast_name.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangenickname = this.onChangenickname.bind(this);
        this.onChangebirthday = this.onChangebirthday.bind(this);
        this.deleteContact = this.deleteContact.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        // const { user } = this.props.auth;

        this.state = {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          nickname: '',
          birthday: ''
        }
    }

    componentDidMount() {
        axios.get('/api/contacts/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                  first_name: response.data.first_name,
                  last_name: response.data.last_name,
                  phone: response.data.phone,
                  email: response.data.email,
                  nickname: response.data.nickname,
                  birthday: response.data.birthday
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    deleteContact(id) {

      if(confirm("Are you sure you want to delete this contact?"))
      {
        axios.delete('/api/contacts/'+this.props.match.params.id)
        .then(res => console.log(res.data));
        // this.setState({
          // returns all the id's that don't match the deleted id
          // contacts: this.state.contacts.filter(el => el._id !== id)
        // })
      window.location = '/dashboard';
      }
    }

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

    onSubmit(e) {
        e.preventDefault();
        const contact = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            email: this.state.email,
            nickname: this.state.nickname,
            birthday: this.state.birthday
        };
        console.log(contact);
        axios.post('/api/contacts/update/'+this.props.match.params.id, contact)
            .then(res => console.log(res.data));

        // this.props.history.push('/dashboard');
        window.location = '/dashboard';

    }

  render() {
    return (
      // Form formatting

      <div style={{display: "flex", color:"white"}}>
      <div style={{margin: "auto", width: 400}}>
      {/* <div><a href="/dashboard" className="material-icons">code</i></div> */}

        <h3>Edit Contact</h3>
        <a href="#" onClick={() => { this.deleteContact(this.props.match.params.id) }} class="btn pink darken-2">Delete</a>
        <form onSubmit={this.onSubmit}>
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
          {/* <div className="form-group">
            <input type="submit" value="Edit Contact" className="btn btn-primary" />
          </div> */}
          <button class="btn waves-effect waves-light" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>

        </form>
      </div>
      </div>
    )
  }
}
