import { Request, Response, NextFunction, response } from 'express';
import { DeletedChatService } from '../services/deleted_chat_service';

let deletedChatService = new DeletedChatService()

export class DeletedChatController {

    public save(req: Request, res: Response) {
        const token = req.headers['authorization']
        deletedChatService.save(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public update_by_id(req: Request, res: Response) {
        deletedChatService.update_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_all(req: Request, res: Response) {
        deletedChatService.get_all(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_all_by_owner(req: Request, res: Response) {
        deletedChatService.get_all_by_owner(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_by_id(req: Request, res: Response) {
        deletedChatService.get_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


    public delete_by_id(req: Request, res: Response) {
        deletedChatService.delete_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

}