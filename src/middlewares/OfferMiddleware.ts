import { Product } from "../models/Product"
import { Request, Response } from 'express'; 
import { User } from "../models/User";

export default async (req: Request, res: Response, next: any) => {
    try {
        const product = await Product.findByPk(req.params['product_id']);
        const user = await User.findByPk(req.params['user_id']);

        if (product?.ownerId === user?.id) {
            return res.status(401).json({"error": "User can't make offer on their own product"});
        }

        if (product && req.body.value <= product.value) {
            return res.status(401).json({"error": "Offer too low"});
        }

    } catch (err) {
        return res.status(500).json({"error": "Internal server error"});
    }

    next();
}