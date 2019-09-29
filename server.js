const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");

// link to the database String
const uri = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const contact = require("./routes/api/contacts")

const app = express();

// const csp = require('express-csp-header');
// app.use(csp({
//   policies: {
//     'default-src': [csp.SELF],
//     'script-src': [csp.SELF, csp.INLINE, 'somehost.com'],
//     'style-src': [csp.SELF, 'mystyles.net'],
//     'img-src': ['data:', 'images.com'],
//     'worker-src': [csp.NONE],
//     'block-all-mixed-content': true
//   }
// }));
const csp = require('helmet-csp')

app.use(csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ['style.com'],
    fontSrc: ["'self'", 'fonts.com'],
    imgSrc: ['img.com', 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // This is not set.
  },

  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,

  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true
}))

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
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


