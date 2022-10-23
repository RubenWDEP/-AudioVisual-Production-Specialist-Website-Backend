import "dotenv/config";
import express, { ErrorRequestHandler, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { sendEmailController } from "./Controllers/sendEmailController";
import { NextFunction } from "express-serve-static-core";
import sendCommentController from "./Controllers/sendCommentController";

const App = express();

const Port: number = 4000;

//Dev middlewares --------------------------------------
App.use(express.json());
App.use(morgan("dev"));
App.use(cors<Request>());

//Endpoints --------------------------------------------
App.post("/sendemail", sendEmailController);
App.post("/comments", sendCommentController);

//Errors------------------------------------------------
App.use((req, res) => {
  res.status(404);
  res.send({
    status: "error",
    message: "Not found",
  });
});

App.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(error);
    res.status(500);
    res.send({
      status: error,
      // message: error.message,
    });
  }
);
//Server -----------------------------------------------
App.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
