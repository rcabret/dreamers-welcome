export default function (req: any, res: any) {
    let nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: 'dw.contact.form@gmail.com',
            pass: 'fytgvlugoftplwkq',
        },
        secure: true,
    })

    const mailData = {
        from: 'demo email',
        to: 'dreamerswelcome.web@gmail.com',
        subject: `Message From ${req.body.name}`,
        text: req.body.message + ' | Sent from: ' + req.body.email,
        html: `<div>${req.body.message}</div>
               <p>Sent from: ${req.body.email}</p>`,
    }

    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err) console.log('in here', err)
        else console.log('info', info)
    })

    res.status(200)
    res.end();
}
