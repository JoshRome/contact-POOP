const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    owner:
    {
      type: String,
      required: true
    },
    first_name:
    {
        type: String,
        required: true,
        trim: true,
    },
    last_name:
    {
        type: String,
        trim: true,
    },
    // require phone or email, not both
    phone:
    {
        type: Number,
        // required: true,
        // trim: true,
        // min : 100000000,
        max : 9999999999
        // write restrictions: for extensions
    },
    email:
    {
        type: String,
        trim: true,
         // write restrictions: for extensions
    },
    address:
    {
        // write restrictions: for address.
    },
    nickname:
    {
      type: String,
      trim: true
         // write restrictions:
    },
    birthday:
    {
      type: Date
      // write restrictions:
    }

    // Creation date!!
    createDate: {
      type: Date,
      default: Date.now
    }

});
const contact = mongoose.model('contact', contactSchema);
module.exports = contact;
