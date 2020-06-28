import * as mongoose from 'mongoose';
import UserModel from '../models/user';
import { Request, Response, response } from 'express';
import * as jwt from 'jsonwebtoken'
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';
export class UserDao {

    private User = UserModel;


    public save(userData, callback: CallableFunction) {
        this.verify_email(userData.email, (user) => {
            if (user) {
                callback({ message: "email already exist!" })
            } else {
                let user = new this.User(userData);
                user.save((err, user) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(user);
                    }
                });

            }
        })
    }

    public update_by_id(userId, userData, callback: CallableFunction) {
        this.User.findOneAndUpdate({ _id: userId }, userData, { new: true }, (err, user) => {
            if (err) {
                callback(err);
            } else {
                callback(user);
            }
        });
    }


    public get_all(callback: CallableFunction) {
        this.User.find((err, user) => {
            if (err) {
                callback(err)
            } else {
                callback(user)
            }
        });
    }

    public get_by_id(userId, callback: CallableFunction) {
        this.User.findById(userId, (err, user) => {
            if (err) {
                callback(err)
            } else {
                callback(user)
            }
        });
    }

    public delete_by_id(userId, callback: CallableFunction) {
        this.User.findByIdAndDelete(userId, (err, user) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: `Successfully deleted contact! ${user.id}` });
            }
        });
    }

    public verify_username(username, callback: CallableFunction) {
        this.User.findOne({ username: username }, (err, user) => {
            if (err) {
                callback(err);
            } else {
                callback(user);
            }
        });
    }


    public verify_email(email, callback: CallableFunction) {
        this.User.findOne({ email: email }, (err, user) => {
            if (err) {
                callback(err);
            } else {
                callback(user);
            }
        });
    }

    public login(user, callback: CallableFunction) {
        this.User.findOne({
            $and: [
                { $or: [{ email: user.email }, { username: user.username }] },
                { auth_pass: user.auth_pass }
            ]
        }, (err, response) => {
            if (err) {
                callback(err);
            }
            if (response === null || response.length === 0) {
                response = 'Incorrect email or Password';
                callback(response);
            } else {
                const accessToken = jwt.sign({ username: user.email }, accessTokenSecret);
                let res = {
                    "message": "successfully loggedin!",
                    "authToken": accessToken,
                    "email": response.email,
                    "id": response._id
                }
                callback(res);
            }
        })
    }
}