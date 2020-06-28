import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let ChatSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  receiver_id: {type: String, required: true},
  sender_id: {type: String, required: true},
  message: {type: String, required: true},
  read: {type: Boolean, default: false}
},{
  timestamps: true
});

const ChatModel = mongoose.model('chats', ChatSchema, 'chats');

export default ChatModel;
