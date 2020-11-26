import { Product } from "../models/Product"
import {Request, Response} from "express"
import { User } from "../models/User";
import { body, validationResult } from "express-validator";

export default {
    
    // Cria produto com os atributos no body
    async create(req: Request, res: Response) {
        try {
            validationResult(req).throw();  // Verifica se a validação foi bem sucedida e retorna um erro caso contrário

            req.body.ownerId = req.body.id; // Recebe o id do usuário logado
            req.body.id = null;
            const product = await Product.create(req.body);
            return res.status(201).json({"product": product});  // Retorna o produto criado

        } catch (err) {
            res.status(500).json({"error": "Internal server error"}).send();    // Retorna um erro
        }

    },

    // Encontra um produto com o id igual ao fornecido na rota
    async get(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);   // Encontra prduto pelo id
            if (product === null) throw new Error;
            res.status(200).json({"product": product}).send();  // Retorna produto encontrado

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send(); // Retorna um erro
        }

    },

    // Retorna o dono do prduto do id fornecido
    async getOwner(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);   // Encontra prduto pelo id
            if (product === null) throw new Error;

            const owner = await product.$get('owner');  // Encontra dono do produto encontrado

            res.status(200).json({"owner": owner}).send();  // Retorna dono

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send(); // Retorna um erro
        }

    },

    // Retorna as ofertas do produto
    async getOffers(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);   // Encontra prduto pelo id
            if (product === null) throw new Error;

            const offers = await product.$get('offers');  // Encontra as ofertas do produto encontrado

            res.status(200).json({"offers": offers}).send();    // Retorna as ofertas

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();    // Retorna um erro
        }

    },

    // lista todos os produtos no bd (acessível apenas para admins)
    async list(req: Request, res: Response) {
        try {
            const products = await Product.findAll(); // Lê os produtos no bd
            res.status(200).json({"products": products}).send();    // Retorna os produtos

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();    // Retorna um erro
        }

    },

    // Atualiza o produto, caso este pertença ao usuário logado
    async update(req: Request, res: Response) {
        try {
            validationResult(req).throw();  // Verifica se a validação foi bem sucedida e retorna um erro caso contrário

            const product = await Product.findByPk(req.params["id"]);   // Encontra prduto pelo id
            if (product === null) throw new Error;
            
            if (product.ownerId !== req.body.id)    // Retorna um erro caso o produto não pertença ao usuário logado
                return res.status(401).json({"error": "Unauthorized"})

            product.update(req.body);
            res.status(200).json({"product": product}).send();    // Retorna o produto atualizado

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();    // Retorna um erro
        }

    },

    // Define o dono de um produto (Inutilizada)
    async setOwner(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["product_id"]);  // Encontra prduto pelo id
            if (product === null) throw new Error;
            const user = await User.findByPk(req.params["user_id"]);  // Encontra usuário pelo id
            if (user === null) throw new Error;

            product.$set('owner', user);  // Define dono do produto

            product.save();
            res.status(200).json({"product": product}).send();    // Retorna o produto atualizado

        } catch (err) {
            res.status(400).json({"error": err}).send();    // Retorna um erro
        }

    },

    // Deleta um produto, caso este pertença ao usuário logado
    async delete(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);   // Encontra prduto pelo id
            if (product === null) throw new Error;

            if (product.ownerId !== req.body.id)    // Retorna um erro caso o produto não pertença ao usuário logado
                return res.status(401).json({"error": "Unauthorized"})
            
            product.destroy();  // Apaga o produto
            res.status(200).json({"product": product}).send();   // Retorna o produto deletado

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();    // Retorna um erro
        }

    },
}