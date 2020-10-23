import { User } from "../models/User";
import { Request, Response } from 'express'; 

export default {

    async create(req: Request, res: Response) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({"user": user}).send();

            } catch (err) {
                res.status(400).json({"error": err}).send();
            }

    },

    async get(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params["id"]);
            if (user === null) throw new Error;

            const products = await user.$get('products')

            res.status(200).json({"user": user, "products": products}).send();
        } catch (err) {
            res.status(400).json({"error": "User not found"}).send();
        }

    },

    async getProducts(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params["id"]);
            if (user === null) throw new Error;

            const products = await user.$get('products')

            res.status(200).json({"products": products}).send();
        } catch (err) {
            res.status(400).json({"error": "User not found"}).send();
        }
    },

    async list(req: Request, res: Response) {
        try {
            const users = await User.findAll();
            res.status(200).json({"users": users}).send();

        } catch(err) {
            res.status(404).json({"users": "Users not found"}).send();
        }
    },

    async update(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params["id"]);
            if (user === null) throw new Error;

            user.update(req.body);
            res.status(200).json({"user": user}).send();

        } catch (err) {
            res.status(404).json({"error": "User not found"}).send();
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params["id"]);
            if (user === null) throw new Error;
            user.destroy();
            res.status(200).json({"user": "User has been successfully deleted"})
        } catch (err) {
            res.status(404).json({"error": "User not found"}).send();
        }
    }
}

