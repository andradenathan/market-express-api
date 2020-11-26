import { Product } from "../models/Product"
import { Request, Response } from 'express'; 
import { User } from "../models/User";

// Valida as ofertas
export default async (req: Request, res: Response, next: any) => {
    try {
        const product = await Product.findByPk(req.params['product_id']);   // Encontra o produto pelo id
        const user = await User.findByPk(req.params['user_id']);   // Encontra o usuário pelo id

        if (product?.ownerId === user?.id) {    // Verifica se o usuário não está ofertando em um produto próprio
            return res.status(401).json({"error": "User can't make offer on their own product"});
        }

        if (product && req.body.value <= product.value) {   // Verifica se a oferta atual é mais alta que a anterior
            return res.status(401).json({"error": "Offer too low"});
        }

    } catch (err) {
        return res.status(500).json({"error": "Internal server error"});
    }

    next(); // Segue a execução caso não haja nenhum problema
}