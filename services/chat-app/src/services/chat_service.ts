import { Request, NextFunction } from 'express';
import { ChatDao } from '../daos/chat_dao';
import { DeletedChatDao } from '../daos/deleted_chat_dao';
import ChatBackUpModel from '../models/backup_chat';

let chatDao = new ChatDao()
let deletedChatDao = new DeletedChatDao()
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';

export class ChatService {

    public save(req: Request, callback: CallableFunction) {
        const chatData = req.body;
        chatDao.save(chatData, (chat) => {
            callback(chat)
        })


    }

    public update_by_id(req: Request, callback: CallableFunction) {
        const chatId = req.body._id;
        const chatData = req.body;
        chatDao.update_by_id(chatId, chatData, (chat) => {
            callback(chat)
        })
    }

    public read_chat(req: Request, callback: CallableFunction) {
        const receiver_id = req.params.receiver_id;
        const sender_id = req.params.sender_id;
        const chatData = req.body;
        chatDao.read_chat(sender_id, receiver_id, chatData, (chat) => {
            callback(chat)
        })
    }

    public get_all(req: Request, callback: CallableFunction) {
        chatDao.get_all((chat) => {
            callback(chat)
        })
    }

    public get_by_id(req: Request, callback: CallableFunction) {
        const chatId = req.query.chatId;
        chatDao.get_by_id(chatId, (chat) => {
            callback(chat)
        })
    }

    public delete_by_id(req: Request, callback: CallableFunction) {
        const chatId = req.query.chatId;
        chatDao.delete_by_id(chatId, (chat) => {
            callback(chat)
        })
    }

    public get_sender_and_receiver_chat(req: Request, callback: CallableFunction) {
        let sender = req.params.sender_id
        let receiver = req.params.receiver_id
        chatDao.get_by_sender_receiver_id(sender, receiver, (chat) => {
            callback(chat)
        })
    }

    public backup_chat(req: Request, callback: CallableFunction) {
        let sender = req.params.sender_id
        chatDao.get_by_sender_id(sender, async (chats) => {
            if (chats) {

                let all_chat = []
                await chats.map(chat => {
                    delete chat._id
                    delete chat.__v
                    all_chat.push(chat)
                    if (all_chat.length === chats.length) {
                        let backup_chat = { 'user_id': sender, 'chat_backup': all_chat }
                        let chat = new ChatBackUpModel(backup_chat);
                        chat.save((err, chat) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(chat);
                            }
                        });
                    }
                })
            }
        })
    }

    public delete_chat_by_sender(req: Request, callback: CallableFunction) {
        let sender = req.params.sender_id
        let receiver = req.params.receiver_id
        let updatedchats = []
        chatDao.get_by_sender_receiver_id(sender, receiver, (chats) => {
            if (chats.length === 0) {
                callback(chats)
            } else {
                return new Promise((resolve, reject) => {
                    chats.map((msg) => {
                        let deletedMsg = {}
                        deletedMsg['owner_id'] = sender
                        deletedMsg['message_id'] = msg._id
                        deletedChatDao.get_by_owner_msg(deletedMsg, (msgExist) => {
                            if (!msgExist) {
                                deletedChatDao.save(deletedMsg, (updatedChat) => {
                                    updatedchats.push(updatedChat)
                                    if (updatedchats.length === chats.length) {
                                        callback({ message: "deleted all chats", updatedchats: updatedchats })
                                    }
                                })
                            }
                        })
                    })
                    return resolve()
                }).then(res => {
                    callback()
                })

            }
        })
    }

    get_read_msg_by_sender(req: Request, callback: CallableFunction){
        let sender = req.params.sender_id
        chatDao.get_by_sender_id(sender, (chats) => {
            callback(chats)
        })

    }
}