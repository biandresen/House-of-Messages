import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/UserModel.js";
import { comparePassword } from "../utils/auth.js";

// Serialize user (store user ID in session)
passport.serializeUser((user, done) => {
  if (!user) return done(new Error("No user to serialize"));
  done(null, user.id);
});

// Deserialize user (fetch full user from session ID)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findUserById(id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err);
  }
});

// Configure local strategy
export default passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      console.log("Running local strategy...");
      try {
        const user = await UserModel.findUserByEmail(email);
        if (!user) return done(null, false, { message: "Invalid credentials" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return done(null, false, { message: "Invalid credentials" });

        console.log("User authenticated:", user.username);
        return done(null, user);
      } catch (err) {
        console.error("Authentication error:", err);
        return done(err);
      }
    }
  )
);
