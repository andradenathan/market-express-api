import { Product } from "../models/Product"
import {Request, Response} from "express"
import { sequelize } from "../database/config";

export default {

    async create(req: Request, res: Response) {
        try {
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
            const product = await Product.findByPk(req.params["id"]);
            if (product === null) throw new Error;

            product.update(req.body);
            res.status(200).json({"product": product}).send();

        } catch (err) {
            res.status(404).json({"error": "Entity not found"}).send();
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

    async sync(req: Request, res: Response) {

        try {
            await sequelize.sync({ force: true });
            await sequelize.authenticate();
            res.status(200).json('Connection has been established successfully.').send;
        } catch (error) {
            res.status(400).json({'Unable to connect to the database': error}).send;
        }
    }
}