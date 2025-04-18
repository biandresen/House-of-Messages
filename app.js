import express from "express";
import passport from "passport";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import "dotenv/config";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool.js";
import "./utils/passport-config.js";
import { formRouter } from "./routes/formRouter.js";
import { indexRouter } from "./routes/indexRouter.js";
import { indexController } from "./controllers/indexController.js";
import flash from "connect-flash";

const app = express();

// Set up connect-pg-simple
const PgSession = connectPgSimple(session);

// Middleware
app.set("trust proxy", 1);
app.use(flash());
app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "none",
      secure: process.env.NODE_ENV === "production", // secure should be true in production
    },
  })
);

console.log("NODE_ENV:", process.env.NODE_ENV);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});

app.use(formRouter);
app.use(indexRouter);
app.use(indexController.get404Page);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
