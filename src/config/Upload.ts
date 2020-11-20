import multer from 'multer';
import path from 'path';
import { Request } from 'express';

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request: Request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            callback(null, fileName);
        },
    })
};