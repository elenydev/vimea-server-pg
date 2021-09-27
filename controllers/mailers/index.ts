import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export const sendEmailAfterUserRegister = (
  userFirstName: string,
  email: string
): void => {
  const mailOptions = {
    from: "vimeasite@gmail.com",
    to: email,
    subject: "Vimea account",
    html: `<h3>Thank you for joining our Vimea community ${userFirstName}</h3>
    <br/>
    <div>
    <p>Hi ${userFirstName},</p>
    <p>We are very glad that u decided to join our community. Now you watch any kind of films that you like.</p>
    <p>Stay tuned for new productions and check your email carefully for getting discount codes from us :)</p>
    <br/>
    <br/>
    <small>Have a nice day! Vimea team. You can reply direct to this email or catch us on: vimeasite@gmail.com</small></p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

export const sendEmailAfterRemindPassword = (
  email: string,
  newPassword: string
): void => {
  const mailOptions = {
    from: "vimeasite@gmail.com",
    to: email,
    subject: "Vimea account",
    html: `<h3>It looks like you forgot your password</h3>
    <br/>
    <div>
    <p>Hi ${email},</p>
    <p>Your new password is: ${newPassword}. You can now log in and change it for your own :)</p>
    <br/>
    <p>If you doesn't tried to remind your password, immediately contact with us!</p>
    <small>Have a nice day! Vimea team. You can reply direct to this email or catch us on: vimeasite@gmail.com</small></p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

export const sendEmailAfterChangePassword = (
  email: string
): void => {
  const mailOptions = {
    from: "vimeasite@gmail.com",
    to: email,
    subject: "Vimea account",
    html: `<h3>It looks like you forgot your password</h3>
    <br/>
    <div>
    <p>Hi ${email},</p>
    <p>Your password have been succesfully changed.</p>
    <br/>
    <p>If you doesn't tried to change your password, immediately contact with us!</p>
    <small>Have a nice day! Vimea team. You can reply direct to this email or catch us on: vimeasite@gmail.com</small></p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    }
  });
};

export const sendEmail = (
  email: string,
  customerName: string,
  message: string
): void => {
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Email from site: ${customerName}`,
    html: `<h3>Email from: ${customerName}</h3>
    <br/>
    <div>
    <p>${message}</p>
    <br/>
    <small>Reply to the customer: ${email}</small></p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    }
  });
};
