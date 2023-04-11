const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const passwordEncrypt = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const result = await bcrypt.hashSync(password, salt);
  return result;
};

const passwordCompare = async (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const userRoles = {
  super_admin: 1,
  admin: 2,
  member: 3,
};

const createToken = (user_id, email) => {
  return jwt.sign({ user_id, email }, process.env.SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const sendEmailVerification = (name, email, id) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: "Note Marketplace - Email Verification",
    html: `Hello ${name},<br/><br/> Thank you for signing up with us. Please click on below link to verify your email address and to do login.<br/><br/><a href='react.org?id=${id}' target='_blank'>verification link</a><br/><br/>Regards,<br/>Notes Marketplace`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendEmailForgotPassword = (email, password) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: "New Temporary Password has been created for you",
    html: `Hello,<br/><br/> We have generated a new password for you.<br/>Password:${password}<br/><br/>Regards,<br/>Notes Marketplace`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const generatePassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

module.exports = {
  passwordEncrypt,
  passwordCompare,
  userRoles,
  createToken,
  verifyToken,
  sendEmailVerification,
  generatePassword,
  sendEmailForgotPassword,
};
