import { config } from 'dotenv';
config();

export default {
    secret: process.env.PASSPORT_SECRET as string,
    expiresIn: process.env.PASSPORT_EXPIRES_IN,
}   
