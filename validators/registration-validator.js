// schemas/registerUserSchema.js
import { checkSchema } from "express-validator";

const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

export const registerUserSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: "Email must be between 3 and 32 characters",
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },

  firstName: {
    isLength: {
      options: { min: 2, max: 32 },
      errorMessage: "First name must be between 2 and 32 characters",
    },
    trim: true,
    notEmpty: {
      errorMessage: "First name is required",
    },
    matches: {
      options: [nameRegex],
      errorMessage:
        "First name can only contain letters, single spaces, hyphens or apostrophes, and cannot start or end with them.",
    },
  },

  lastName: {
    isLength: {
      options: { min: 2, max: 32 },
      errorMessage: "Last name must be between 2 and 32 characters",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Last name is required",
    },
    matches: {
      options: [nameRegex],
      errorMessage:
        "Last name can only contain letters, single spaces, hyphens or apostrophes, and cannot start or end with them.",
    },
  },

  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },

  confirmPassword: {
    custom: {
      options: (value, { req }) => value === req.body.password,
      errorMessage: "Passwords do not match",
    },
    notEmpty: {
      errorMessage: "Please confirm your password",
    },
  },
});
