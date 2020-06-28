import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let DeletedChatSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  owner_id: {type: String, required: true},
  message_id: {type: String, required: true},
},{
  timestamps: true
});

const DeletedChatModel = mongoose.model('deletedchats', DeletedChatSchema, 'deletedchats');

export default DeletedChatModel;
