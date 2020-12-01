import { config } from 'dotenv';
config();

export default {
    /**
     * Configurações:
     * secret -> No campo secret deverá ser passado alguma coisa que somente o desenvolvedor deverá saber;
     * No nosso caso geramos apenas uma string qualquer e utilizamos para esse campo
     * expiresIn -> Esse campo refere-se ao prazo de validade do token, quando o token vencer ele se tornará
     * inutilizável. Consequentemente, o usuário seria automaticamente desconectado do servidor.
     */
    secret: process.env.PASSPORT_SECRET as string,
    expiresIn: process.env.PASSPORT_EXPIRES_IN,
}   
