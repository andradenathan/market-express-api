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

        try {
            const authorized = await user.comparePassword(password);
            if(!(authorized === true)) {
                return res.status(401).json({error: 'Wrong password'})
            }
        } catch (err) {
            return res.status(500).json({'error': err.message()});
        }


        const id = user.id;
        const name = user.name;

        return res.status(201).json({
            success: "You are successfully connected, " + name,
            token: jwt.sign({id}, '6508918172', {expiresIn: '7d'})
        })
    }
}