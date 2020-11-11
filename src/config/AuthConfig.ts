import { config } from 'dotenv';
config();

export default {
    secret: process.env.PASSPORT_SECRET? process.env.PASSPORT_SECRET:'',
    expiresIn: process.env.PASSPORT_EXPIRES_IN,
}