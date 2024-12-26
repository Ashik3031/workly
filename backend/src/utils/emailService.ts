import nodemailer from "nodemailer";

export const sendOtpToEmail = async (email: string, otp: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  });
};
  