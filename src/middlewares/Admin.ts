import { Response, Request, NextFunction } from 'express'
import { User } from '../models/User'

// Verifica se o usuário é um admin (Esta middleware deve ser chamada somente após a Auth)
export default async function(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findByPk(req.body.id); // Encontra o usuário logado pelo id
        if (user?.is_admin) next(); // Segue a execução caso o usuário seja admin
        else return res.status(401).json({'error': 'Unauthorized'});
    } catch (err) {
        return res.status(500).json({'error': 'Internal server error'});
    }
}