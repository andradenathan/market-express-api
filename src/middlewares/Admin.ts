import { Response, Request, NextFunction } from 'express'
import { User } from '../models/User'

export default async function(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findByPk(req.body.id);
        if (user?.is_admin) next();
        else return res.status(401).json({'error': 'Unauthorized'});
    } catch (err) {
        return res.status(500).json({'error': 'Internal server error'});
    }
}