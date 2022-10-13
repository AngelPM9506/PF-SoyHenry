import { NextApiRequest, NextApiResponse } from "next";
const { MAIL_FROM, MAIL_PASSWORD, MAIL_BASE_URL } = process.env

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
                    <!DOCTYPE html>
                        <html lang="en">

                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
                            <style type="text/css" data-hse-inline-css="true">
                                html {
                                    background-color: #D1DFE3;
                                    font-size: 62.5%;
                                    box-sizing: border-box;
                                }

                                *,
                                *:before,
                                *:after {
                                    box-sizing: inherit;
                                }

                                body {
                                    font-size: 1.6rem;
                                    line-height: 1.8;
                                }

                                p {
                                    color: #293541;
                                    font-size: 2rem;
                                }

                                .contenedor {
                                    width: 95%;
                                    max-width: 120rem;
                                    margin: 0 auto;
                                }

                                a {
                                    text-decoration: none;
                                }

                                img,
                                picture {
                                    width: 100%;
                                    display: block;
                                }

                                h1,
                                h2,
                                h3,
                                h4 {
                                    color: #293541;
                                    margin: 2.5rem;
                                    font-weight: 300;
                                    text-align: center;

                                }

                                h1 {
                                    font-size: 3rem;
                                    margin-right: 50px;
                                }

                                h2 {
                                    font-size: 4rem;
                                }

                                h3 {
                                    font-size: 3rem;
                                }

                                h4 {
                                    font-size: 2.6rem;
                                }

                                main{
                                    background-color: #D1DFE3;
                                }

                                .head-contenedor {
                                    border-bottom: 0.5rem solid #293541;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                }

                                .head-contenedor .title h1,
                                .head-contenedor .title h2 {
                                    text-align: left;
                                    margin: 0.25rem 0;
                                    width: 100%;
                                }

                                .head-contenedor picture {
                                    height: 7rem;
                                }
                                .head-contenedor picture img {
                                    height: 100%;
                                    width: auto;
                                }

                                .contenido {
                                    border-bottom: 0.2rem solid #4b647c;
                                    padding: 2rem 1rem;
                                }
                                .contenido h3 {
                                    margin: 0;
                                    padding: 0;
                                    border-bottom: 0.1rem solid #293541;
                                    width: max-content;
                                }

                                .botones {
                                    text-align: center;
                                }

                                .boton {
                                    border: 0.1rem solid #4b647c;
                                    border-radius: 0.5rem;
                                    margin: 1rem 2rem;
                                    padding: 0.5rem 1.5rem;
                                    background-color: #F3B46F;
                                    color: #293541;
                                    box-shadow: 0px 0px 15px -5px #293541;
                                }

                                .boton:hover {
                                    cursor: pointer;
                                }
                                .gracias .soporte h4{
                                    margin: 0;
                                }
                                .gracias .soporte p,
                                .gracias .soporte span{
                                    font-size: 1.5rem;
                                    margin: 0;
                                    padding: 0;
                                }

                                .gracias .soporte span{
                                    color: #02b1b1;
                                }
                            </style>
                        </head>

                        <body>
                            <main class="contenedor">
                                <!--Logo-->
                                <section class="head-contenedor">
                                    <!--article class="title" >
                                        <h1 style="margin: 0 50px 0 0">Notifications</h1>
                                    </article-->
                                    <picture >
                                        <img style="max-height:70px;width: auto;" src="https://res.cloudinary.com/santino/image/upload/v1665662992/worldTravelers/logo_notificaciones_w4fzot.png" alt="Logo">
                                    </picture>
                                </section>
                                <section class="contenido">
                                    <h2>${html.title}</h2>
                                    <h3>${html.actionName}</h3>
                                    <article class="text">
                                        <p class="message">${html.text}</p>
                                        <div class="botones">
                                            <a href="${MAIL_BASE_URL + html.url}" class="boton">${html.urlMsg}</a>
                                        </div>
                                    </article>
                                </section>
                                <section class="gracias">
                                    <article class="thanks">
                                        <p>Thank you for using our services, we are waiting for you at:</p>
                                        <div class="botones">
                                            <a class="boton" href="https://pf-soy-henry-three.vercel.app">World Travelers</a>
                                        </div>
                                    </article>
                                    <article class="soporte">
                                        <h4 style="text-align: left">Suport:</h4>
                                        <p>e-mail suport: <span>suport@worldtravelers.com</span></p>
                                        <p>cell contact: <span>55-55-55-55-55</span></p>
                                    </article>
                                </section>
                            </main>
                        </body>

                        </html>
                    `
                }
                let resp;
                console.log(
                    await transporter.sendMail(mailData, (error: any, resp: any) => {
                        if (error) {
                            console.log(error);
                            res.status(420).json({ status: 'error', response: error });
                        } else {
                            //console.log(resp);
                            res.status(200).json({ status: 'success', response: resp });
                        }
                        /**si funciona en local y con base de datos railway que pasa en vercel? */
                    })
                );
                //return res.status(201).json({ status: 'success', response: resp });
                break;
            default:
                return res.status(400).json("Method not supported try again");
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

ultima version
    await axios.post('/api/mail', {
      mail: userDb.data.mail,
      subject: `Trip ${input.name} has been create successfuly thanks to use WORLD TRAVELERS`,
      message: `Your Trip: ${input.name} has been create successfuly thanks to use WORLD TRAVELERS`,
      html: {
        title: 'Trip created successfuly',
        actionName: input.name,
        text: `Your Trip ${input.name} has been created`,
        url: `/trips/${tripCreated.id}`,
        urlMsg: 'See your trip here'
      }
 */