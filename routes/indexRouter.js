import { Router } from "express";
import { indexController } from "../controllers/indexController.js";
import authenticate from "../middleware/authenticate.js";

export const indexRouter = Router();

indexRouter.get("/", authenticate.isRegistered, indexController.getHomePage);
indexRouter.get("/logout", indexController.logout);
indexRouter.get("/messages", indexController.getMessagesPage);
indexRouter.get("/new-message", indexController.getNewMessagePage);
indexRouter.post("/new-message", indexController.postNewMessage);
indexRouter.post("/delete", indexController.deleteMessage);
