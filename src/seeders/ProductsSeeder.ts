import { Product } from "../models/Product";
import faker from 'faker';

export default async (n: number) => {
    let products: object[] = [];
    for (let i = 0; i < n; i++) {
        products.push({
            'name': faker.commerce.product(),
            'value': faker.commerce.price(),
            'ownerId': faker.random.number() % n + 1
        });
        console.log(faker.random.number() % n + 1);
        
    };

    try {
        await Product.bulkCreate(products);
    } catch (err) {
        return new Error;
    }
}