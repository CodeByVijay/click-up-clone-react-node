import nodemailer from "nodemailer"

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@gmail.com',
    pass: 'Test@1999'
  }
});
