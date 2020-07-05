import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let ContactSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  owner_id: {type: String, required: true},
  contact_id: {type: String, required: true, ref: 'users'},
},{
  timestamps: true
});

const ContactModel = mongoose.model('contacts', ContactSchema, 'contacts');

export default ContactModel;
