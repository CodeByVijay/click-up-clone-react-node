import nodemailer from "nodemailer"

export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vijay.amule@techinfini.com',
    pass: 'Vijay@1999'
  }
});
