import { config } from 'dotenv';
config();

export default {
    /**
     * Auth configuration 
     * secret -> it is the information that only the server admin must know
     * expiresIn -> it is when the token will expire in the server, in other words,
     * it will become unusable
     */
    secret: process.env.PASSPORT_SECRET as string,
    expiresIn: process.env.PASSPORT_EXPIRES_IN,
}   
