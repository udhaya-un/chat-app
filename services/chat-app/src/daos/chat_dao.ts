import * as mongoose from 'mongoose';
import ChatModel from '../models/chat';
import { Request, Response, response } from 'express';
import * as jwt from 'jsonwebtoken'
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';
export class ChatDao {

    private Chat = ChatModel;


    public save(chatData, callback: CallableFunction) {
            
                let chat = new this.Chat(chatData);
                chat.save((err, chat) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(chat);
                    }
                });

    }

    public update_by_id(chatId, chatData, callback: CallableFunction) {
        this.Chat.findOneAndUpdate({ _id: chatId }, chatData, { new: true }, (err, chat) => {
            if (err) {
                callback(err);
            } else {
                callback(chat);
            }
        });
    }


    public get_all(callback: CallableFunction) {
        this.Chat.find((err, chat) => {
            if (err) {
                callback(err)
            } else {
                callback(chat)
            }
        });
    }

    public get_by_id(chatId, callback: CallableFunction) {
        this.Chat.findById(chatId, (err, chat) => {
            if (err) {
                callback(err)
            } else {
                callback(chat)
            }
        });
    }

    public get_by_email(email, callback: CallableFunction) {
        this.Chat.find({ email: email }, (err, chat) => {
            if (err) {
                callback(err);
            } else {
                callback(chat);
            }
        });
    }

    public delete_by_id(chatId, callback: CallableFunction) {
        this.Chat.findByIdAndDelete(chatId, (err, chat) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: `Successfully deleted contact! ${chat.id}` });
            }
        });
    }
}