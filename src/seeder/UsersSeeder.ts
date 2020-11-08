import faker, { address } from 'faker';
import { Address } from '../models/Address';
import { User } from '../models/User';

export const seedUsers = async (n: number) => {
    let users: object[] = [];
    for (let i = 0; i < n; i++) {
        users.push({
            'name': faker.name.findName(),
            'email': faker.internet.email(),
            'password': faker.internet.password(),
            'date_of_birth': faker.date.past()
        });
    }
    try {
        await User.bulkCreate(users);
    } catch (err) {
        return new Error;
    }
}