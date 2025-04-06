import express from "express";
import passport from "passport";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import "dotenv/config";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool.js";
import "./utils/passport-config.js";

const app = express();

// Set up connect-pg-simple
const PgSession = connectPgSimple(session);

// Middleware
app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    store: new PgSession({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }, // 10 minutes
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.render("register", { title: "Register" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
