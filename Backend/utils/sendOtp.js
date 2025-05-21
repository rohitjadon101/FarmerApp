const nodemailer = require('nodemailer');

const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your OTP for FarmerApp Registration',
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;