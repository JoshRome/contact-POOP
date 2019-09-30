const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
const path = require('path');

// link to the database String
const uri = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const contact = require("./routes/api/contacts")

const app = express();


if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
}
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: false
  })
);

app.use(bodyParser.json());

const main_router = express.Router();

let create_user = require('./models/user.model.js');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).
then(() => console.log("MongoDB has successfully connected\n")).catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//routes
app.use("/api/users", users);
app.use("/api/contacts", contact);


const port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Server is up and running on Port: " + port);
});
