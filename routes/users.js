const router = require('express').Router();

// requires model user created
let User = require('../models/user.model');


// handles incoming http get requests on /users url path
router.route('/ulist').get((req, res) => {
  //lists all users from mongo db atlas database
	User.find() 
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handles post requests
router.route('/add').post((req, res) => {
	// assigns to username variable
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;


  // creates new user 
  const newUser = new User({username, password, email});


  // saves user to DB
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;