const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'your_email@example.com', // Your email address
        pass: 'your_password' // Your email password
    }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'Your Restaurant <your_email@example.com>', // Your restaurant's name and email
            to: to, // Receiver's email address
            subject: subject, // Subject line
            text: text // Plain text body
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
