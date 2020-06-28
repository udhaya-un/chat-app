import { Request, Response, NextFunction, response } from 'express';
import { ChatService } from '../services/chat_service';
import { UserService } from '../services/user_service';

let chatService = new ChatService()

export class ChatController {

    public userService: UserService = new UserService()

    public save(req: Request, res: Response) {
        const token = req.headers['authorization']
        chatService.save(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public update_by_id(req: Request, res: Response) {
        chatService.update_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_all(req: Request, res: Response) {
        chatService.get_all(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_by_id(req: Request, res: Response) {
        chatService.get_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


    public delete_by_id(req: Request, res: Response) {
        chatService.delete_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_sender_and_receiver_chat(req: Request, res: Response) {
        chatService.get_sender_and_receiver_chat(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    // public verify_user(token, callback: CallableFunction) {
    //     var decoded = jwt.verify(token, accessTokenSecret, function(err, decoded) {
    //         // err
    //         if (err){
    //             callback(err)
    //         } else {
    //             callback(decoded)
    //         }
    //       });
    // }

}