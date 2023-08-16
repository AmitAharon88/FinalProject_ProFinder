import nodemailer from 'nodemailer';
// import transporter from './mailer-config';

const userEmail = process.env.USER_EMAIL;

// Configure your email transport using your email provider's settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: 'Schroon3#',
    },
});

export const _contact = async (req, res) => {
    try {
      const { studentEmail, userFN, userLN, tuorEmail, message, } = req.body;
  
      const mailOptions = {
        from: studentEmail,
        to: tuorEmail,
        subject: `New student message from ${userFN} ${userLN}`,
        text: message,
      };
  
      // Use Nodemailer to send the email
      const response = await transporter.sendMail(mailOptions);
      res.status(200).json({ msg: 'Email sent successfully' });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
};