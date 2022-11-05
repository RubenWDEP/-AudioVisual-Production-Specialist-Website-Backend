import { RequestHandler } from "express";
import { getCommentAction } from "../Service/getCommentAction";

export const getCommentController: RequestHandler = async (req, res, next) => {
  try {
    const { sectionCommentName } = req.query;

    if (typeof sectionCommentName !== "string") {
      throw new Error(
        "Query param 'sectionCommentName' has to be of type string"
      );
    }
    const getCommentData = await getCommentAction(sectionCommentName);

    return res.send({
      status: 200,
      result: getCommentData,
    });
  } catch (error) {
    next(error);
    console.error(error);
  }
};
