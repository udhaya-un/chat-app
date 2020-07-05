import { Request, Response, NextFunction, response } from 'express';
import { ContactService } from '../services/constact_service';

let contactService = new ContactService()

export class ContactController {


    public save(req: Request, res: Response) {
        const token = req.headers['authorization']
        contactService.save(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public update_by_id(req: Request, res: Response) {
        contactService.update_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public read_contact_by_owner(req: Request, res: Response) {
        contactService.read_contact_by_owner(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_all(req: Request, res: Response) {
        contactService.get_all(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public get_by_id(req: Request, res: Response) {
        contactService.get_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


    public delete_by_id(req: Request, res: Response) {
        contactService.delete_by_id(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


}