const nodemailer = require('nodemailer');
require('dotenv').config();

const subject = "Application for the position of Software Engineer";
const message = `Dear Hiring Manager,
I am writing to express my interest in the Software Engineer position at your company.
I believe my skills and experience make me a strong candidate for this role.
Thank you for considering my application.

Sincerely,
Sannith Kumar`;

async function sendEmail(recipentemail) {
    try {
        // Validate input parameters
        if (!recipentemail) {
            throw new Error("recipentemail is undefined or null.");
        }
        if (!subject) {
            throw new Error("subject is undefined or null.");
        }
        if (!message) {
            throw new Error("message is undefined or null.");
        }


        console.log("the Email is sending to : ",recipentemail);

        if (!process.env.EMAIL_PASSWORD || !process.env.EMAIL_USERNAME) {
            throw new Error("EMAIL, EMAIL_PASSWORD, or EMAIL_USERNAME environment variables are not set.");
        }
        
        console.log("Email and Password environment variables are set.");
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, // Replace with your Gmail address
                pass: process.env.EMAIL_PASSWORD,  // Replace with your Gmail app password
            }

        });

        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USERNAME, // Replace with your Gmail address
            to:recipentemail.EmailAddress,
            subject: subject,
            text: message
        };

        // Send email
        console.log("sending email to : ",recipentemail.EmailAddress);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Propagate the error for better debugging
    }
}

module.exports = sendEmail;