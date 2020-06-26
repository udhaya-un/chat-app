import { Request, NextFunction } from 'express';
import { UserDao } from '../daos/user_dao';
import * as jwt from 'jsonwebtoken'

let userDao = new UserDao()
const accessTokenSecret = 'DQKt1uvmkkqcJbXD66KbJQ';

export class UserService {

    public save(req: Request, callback: CallableFunction) {
        const userData = req.body;
        userDao.save(userData, (user) => {
            callback(user)
        })
    }

    public update_by_id(req: Request, callback: CallableFunction) {
        const userId = req.body._id;
        const userData = req.body;
        userDao.update_by_id(userId, userData, (user) => {
            callback(user)
        })
    }


    public get_all(req: Request, callback: CallableFunction) {
        userDao.get_all((user) => {
            callback(user)
        })
    }

    public get_by_id(req: Request, callback: CallableFunction) {
        const userId = req.query.userId;
        userDao.get_by_id(userId, (user) => {
            callback(user)
        })
    }

    public delete_by_id(req: Request, callback: CallableFunction) {
        const userId = req.query.userId;
        userDao.delete_by_id(userId, (user) => {
            callback(user)
        })
    }

    public login(req: Request, callback: CallableFunction){
       const user = req.body
       userDao.login(user, (user)=>{
        callback(user)
       })
    }

    public verify_user(token, callback: CallableFunction) {
        var decoded = jwt.verify(token, accessTokenSecret, function(err, decoded) {
            // err
            if (err){
                callback(err)
            } else {
                callback(decoded)
            }
          });
    }
}