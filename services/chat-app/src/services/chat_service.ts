import { Request, NextFunction } from 'express';
import { ChatDao } from '../daos/chat_dao';

let chatDao = new ChatDao()
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';

export class ChatService {

    public save(req: Request, callback: CallableFunction) {
        const chatData = req.body;
        let chatdetails = {}
        chatdetails['message'] = chatData.message
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

}