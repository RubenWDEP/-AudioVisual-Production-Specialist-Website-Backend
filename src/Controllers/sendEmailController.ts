import { RequestHandler } from "express";
import sendEmail from "../Service/sendMail";
import { Comment } from "../types";

const sendEmailController: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, comment }: Comment = req.body;
    const sendEmailAction = await sendEmail(name, email, comment);
    console.log(name, email, comment);

    return res.send({
      code: 200,
      message: "Mensaje enviado correctamente",
      sendEmailAction: sendEmailAction,
    });
  } catch (error) {
    next(error);
  }
};

export { sendEmailController };
