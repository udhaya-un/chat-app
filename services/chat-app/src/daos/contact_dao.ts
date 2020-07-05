import * as mongoose from 'mongoose';
import ContactModel from '../models/contact';
export class ContactDao {

    private Contact = ContactModel;


    public save(contactData, callback: CallableFunction) {

        let contact = new this.Contact(contactData);
        contact.save((err, contact) => {
            if (err) {
                callback(err);
            } else {
                callback(contact);
            }
        });

    }

    public update_by_id(contactId, contactData, callback: CallableFunction) {
        this.Contact.findOneAndUpdate({ _id: contactId }, contactData, { new: true }, (err, contact) => {
            if (err) {
                callback(err);
            } else {
                callback(contact);
            }
        });
    }

    public read_contact_by_owner(owner_id, callback: CallableFunction) {

        this.Contact.
            find({ owner_id: owner_id }).
            populate('contact_id').
            exec((err, contacts) => {
                if (err) {
                    callback(err)
                } else {
                    callback(contacts)
                }
            });

    }

    public get_all(callback: CallableFunction) {
        this.Contact.find((err, contact) => {
            if (err) {
                callback(err)
            } else {
                callback(contact)
            }
        });
    }

    public get_by_id(id, callback: CallableFunction) {
        this.Contact.findById(id, (err, contact) => {
            if (err) {
                callback(err)
            } else {
                callback(contact)
            }
        });
    }


    public delete_by_id(id, callback: CallableFunction) {
        this.Contact.findByIdAndDelete(id, (err, chat) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: `Successfully deleted contact! ${chat.id}` });
            }
        });
    }

    public verify_contact(owner_id, contact_id, callback: CallableFunction) {
        this.Contact.findOne({
            $and: [
                { owner_id: owner_id },
                { contact_id: contact_id }
            ]
        }, (err, chat) => {
            if (err) {
                callback(err);
            } else {
                callback(chat);
            }
        });

    }

}