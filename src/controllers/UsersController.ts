import { User } from "../models/User";
import { Request, Response } from 'express'; 
import { Product } from "../models/Product";
import { validationResult } from 'express-validator';

export default {

    // Cria novo usuário com os atributos no body
    /**
     * Creates an user and gives the option of uploading a photo 
     * 
     * @param req 
     * @param res 
     */

    async create(req: Request, res: Response) {

        try {
            validationResult(req).throw();  // Verifica se a validação foi bem sucedida e retorna um erro caso contrário

            const requestImage = await req.file as Express.Multer.File;
            req.body.photo = 'http://localhost:5000/uploads/' + requestImage.filename;
            const user = await User.create(req.body);   // Cria usuário novo
            
            res.status(201).json({"user": user}).send();    //Retorna usuário criado
           
            } catch (err) {
                res.status(400).json({"error": err}).send();    // Retorna um erro
            }
    },

    // Faz uma oferta do usuário logado em um produto
    /**
     * It does an offer in auction 
     * 
     * @param req 
     * @param res 
     */

    async makeOffer(req: Request, res: Response) {
        try {
            validationResult(req).throw();  // Verifica se a validação foi bem sucedida e retorna um erro caso contrário

            const user = await User.findByPk(req.body.id);  // Encontra o usuário pelo id
            if (user === null) throw new Error;
            
            const product = await Product.findByPk(req.params["product_id"]);  // Encontra o produto pelo id
            if (product === null) throw new Error;

            const offer = await user.$add('offers', product, {  // Cria a oferta
                through: {value: req.body["value"]}
            });

            product.update({"value": req.body["value"]});   // Retorna a oferta criada

            res.status(200).json({"Offer": offer}).send();    // Retorna um erro
        } catch (err) {
            res.status(400).json({"error": err}).send();    // Retorna um erro
        }

    },

    // Retorna perfil do usuário logado, ou o de qualquer usuário caso o usuário logado seja um admin

    /**
     * Get users by their respective ID
     * 
     * @param req 
     * @param res 
     */

    async get(req: Request, res: Response) {
        try {
            const user = req.params["id"]?   // Encontra o usuário pelo id
            await User.findByPk(req.params["id"]):
            await User.findByPk(req.body.id);

            if (user === null) throw new Error;

            const address = await user.$get('address')   // Encontra o enderaço do usuário encontrado
            res.status(200).json({"user": user, "address": address}).send();   // Retorna o usuário com o seu endereço
        } catch (err) {
            res.status(400).json({"error": "User not found"}).send();    // Retorna um erro
        }

    },

    // Retorna os produtos do usuário logado, ou os de qualquer usuário caso o usuário logado seja um admin
    /**
     * Get products of an respective user
     * 
     * @param req 
     * @param res 
     */

    async getProducts(req: Request, res: Response) {
        try {
            const user = req.params["id"]?   // Encontra o usuário pelo id
            await User.findByPk(req.params["id"]):
            await User.findByPk(req.body.id);

            if (user === null) throw new Error;

            const products = await user.$get('products')   // Encontra os produtos do usuário encontrado

            res.status(200).json({"products": products}).send();   // Retorna os produtos encontrados
        } catch (err) {
            res.status(400).json({"error": "User not found"}).send();    // Retorna um erro
        }
    },

    // Retorna as ofertas do usuário logado, ou as de qualquer usuário caso o usuário logado seja um admin
    /**
     * Get offers from a respective user
     * 
     * @param req 
     * @param res 
     */

    async getOffers(req: Request, res: Response) {
        try {
            const user = req.params["id"]?    // Encontra o usuário pelo id
            await User.findByPk(req.params["id"]):
            await User.findByPk(req.body.id);

            if (user === null) throw new Error;

            const offers = await user.$get('offers')   // Encontra as ofertas do usuário encontrado

            res.status(200).json({"offers": offers}).send();   // Retorna as ofertas encontradas
        } catch (err) {
            res.status(400).json({"error": "User not found"}).send();    // Retorna um erro
        }

    },

    // Lista todos os usuários do bd (acessível apenas para admin)
    /**
     * Show all users from the server
     * 
     * @param req 
     * @param res 
     */

    async list(req: Request, res: Response) {
        try {
            const users = await User.findAll();   // Lista os usuários do bd

            res.status(200).json({"users": users}).send();   // Retorna os usuários encontrados

        } catch(err) {
            res.status(404).json({"users": "Users not found"}).send();    // Retorna um erro
        }
    },

    // Atualiza o perfil do usuário logado, ou o de qualquer usuário caso o usuário logado seja um admin
    /**
     * Updates user data
     *  
     * @param req 
     * @param res 
     */

    async update(req: Request, res: Response) {
        try {
            validationResult(req).throw();  // Verifica se a validação foi bem sucedida e retorna um erro caso contrário
            
            const user = req.params["id"]?     // Encontra o usuário pelo id
            await User.findByPk(req.params["id"]):
            await User.findByPk(req.body.id);

            if (user === null) throw new Error;

            user.update(req.body);
            res.status(200).json({"user": user}).send();   // Retorna o usuário atualizado

        } catch {
            res.status(404).json({"error": "User not found"}).send();    // Retorna um erro
        }
    },

    // Deleta o perfil do usuário logado, ou o de qualquer usuário caso o usuário logado seja um admin
    /**
     * Deletes an user account
     * 
     * @param req 
     * @param res 
     */

    async delete(req: Request, res: Response) {
        try {
            const user = req.params["id"]?     // Encontra o usuário pelo id
            await User.findByPk(req.params["id"]):
            await User.findByPk(req.body.id);

            if (user === null) throw new Error;

            user.destroy();
            res.status(200).json({"user": "User has been successfully deleted"})   // Retorna o usuário deletado
        } catch (err) {
            res.status(404).json({"error": "User not found"}).send();    // Retorna um erro
        }
    }
}

