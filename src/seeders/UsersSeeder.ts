import faker, { address } from 'faker';
import { Address } from '../models/Address';
import { User } from '../models/User';

export default async (n: number) => {
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
        await createAdmin();
    } catch (err) {
        return new Error;
    }
}

async function createAdmin() {
    const adminData = {
        'name': 'admin',
        'email': 'admin@email.com',
        'password': '123',
        'date_of_birth': new Date(1, 0, 1)
    }
    try {
        const admin = await User.create(adminData);
        admin.is_admin = true;
        admin.save();
    } catch (err) {
        return new Error;
    }
}