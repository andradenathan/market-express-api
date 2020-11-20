import { Address } from '../models/Address';
import faker from 'faker';

export default async (n: number) => {
    let addresses: object[] = [];
    for (let i = 0; i < n; i++) {
        addresses.push({
            'street': faker.address.streetName(),
            'city': faker.address.city(),
            'district': faker.address.stateAbbr(),
            'userId': (i+5)%n+1
        });
    };

    try {
        await Address.bulkCreate(addresses);
    } catch (err) {
        return new Error;
    }
}