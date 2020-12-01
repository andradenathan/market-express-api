import multer from 'multer';
import path from 'path';
import { Request } from 'express';

export default {
    /**
     * Configurações do storage:
     * Na função join o __dirname serve para referir-se que estamos trabalhando com a pasta uploads dentro desse projeto.
     * A lógica aqui para filtrar que a imagem foi enviada com sucesso é fazer com que o usuário envie uma imagem
     * e a mesma será cadastrada com o tempo que ele enviou + o nome do arquivo. 
     */
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request: Request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            callback(null, fileName);
        },
    })
};