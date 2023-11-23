const nodemailer = require('nodemailer');
require('dotenv').config();


async function sendMail(req, res) {
    try {
        console.log('Sending email...')
        const { subject, email, message } = req.body;
        console.log(req.body);

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            secure: false,
            service: 'gmail',
            type: "SMTP",
            host: "smtp.gmail.com",
            port: process.env.SMTP_PORT,// You can use other services or provide SMTP settings
            auth: {
                user: process.env.SMTP_MAIL, // Replace with your Gmail email
                pass: process.env.SMTP_PASSWORD, // Replace with your Gmail password
            },
            tls: { rejectUnauthorized: false }
        });

        // Define email options
        const mailOptions = {
            from: process.env.SMTP_MAIL, // Replace with your Gmail email
            to: email,
            subject: subject,
            text: message,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info);

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error });
    }
};



module.exports = { sendMail };