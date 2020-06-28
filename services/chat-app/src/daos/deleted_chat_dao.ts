import * as mongoose from 'mongoose';
import DeletedChatModel from '../models/deleted_chat';
import { Request, Response, response } from 'express';
import * as jwt from 'jsonwebtoken'
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';
export class DeletedChatDao {

    private DeletedChat = DeletedChatModel;


    public save(deletedchatData, callback: CallableFunction) {

        let deletedchat = new this.DeletedChat(deletedchatData);
        deletedchat.save((err, deletedchat) => {
            if (err) {
                callback(err);
            } else {
                callback(deletedchat);
            }
        });

    }

    public update_by_id(deletedchatId, deletedchatData, callback: CallableFunction) {
        this.DeletedChat.findOneAndUpdate({ _id: deletedchatId }, deletedchatData, { new: true }, (err, deletedchat) => {
            if (err) {
                callback(err);
            } else {
                callback(deletedchat);
            }
        });
    }


    public get_all(callback: CallableFunction) {
        this.DeletedChat.find((err, deletedchat) => {
            if (err) {
                callback(err)
            } else {
                callback(deletedchat)
            }
        });
    }

    public get_all_by_owner(sender, callback: CallableFunction) {
        this.DeletedChat.find({owner_id: sender},(err, deletedchat) => {
            if (err) {
                callback(err)
            } else if(deletedchat.length===0){
                callback(deletedchat)
            }else {
                let msgs=[]
                let deletedmsgs = {}
                deletedchat.map(data=>{
                    msgs.push(data.message_id)
                    if(deletedchat.length === msgs.length){
                        deletedmsgs['messages'] = msgs
                        deletedmsgs['sender_id'] = data.owner_id
                        callback(deletedmsgs)
                    }
                })
            }
        });
    }

    public get_by_id(deletedchatId, callback: CallableFunction) {
        this.DeletedChat.findById(deletedchatId, (err, deletedchat) => {
            if (err) {
                callback(err)
            } else {
                callback(deletedchat)
            }
        });
    }

    public delete_by_id(deletedchatId, callback: CallableFunction) {
        this.DeletedChat.findByIdAndDelete(deletedchatId, (err, deletedchat) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: `Successfully deleted contact! ${deletedchat.id}` });
            }
        });
    }

    get_by_owner_msg(deleteMsg, callback: CallableFunction){
        this.DeletedChat.findOne({
            $and: [
                {owner_id: deleteMsg.owner_id },
                { message_id: deleteMsg.message_id }
            ]
        }, (err, response) => {
            if (err) {
                callback(err);
            }
            if (response === null || response.length === 0) {
                callback(response);
            } else {
                callback(response);
            }
        })

    }

}