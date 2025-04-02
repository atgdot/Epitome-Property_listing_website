import Enquiry from '../models/enquiry_model.js';
import nodemailer from 'nodemailer';

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: 'your_admin_email@gmail.com', 
        pass: 'your_email_password' 
    }
});

// Submit Enquiry API
export const submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, description } = req.body;

        // Validate Input
        if (!name || !email || !phone || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Save Enquiry to Database
        const newEnquiry = new Enquiry({ name, email, phone, description });
        await newEnquiry.save();

        // Email to Admin
        const adminMailOptions = {
            from: 'your_admin_email@gmail.com',
            to: 'admin@example.com',
            subject: 'New Enquiry Received',
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDescription: ${description}`
        };
        await transporter.sendMail(adminMailOptions);

        // Thank-You Email to User
        const userMailOptions = {
            from: 'your_admin_email@gmail.com',
            to: email,
            subject: 'Thank You for Your Enquiry',
            text: `Hi ${name},\n\nThank you for reaching out! We have received your enquiry and will get back to you soon.\n\nBest Regards,\nYour Company`
        };
        await transporter.sendMail(userMailOptions);

        return res.status(201).json({ success: true, message: 'Enquiry submitted successfully!' });

    } catch (error) {
        console.error('Error submitting enquiry:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
