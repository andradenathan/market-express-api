import { Product } from "../models/Product"
import {Request, Response} from "express"
import { sequelize } from "../database/config";
import { User } from "../models/User";
import { Offer } from "../models/Offer";
import { body, validationResult } from "express-validator";

export default {
    
    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({"errors": errors});
            }
            
            const product = await Product.create(req.body);
            res.status(201).json({"product": product}).send();

        } catch (err) {
            res.status(400).json({"error": err}).send();
        }

    },

    async get(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);
            if (product === null) throw new Error;
            res.status(200).json({"product": product}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
        }

    },

    async getOwner(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);
            if (product === null) throw new Error;

            const owner = await product.$get('owner');

            res.status(200).json({"owner": owner}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
        }

    },

    async getOffers(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);
            if (product === null) throw new Error;

            const offers = await product.$get('offers');

            res.status(200).json({"offers": offers}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
        }

    },

    async list(req: Request, res: Response) {
        try {
            const products = await Product.findAll();
            res.status(200).json({"products": products}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
        }

    },

    async update(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({"errors": errors});
            }

            const product = await Product.findByPk(req.params["id"]);
            if (product === null) throw new Error;

            product.update(req.body);
            res.status(200).json({"product": product}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
        }

    },

    async setOwner(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["product_id"]);
            if (product === null) throw new Error;
            const user = await User.findByPk(req.params["user_id"]);
            if (user === null) throw new Error;

            product.$set('owner', user);

            product.save();
            res.status(200).json({"product": product}).send();

        } catch (err) {
            res.status(400).json({"error": err}).send();
        }

    },

    async delete(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params["id"]);
            if (product === null) throw new Error;

            product.destroy();
            res.status(200).json({"product": product}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
        }

    },
}