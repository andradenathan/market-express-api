import { Request, Response } from 'express';
import { Address } from '../models/Address';
import { User } from '../models/User';
import { seedAddresses } from './AddressesSeeder';
import { seedUsers } from './UsersSeeder';
import { seedProducts } from './ProductsSeeder';

export const seedDB = async (req: Request, res: Response) => {
    let n: number = +req.params['n'];

    try {
        seedUsers(n);
        seedAddresses(n);
        seedProducts(n);
    } catch(err) {
        return res.status(500).json({"error": "Internal server error"})
    }
    return res.status(200).json({"success": "database seeded"})
}