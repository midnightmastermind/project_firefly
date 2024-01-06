const nodemailer = require('nodemailer');

// Function to send an email
async function sendEmail(to, subject, text) {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });

    // Define email options
    const mailOptions = {
      from: 'your_email@gmail.com',
      to,
      subject,
      text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Internal server error' };
  }
}

module.exports = { sendEmail };
