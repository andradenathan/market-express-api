import * as nodemailer from "nodemailer";

class Mail {
    constructor(
        public from?: string,
        public to?: string,
        public subject?: string,
        public message?: string) { }

    /**
     * Função para enviar e-mail para um usuário
     * 
     */
    sendMail(){
        let mailOptions = {
            from: this.from,
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


        transporter.sendMail(mailOptions, function(error){
            if(error) {
                return error;
            } else {
                return "Email enviado com sucesso!"
            }
        });
    }
}

export default new Mail;
