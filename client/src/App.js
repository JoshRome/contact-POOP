import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/navbar"
import Landing from "./components/layout/landing"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

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
