import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Enquiry from '../models/enquiry_model.js';

dotenv.config(); // Load environment variables

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER_EMAIL,
        pass: process.env.GMAIL_USER_PASSWORD
    }
});

// Submit Enquiry Controller
export const submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, description } = req.body;

        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Name, email, and phone are required.' });
        }

        // Save to database
        const newEnquiry = new Enquiry({ name, email, phone, description });
        await newEnquiry.save();

        // Email to Admin
        const adminMailOptions = {
            from: `"${process.env.ADMIN_NAME}" <${process.env.GMAIL_USER_EMAIL}>`,
            to: process.env.ADMIN_RECEIVER,
            subject: '📩 New Enquiry Received',
            text: `You have a new enquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDescription: ${description || 'N/A'}\n\nSubmitted on: ${new Date().toLocaleString()}`
        };
        await transporter.sendMail(adminMailOptions);

        // Welcome email to customer
        const userMailOptions = {
            from: `"${process.env.ADMIN_NAME}" <${process.env.GMAIL_USER_EMAIL}>`,
            to: email,
            subject: '🎉 Welcome to Epitome!',
            text: `Hi ${name},\n\nThank you for reaching out to Epitome! We've received your enquiry and will get back to you shortly.\n\nBest regards,\n${process.env.ADMIN_NAME}`
        };
        await transporter.sendMail(userMailOptions);

        return res.status(201).json({ success: true, message: 'Enquiry submitted successfully!' });

    } catch (error) {
        console.error('Error submitting enquiry:', error);
        return res.status(500).json({ error: 'Something went wrong on our end.' });
    }
};
