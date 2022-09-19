import { google } from "googleapis";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmail = async (
  name: string,
  email: string,
  comment: string
): Promise<SMTPTransport.SentMessageInfo | undefined> => {
  try {
    const accessTokenRes = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenRes.token;
    if (!accessToken) {
      throw new Error("ha fallado el token");
    }
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken: accessToken,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: `${process.env.FROM} <${process.env.MAIL}>`,
      to: `${process.env.TO}`,
      subject: `${process.env.SUBJECT}`,
      text: `${name}, ${email}, ${comment}`,
    };

    const result = await transport.sendMail(mailOptions);

    transport.verify((error, success) => {
      if (error) {
        console.error(error);
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
        console.log(success);
      }
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    // (error as Error).message
  }
};

export default sendEmail;
