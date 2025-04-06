import { Router } from "express";
import { formController } from "../controllers/formController.js";

export const formRouter = Router();

formRouter.get("/register", formController.getRegisterForm);
formRouter.post("/register", formController.postRegisterForm);
