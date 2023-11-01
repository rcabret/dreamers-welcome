export default async function (req: any, res: any) {
    const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
    sgMail.setApiKey("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")


    const mailData = {
        to: 'akshitatomarbca05@gmail.com',
        from: 'dreamerswelcome.web@gmail.com',
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

    sgMail
        .send(mailData)
        .then(() => {
            res.status(200)
            res.end()
        })
        .catch((error: any) => {
            res.status(500).json({ error: error.message || error.toString() })
        })
}
