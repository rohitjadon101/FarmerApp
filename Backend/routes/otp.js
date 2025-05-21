const express = require('express');
const router = express.Router();
const sendOtpEmail = require('../utils/sendOtp');

let otpStore = {};  // In-memory, use Redis or DB for production

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 mins

    try {
        await sendOtpEmail(email, otp);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ message: 'No OTP sent to this email' });
    if (Date.now() > record.expires) return res.status(400).json({ message: 'OTP expired' });

    if (parseInt(otp) === record.otp) {
        delete otpStore[email];
        res.status(200).json({ message: 'OTP verified' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

module.exports = router;