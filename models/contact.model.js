const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    owner:
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
      // required: true
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
        min : 100,
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
        street:
        {
            type: String,
            trim: true
        },
        City:
        {
          type: String,
          trim: true,
        },
        state:
        {
          type: String,
          max: 2
        },
        zipcode:
        {
          type: Number,
          max: 99999
        }
    },
    nickname:
    {
      type: String,
      trim: true
         // write restrictions:
    },
    birthday:
    {
      type: String
      // write restrictions:
    },

    // Creation date!!
    createDate: {
      type: Date,
      default: Date.now
    }

});
const contact = mongoose.model('contacts', contactSchema);
module.exports = contact;
