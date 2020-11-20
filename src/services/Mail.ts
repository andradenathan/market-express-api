import * as nodemailer from "nodemailer";
import { config } from 'dotenv';

class Mail {
    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }

    sendMail(){
        let mailOptions = {
            from: "nathan.nhdsk@gmail.com",
            to: this.to,
            subject: this.subject,
            html: this.message
        };


        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST as string,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER as string,
                pass: process.env.MAIL_PASSWORD as string,
            },
            tls: { rejectUnauthorized: false }
        });


        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                return error;
            } else {
                return "Email enviado com sucesso!"
            }
        });
    }
}

export default new Mail;
