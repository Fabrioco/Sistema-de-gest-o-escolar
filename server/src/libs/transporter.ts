import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporterMail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: "fabriciooliveiralopes50@gmail.com",
    pass: process.env.GOOGLE_PASS_KEY,
  },
});
