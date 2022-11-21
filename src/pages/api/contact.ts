export default async function (req: any, res: any) {
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

    const getCorrectEmail = (bucket: string) => {
        switch (bucket) {
            case 'NORTH CAROLINA':
                return 'info@dreamerswelcome.com'
            default:
            case 'PUERTO RICO':
                return 'stay@dreamerspuertorico.com'
        }
    }

    const mailData = {
        from: 'New DW Contact Form Submission',
        to: 'stay@dreamerspuertorico.com',
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

    try {
        await transporter.sendMail(mailData, function (err: any, info: any) {
            if (err) {
                res.error(err)
                res.end()
            } else console.log(info)
        })
    } catch (error: any) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() })
    }
    return res.status(200).json({ error: '' })
}
