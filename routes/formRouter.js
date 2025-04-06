import { Router } from "express";
import { formController } from "../controllers/formController.js";
import { registerUserSchema } from "../validators/registration-validator.js";

export const formRouter = Router();

formRouter.get("/register", formController.getRegisterForm);

formRouter.post(
  "/register",
  registerUserSchema,
  formController.postRegisterForm
);

formRouter.get("/login", formController.getLoginForm);
