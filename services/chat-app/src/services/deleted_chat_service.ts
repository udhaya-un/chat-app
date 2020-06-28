import { Request, NextFunction } from 'express';
import { DeletedChatDao } from '../daos/deleted_chat_dao';

let deletedChatDao = new DeletedChatDao()
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';

export class DeletedChatService {

    public save(req: Request, callback: CallableFunction) {
        const deletedChatData = req.body;
        deletedChatDao.save(deletedChatData, (deletedChat) => {
            callback(deletedChat)
        })


    }

    public update_by_id(req: Request, callback: CallableFunction) {
        const deletedChatId = req.body._id;
        const deletedChatData = req.body;
        deletedChatDao.update_by_id(deletedChatId, deletedChatData, (deletedChat) => {
            callback(deletedChat)
        })
    }


    public get_all(req: Request, callback: CallableFunction) {
        deletedChatDao.get_all((deletedChat) => {
            callback(deletedChat)
        })
    }
    
    public get_all_by_owner(req: Request, callback: CallableFunction) {
        deletedChatDao.get_all_by_owner(req.params.sender_id, (deletedChat) => {
            callback(deletedChat)
        })
    }

    public get_by_id(req: Request, callback: CallableFunction) {
        const deletedChatId = req.query.deletedChatId;
        deletedChatDao.get_by_id(deletedChatId, (deletedChat) => {
            callback(deletedChat)
        })
    }

    public delete_by_id(req: Request, callback: CallableFunction) {
        const deletedChatId = req.query.deletedChatId;
        deletedChatDao.delete_by_id(deletedChatId, (deletedChat) => {
            callback(deletedChat)
        })
    }

}