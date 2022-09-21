const sendMail = (to: string, subjet: string, mesaje: string) => {
    const nodeMailer = require('nodemailer');
    const transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "ec3849b72b8584",
            pass: "d10c11bd833a7f"
        }
    });

    let mailData = {
        from: 'ejemplo@ejemplo.com',
        to: to,
        subjet: subjet,
        text: mesaje
    }
    
    let resp = transporter.sendMail(mailData, (err: any, resp: any) => {
        if (err) return err;
        else return resp;
    });
    return resp;
}

export default sendMail;

/**
   const mailData = {
    from: 'demo@demo.com',
    to: 'your email',
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: <div>{req.body.message}</div>
   }
 */