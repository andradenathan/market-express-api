import { Request, Response } from 'express';
import { Address } from '../models/Address';
import { User } from '../models/User';
import seedAddresses from './AddressesSeeder';
import  seedUsers  from './UsersSeeder';
import seedProducts from './ProductsSeeder';

// Seeda o bd com n elementos de cada tipo
export default (req: Request, res: Response) => {
    let n: number = +req.params['n'];   // Lê o valor de n

    try {
        seedUsers(n);       // Seeda usuários
        seedAddresses(n);   // Seeda endereços
        seedProducts(n);    // Seeda produtos
    } catch(err) {
        return res.status(500).json({"error": "Internal server error"}) // Retorna um erro
    }
    return res.status(200).json({"success": "database seeded"}) // Retorna menssagem de sucesso
}