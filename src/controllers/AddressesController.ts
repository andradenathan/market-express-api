import { Address } from "../models/Address";
import { User } from "../models/User";
import { Request, Response } from 'express';


export default {
    async create(req: Request, res: Response) {
        try {
            const address = await Address.create(req.body);
            res.status(201).json({"address": address}).send();

        } catch (err) {
            res.status(400).json({"error": err}).send();
        }
    },

    async update(req: Request, res: Response) {
        try {
            const address = await Address.findByPk(req.params["id"]);
            if (address === null) throw new Error;

            address.update(req.body);
            res.status(200).json({"address": address}).send();
        } catch(err) {
            res.status(404).json({"error": "User not found"}).send();
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const address = await Address.findByPk(req.params["id"]);
            if (address === null) throw new Error;

            address.destroy();
            res.status(200).json({"address": "Address has been sucessfully deleted"})
        } catch(err) {
            res.status(404).json({"error": "Address not found"}).send();
        }
    },

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
