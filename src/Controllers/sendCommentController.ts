import { RequestHandler } from "express";
import { sendComment } from "../db/sendComment";
import { Comment } from "../types";

const sendCommentController: RequestHandler = async (req, res, next) => {
  try {
    const { section, name, email, comment }: Comment = req.body;
    const sendCommentAction = await sendComment(section, name, comment);
    return res.send({
      status: 200,
      result: sendCommentAction,
      message: "Comentario enviado correctamente",
    });
  } catch (error) {
    next(error);
    console.error(error);
  }
};

export default sendCommentController;
