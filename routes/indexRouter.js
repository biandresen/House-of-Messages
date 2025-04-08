import { Router } from "express";
import { indexController } from "../controllers/indexController.js";
import authenticate from "../middleware/authenticate.js";

export const indexRouter = Router();

indexRouter.get("/", authenticate.isRegistered, indexController.getHomePage);
