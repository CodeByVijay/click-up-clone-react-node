import nodemailer from "nodemailer"

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@test.com',
    pass: '*****'
  }
});
