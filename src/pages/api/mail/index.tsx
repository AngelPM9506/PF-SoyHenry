import { NextApiRequest, NextApiResponse } from "next";
const { MAIL_FROM, MAIL_PASSWORD } = process.env

const mail = async (req: NextApiRequest, res: NextApiResponse) => {
    let { method, body: { mail, subject, message, html } } = req;
    try {
        switch (method) {
            case 'POST':
                var nodeMailer = require('nodemailer');
                var transporter = nodeMailer.createTransport({
                    host: "smtp-mail.outlook.com",
                    port: 587,
                    auth: {
                        user: MAIL_FROM,
                        pass: MAIL_PASSWORD
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                let mailData = {
                    from: MAIL_FROM,
                    to: mail,
                    subject: subject,
                    text: message ? message : '',
                    html: `
                        <main>
                            <h1>${html.title}</h1>
                            <h2>${html.actionName}</h2>
                            <p>${html.text}</p>
                        </main>
                    `
                }
                let resp;
                await transporter.sendMail(mailData, (error: any, resp: any) => {
                    if (error) throw new Error("Fail to send email");
                    else resp = "Email sended"
                });
                return res.status(200).json({ status: 'success', response: resp });
            default:
                res.status(400).send("Method not supported try again");
                break;
        }
    } catch (error) {
        return res.json({ status: 'error', error });
    }
}

export default mail

/**
 * metodo para enviar un correo
await axios.post('/api/mail', { -> llamada de axios por post
      mail: userDb.data.mail, -> correo al que se enviara la notificacion
      subject: `Trip ${input.name} has been create successfuly thanks to use WORLD TRAVELERS`, -> asunto del mensaje
      message: `Your Trip: ${input.name} has been create successfuly thanks to use WORLD TRAVELERS`, -> mensaje sin html (opcional)
      html: { -> mensaje en html -> sujeto a cambios en posteriores verciones
        title: 'Trip created successfuly',
        actionName: input.name,
        text: `Your Trip ${input.name} has been created `
      } 
 */