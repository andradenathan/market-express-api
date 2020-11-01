import { User } from '../models/User';
import jwt  from 'jsonwebtoken';
import { Request, Response } from 'express';


export default {
    async login(req: Request, res: Response){
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findOne({where: {email: email}})
        if(!user) {
            return res.status(401).json({error: 'Wrong email'})
        }

        if(!user.comparePassword(password)) {
            return res.status(401).json({error: 'Wrong password'})
        }

        const id = user.id;
        const name = user.name; 

        return res.status(201).json({
            success: "You are successfully connected, " + user.name,
            token: jwt.sign({id}, '6508918172', {expiresIn: '7d'})
        })
    }
}