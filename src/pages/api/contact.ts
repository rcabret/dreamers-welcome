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
        subject: `[${req.body.bucket}] | [${req.body.subject}] New Form Submission from ${req.body.name}`,
        text: req.body.message + ' | Sent from: ' + req.body.email,
        html: `<p>Sent from: ${req.body.email}</p>
                <div><strong>Name:</strong> ${req.body.name}</div>
                <div><strong>Subject:</strong> ${req.body.subject}</div>
                <div><strong>Property:</strong> ${req.body.property}</div>
                <div><strong>Destination:</strong> ${req.body.bucket}</div>
                <div><strong>Message:</strong></div>
                <div><p>${req.body.message}</p></div>`,
    }

    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err) console.error(err)
        else console.log(info)
    })

    res.status(200)
    res.end()
}
