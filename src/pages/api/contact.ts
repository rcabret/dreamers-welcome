export default function (req: any, res: any) {
    let nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: 'dw.contact.form@gmail.com',
            pass: process.env.NEXT_PUBLIC_BURNER_EMAIL_PW,
        },
        secure: true,
    })

    const mailData = {
        from: 'New DW Contact Form Submission',
        to: 'dreamerswelcome.web@gmail.com',
        subject: `New DW Contact Form Submission from ${req.body.name}`,
        text: req.body.message + ' | Sent from: ' + req.body.email,
        html: `<p>Sent from: ${req.body.email}</p>
                <div>Name: ${req.body.name}</div>
                <div>Subject: ${req.body.subject}</div>
                <div>Property: ${req.body.property}</div>
                <div>${req.body.message}</div>`,
    }

    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err) console.error(err)
        else console.log(info)
    })

    res.status(200)
    res.end()
}
