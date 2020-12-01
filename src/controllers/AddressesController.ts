import { Address } from "../models/Address";
import { User } from "../models/User";
import { Request, Response } from 'express';


export default {

    /**
     * Cria um endereço e associa a um usuário
     * 
     * @param req 
     * @param res 
     */

    async create(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.body.id);
            req.body.userId = req.body.id;
            req.body.id = null;
            const address = await Address.create(req.body)
            await user?.$set('address', address);
            console.log(req.body)
            await user?.save();
            res.status(201).json({"address": address}).send();

        } catch (err) {
            res.status(400).json({"error": err}).send();
        }
    },

    /**
     * Atualiza os dados de um endereço
     * 
     * @param req 
     * @param res 
     */

    async update(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.body.id);
            const address = await user?.$get('address');
            if (!address) throw new Error;

            address.update(req.body);
            res.status(200).json({"address": address}).send();
        } catch(err) {
            res.status(500).json({"error": "internal server error"}).send();
        }
    },

    /**
     * Deleta um endereço
     * 
     * @param req 
     * @param res 
     */
    
    async delete(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.body.id);
            const address = await user?.$get('address');
            if (!address) throw new Error;

            address.destroy();
            res.status(200).json({"address": "Address has been sucessfully deleted"})
        } catch(err) {
            res.status(404).json({"error": "Address not found"}).send();
        }
    },

    /**
     * Define um usuário que um respectivo endereço pertence
     * 
     * @param req 
     * @param res 
     */

    async setUser(req: Request, res: Response) {
        try {
            const address = await Address.findByPk(req.params["address_id"]);
            if(address === null) throw new Error;
            const user = await User.findByPk(req.params["user_id"]);
            if (user === null) throw new Error;

            address.$set('user', user);

            address.save();


        } catch(err) {
            res.status(404).json({"error": err}).send();

        }
    }
}
