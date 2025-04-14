import { Router } from "express";
import { formController } from "../controllers/formController.js";
import { registerUserSchema } from "../validators/registration-validator.js";
import passport from "passport";

export const formRouter = Router();

formRouter.get("/register", formController.getRegisterForm);

formRouter.post("/register", registerUserSchema, formController.postRegisterForm);

formRouter.get("/login", formController.getLoginForm);

formRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

formRouter.get("/join", formController.getJoinForm);
formRouter.post("/join", formController.postJoinForm);
