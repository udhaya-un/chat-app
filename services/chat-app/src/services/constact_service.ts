import { Request, NextFunction } from 'express';
import { ContactDao } from '../daos/contact_dao';

let contactDao = new ContactDao()
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';

export class ContactService {

    public save(req: Request, callback: CallableFunction) {
        const contactData = req.body;
        this.verify_contact(req.body.owner_id, req.body.contact_id, (contact) => {
            if (contact) {
                callback({ message: "already contact added!" })
            } else {
                contactDao.save(contactData, (contact) => {
                    callback(contact)
                })
            }
        })



    }

    public update_by_id(req: Request, callback: CallableFunction) {
        const contactId = req.body._id;
        const contactData = req.body;
        contactDao.update_by_id(contactId, contactData, (contact) => {
            callback(contact)
        })
    }

    public read_contact_by_owner(req: Request, callback: CallableFunction) {
        let owner_id = req.params.owner_id
        contactDao.read_contact_by_owner(owner_id, (contact) => {
            callback(contact)
        })
    }

    public get_all(req: Request, callback: CallableFunction) {
        contactDao.get_all((contact) => {
            callback(contact)
        })
    }

    public get_by_id(req: Request, callback: CallableFunction) {
        const contactId = req.query.contactId;
        contactDao.get_by_id(contactId, (contact) => {
            callback(contact)
        })
    }

    public delete_by_id(req: Request, callback: CallableFunction) {
        const contactId = req.query.contactId;
        contactDao.delete_by_id(contactId, (contact) => {
            callback(contact)
        })
    }

    public verify_contact(owner_id, contact_id, callback: CallableFunction) {
        contactDao.verify_contact(owner_id, contact_id, (contact) => {
            callback(contact)
        })
    }

}