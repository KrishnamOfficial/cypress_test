const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function sendEmail() {
    try {
        // Configure email transport using environment variables
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Read from environment variables
                pass: process.env.EMAIL_PASS, // Use app password (not raw password)
            },
        });

        // Path to the test report
        const reportPath = path.join(__dirname, 'cypress', 'reports','html', 'index.html');

        // Check if the report file exists
        if (!fs.existsSync(reportPath)) {
            console.error('❌ Report file not found:', reportPath);
            return;
        }

        // Email options
        let mailOptions = {
            from: process.env.EMAIL_USER, // Sender email
            to: process.env.EMAIL_TO, // Recipient email
            subject: 'Cypress Mochawesome Test Report',
            text: 'Attached is the latest Cypress Mochawesome test report.',
            attachments: [
                {
                    filename: 'Mochawesome-Report.html',
                    path: reportPath,
                },
            ],
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.response);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
}

// Export function to use in Cypress tasks
module.exports = sendEmail;
