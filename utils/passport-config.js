import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {});

export default passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      // Perform database query to find user by username
      // If user found, compare password with stored hash
      // If passwords match, call done(null, user)
      // If passwords do not match, call done(null, false)
    }
  )
);
