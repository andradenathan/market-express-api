import { User } from "../models/User";
import { Request, Response } from 'express'; 
import { Product } from "../models/Product";
import { validationResult } from 'express-validator';

export default {

    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({"errors": errors});
            }

            const user = await User.create(req.body);
            res.status(201).json({"user": user}).send();

            } catch (err) {
                res.status(400).json({"error": err}).send();
            }

    },

    async makeOffer(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({"errors": errors});
            }

            const user = await User.findByPk(req.params["user_id"]);
            if (user === null) throw new Error;
            
            const product = await Product.findByPk(req.params["product_id"]);
            if (product === null) throw new Error;

            const offer = await user.$add('offers', product, {
                through: {value: req.body["value"]}
            });

            product.update({"value": req.body["value"]});

            res.status(200).json({"Offer": offer}).send();
        } catch (err) {
            res.status(400).json({"error": err}).send();
        }

    },

    async get(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params["id"]);
            if (user === null) throw new Error;

            const address = await user.$get('address')
            res.status(200).json({"user": user, "address": address}).send();
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

    async getOffers(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params["id"]);
            if (user === null) throw new Error;

            const offers = await user.$get('offers')

            res.status(200).json({"offers": offers}).send();
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
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({"errors": errors});
            }
            
            const user = await User.findByPk(req.body.id);
            if (user === null) throw new Error;

            user.update(req.body);
            res.status(200).json({"user": user}).send();

        } catch {
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

