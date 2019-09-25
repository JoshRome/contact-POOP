const router = require('express').Router();
let contact = require('../../models/contact.model');

router.route('/list').get((req, res) => {
  contact.find({owner: req.body.owner})
	// returns contacts in database for users
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});


// creates new contact
router.route('/add').post((req, res) => {
  // FIXME: do we need uname?? or just foreign key?
  const owner = req.body.owner;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone = Number(req.body.phone) || null;
  const email = req.body.email;
  const nickname = req.body.nickname;
  const birthday = Date.parse(req.body.birthday) || null;
  // TODO: const creationDate

  // throws error if email and phone fields both empty
  var assert = require('assert');
  assert(!(email == phone), "must have at least email or phone number");

  const newContact = new contact({
    owner,
    first_name,
    last_name,
    phone,
    email,
    nickname,
    birthday
    // creationDate
  });

  //FIXME: dont show if null
  // BUGFIXING PRINT STATEMENTS
  // console.log(JSON.stringify(phone));
  // console.log(JSON.stringify(email));
  // console.log(JSON.stringify(email == phone));

  newContact.save()
  .then(() => res.json('Contact added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// finds contact by parameter (get request)
// localhost/contacts/<id #> returns single contact
router.route('/:id').get((req, res) => {
  contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

// deletes contact
router.route('/:id').delete((req, res) => {
  contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// updates contact
router.route('/update/:id').post((req, res) => {
  contact.findById(req.params.id)
    .then(contact => {
      contact.username = req.body.username;
      contact.first_name = req.body.first_name;
      contact.last_name = req.body.last_name;
      //TODO: assert here?? maybe??
      contact.phone = Number(req.body.phone) || null;
      contact.email = req.body.email;
      contact.nickname = req.body.nickname;
      contact.birthday = Date.parse(req.body.date) || null;

      contact.save()
        .then(() => res.json('Contact updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;