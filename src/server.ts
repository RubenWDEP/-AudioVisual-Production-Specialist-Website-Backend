import express, {
  ErrorRequestHandler,
  Request,
  RequestHandler,
  Response,
} from "express";
import morgan from "morgan";
import { sendEmailController } from "./Controllers/sendEmailController";
import { NextFunction } from "express-serve-static-core";
import * as dotenv from "dotenv";
import sendCommentController from "./Controllers/sendCommentController";
dotenv.config();

const App = express();

const Port: number = 3000;

//Dev middlewares --------------------------------------
App.use(express.json());
App.use(morgan("dev"));

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