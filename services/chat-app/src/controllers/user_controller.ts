import { Request, Response, NextFunction, response } from 'express';
import { UserService } from '../services/user_service';

let userService = new UserService()

export class UserController {

    public save(req: Request, res: Response) {
        // const token = req.headers['authorization']
        // if (token) {
        // userService.verify_user(token, (valid_user) => {
        //     if (valid_user.message === "invalid token") {
        //         res.status(401);
        //         res.json({ message: "invalid auth token" })
        //     } else {
        userService.save(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
        //         }
        //     })
        // } else {
        //     res.status(401);
        //     res.json({ message: "auth token requried" })
        // }

    }

    public update_by_id(req: Request, res: Response) {
        userService.update_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_all(req: Request, res: Response) {
        userService.get_all(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_by_id(req: Request, res: Response) {
        userService.get_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


    public delete_by_id(req: Request, res: Response) {
        userService.delete_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public login(req: Request, res: Response) {
        userService.login(req, (response) => {
            res.status(200); // status for the response
            res.json(response)
        })
    }

}