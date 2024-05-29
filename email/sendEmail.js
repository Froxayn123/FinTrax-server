require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, link, fullname) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PWEMAIL,
      },
    });

    await transporter.sendMail({
      from: "noreply@gmail.com",
      to: email,
      subject: subject,
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email Address for FinTrax</title>
</head>
<body>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #ccc;">
          <tr>
            <td align="center" valign="top" bgcolor="#f7f7f7" style="padding: 20px;">
              <img src="/email/Logo.png" alt="FinTrax.png" width="200" height="50">
            </td>
          </tr>
          <tr>
            <td align="left" valign="top" style="padding: 20px;">
              <h2>Verify Your Email Address for FinTrax</h2>

              <p>Hi ${fullname},</p>

              <p>Welcome to FinTrax! To complete your registration and start enjoying all of FinTrax's features, you need to verify your email address.</p>

              <p><a href=${link} style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px;">Verify Your Email Address</a></p>

              <p>If you didn't receive this email, it's possible that you entered the wrong email address during registration. You can try again by visiting our registration page: <a href="${link}">${link}</a></p>

              <p>Thanks,</p>
              <p>The FinTrax Team</p>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" bgcolor="#f7f7f7" style="padding: 20px;">
              <p>&copy; 2024 FinTrax. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

      `,
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { sendEmail };
