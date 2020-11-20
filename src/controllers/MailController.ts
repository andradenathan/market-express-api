import Mail from '../services/Mail';
import { Request, Response } from 'express';

export default {
    mail(req: Request, res: Response) {
        const message = Object.assign({}, req.body);
        Mail.to = message.to;
        Mail.subject = message.subject;
        Mail.message = message.message;
        Mail.sendMail();
        try {
            res.status(200).json({'success': "Email successfully sent"});
        } catch (err) {
            res.status(404).json({'error': err});
        }
    }
}