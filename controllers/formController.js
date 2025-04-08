import { validationResult, matchedData } from "express-validator";
import { hashPassword } from "../utils/auth.js";
import { UserModel } from "../models/UserModel.js";

// Controller for form handling
export const formController = {
  // Render the registration form
  getRegisterForm: (req, res) => {
    console.log("Rendering registration form...");
    res.render("register", { title: "Register" });
  },

  // Process registration form submission
  postRegisterForm: async (req, res) => {
    console.log("--------------------------------");
    console.log("Processing registration form...");
    const page = "register";

    // Validate registration input
    const validationResult = await validateRegistrationForm(req);
    if (validationResult) {
      return res.status(400).render(page, {
        errors: validationResult.errors || [{ msg: validationResult.error }],
        oldInput: req.body,
      });
    }

    const validatedData = matchedData(req);
    console.log("Registration data validated:", validatedData);

    // Check if email already exists
    const existingUser = await checkForExistingUser(res, validatedData, page);
    if (!existingUser) return console.log("Email already exists");

    // Hash the password
    const hashedPassword = await hashPassword(validatedData.password);

    // Generate a unique username based on the email
    const baseUsername = validatedData.email.split("@")[0];
    const username = await generateUniqueUsername(baseUsername);

    // Create the user
    const userToCreate = {
      ...validatedData,
      username,
      password: hashedPassword,
      is_member: false,
      is_admin: false,
    };

    // Try to create the user in the database
    const userCreated = await createUser(res, userToCreate, page);
    if (!userCreated) return;

    // Redirect to the login page if successful
    res.redirect("/login");
  },

  getLoginForm: (req, res) => {
    console.log("Getting login form...");
    res.render("login", { title: "Login" });
  },
};

// Validate the registration form data
async function validateRegistrationForm(req) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation failed:", errors.array());
      return { errors: errors.array() };
    }
    console.log("Validation passed");
  } catch (err) {
    console.error("Error during validation:", err);
    return { error: "An unexpected error occurred during validation. Please try again later." };
  }
  return null;
}

// Check if the user already exists in the database
async function checkForExistingUser(res, { email }, page) {
  try {
    console.log("Checking if user already exists...");
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).render(page, {
        errors: [{ msg: "Email already in use. Please choose a different email." }],
        code: 400,
      });
    }
    return true;
  } catch (err) {
    console.error("Error while checking for existing user:", err);
    return res.status(500).render(page, {
      errors: [{ msg: "Something went wrong. Please try again later." }],
      code: 500,
    });
  }
}

async function generateUniqueUsername(baseUsername) {
  let username = baseUsername;
  let counter = 1;

  while (await UserModel.findUserByUsername(username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
}

// Create the user in the database
async function createUser(res, userToCreate, page) {
  try {
    console.log("Creating new user...");
    await UserModel.createUser(userToCreate);
    return true;
  } catch (err) {
    console.error("Error during user creation:", err);
    return res.status(500).render(page, {
      errors: [{ msg: "Something went wrong. Please try again later." }],
      code: 500,
    });
  }
}
