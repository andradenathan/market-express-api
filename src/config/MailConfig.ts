import { config } from 'dotenv';

class MailConfigs {
    public host = process.env.MAIL_HOST;
    public port = process.env.MAIL_PORT;
    public user = process.env.MAIL_USER;
    public password = process.env.MAIL_PASSWORD;
}

export default new MailConfigs;