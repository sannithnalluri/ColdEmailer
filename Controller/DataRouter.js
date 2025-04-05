const express = require('express');
const getAllJobService = require('../Services/getAllJobService');
const sendEmail = require('../Services/EmailService');
const updateExcelSheet = require('../Services/UpdateExcelSheet');

const router = express.Router();





// Route to test email sending service
router.post('/send-test-email', async (req, res) => {
    try {
        const data =  getAllJobService();

        if (!data || !Array.isArray(data)) {
            return res.status(500).json({ error: 'Failed to retrieve job data' });
        }

        for (const job of data) {
            if (!job.EmailAddress) {
                return res.status(400).json({ error: 'Missing email address fields' });
            }

            const subject = 'Test Email Subject'; // Define subject
            const message = 'This is a test email message'; // Define message

            try {
                await sendEmail({ EmailAddress: job.EmailAddress, subject, message });
                const emailAddress = job.EmailAddress;
                console.log('Starting updateExcelSheet for:', emailAddress);
                await updateExcelSheet(emailAddress);
                console.log('Successfully updated Excel sheet for:', emailAddress);
            } catch (error) {
                console.error('Error processing job for:', job.EmailAddress, error);
                return res.status(500).json({ error: `Failed to process job for ${job.EmailAddress}` });
            }
        }

        res.status(200).json({ message: 'Test email sent successfully' });
        } catch (error) {
        res.status(500).json({ error: 'Failed to send test email' });
    }
});


       
   

  
module.exports = router;