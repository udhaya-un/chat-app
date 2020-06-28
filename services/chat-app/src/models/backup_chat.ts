import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let ChatBackUpSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  user_id: {type: String, required: true},
  chat_backup: {type: Array, required: true},
},{
  timestamps: true
});

const ChatBackUpModel = mongoose.model('chatBackUps', ChatBackUpSchema, 'chatBackUps');

export default ChatBackUpModel;
