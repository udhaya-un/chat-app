import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  auth_pass: {type: String, required: true},
  xid: {type: String, required: true}
},{
  timestamps: true
});

const UserModel = mongoose.model('users', UserSchema, 'users');

export default UserModel;
