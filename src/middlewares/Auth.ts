import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import authConfig from '../config/AuthConfig';

/**
 * Authentication function that will verify if user is really logged in the system
 * @param req 
 * @param res 
 * @param next 
 */

export default function(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error: "Token doesn't exist"});
    }

    const [, token] = authHeader.split(' '); 
    try {
        const decoded = jwt.verify(token, authConfig.secret);
        req.body.id = (<any>decoded).id;
        return next();
    } catch {
        return res.status(401).json({error: "Invalid token"});
    }
}

