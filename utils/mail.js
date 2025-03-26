import config from "./config.js";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  // host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

export const mailCode = Math.floor(100000 + Math.random() * 900000);
export const mailCodeExpires = Date.now() + 3600000;

const htmlContent = {
  verifyEmail: (name) => {
    return `
      <div style="width: 100%; text-align: center;">
        <h2 style="font-size: 1.5rem; font-weight: bold">
          Hello, ${name}!
        </h2>
        <h3 style="font-size: 1.3rem; font-weight: bold">
          Activate Your Account
        </h3>
        <p>
          Thank you for signing up for Digital Deals Hub! 
          To complete your registration, please verify your email by entering the code below:
        </p>
        <p style="font-size: 1.5rem; font-weight: bold">
          Your verification code: ${mailCode}
        </p>
        
        <p>If you did not sign up for this account, please ignore this email.</p>
        <p>Note: This link will expire in 1 hour.</p>
        <p>
          Need help? Contact our support team at support@digitaldealshub.com.
        </p>

        <p>Welcome onboard</p>
        <p>The Digital Deals Hub  Team</p>
      </div>
    `;
  },
  resetPassword: (name) => {
    return `
      <div style="width: 100%; text-align: center;">
        <h2 style="font-size: 1.5rem; font-weight: bold">
          Hello, ${name}!
        </h2>
        <h3 style="font-size: 1.3rem; font-weight: bold">
          Reset Your Password
        </h3>
        <p>
          We received a request to reset your password for your Digital Deals Hub account.
          If you made this request, please use the code below to reset your password:
        </p>  
        <p style="font-size: 1.5rem; font-weight: bold">
          Your password reset code: ${mailCode}
        </p>
        <p>
          If you didn’t request a password reset, you can safely ignore this email.
        </p>
        <p>Note: This link will expire in 1 hour.</p>
        <p>
          Need help? Contact our support team at support@digitaldealshub.com.
        </p>
        <p>The Digital Deals Hub Team</p>
      </div>
    `;
  },
};

export const sendMail = (user, subject, target) => {
  const mailOptions = {
    from: config.EMAIL,
    to: user.email,
    subject,
    html:
      target === "verify"
        ? htmlContent.verifyEmail(user.name)
        : htmlContent.resetPassword(user.name),
  };

  return transporter.sendMail(mailOptions);
};
