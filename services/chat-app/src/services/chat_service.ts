import { Request, NextFunction } from 'express';
import { ChatDao } from '../daos/chat_dao';
import { UserDao } from '../daos/user_dao';

let chatDao = new ChatDao()
let userDao = new UserDao()
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

    get_sender_and_receiver_chat(req: Request, callback: CallableFunction) {
        let sender = req.params.sender_id
        let receiver = req.params.receiver_id
        chatDao.get_by_sender_receiver_id(sender, receiver, (chat) => {
            callback(chat)
        })
    }

}