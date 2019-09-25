import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/navbar"
import Landing from "./components/layout/landing"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import contactList from "./components/contact-list";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/list" component={contactList} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          {/* <Landing /> */}
        </div>
        </Router>
      </Provider>

    );
  }
}

// import Welcome from "./components/login";
// import ContactList from "./components/contact-list";
// import EditContact from "./components/edit-contact";
// import CreateContact from "./components/create-contact";
// import CreateUser from "./components/create-user";



// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Navbar />
//         <br/>
//         <Route path="/" exact component={Welcome} />
//         <Route path="/list" exact component={ContactList} />
//         <Route path="/edit/:id" component={EditContact} />
//         <Route path="/create" component={CreateContact} />
//         <Route path="/user" component={CreateUser} />
//       </div>
//     </Router>
//   );
// }

export default App;
