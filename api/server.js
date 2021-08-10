// server configs
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const routes = require("./routes");
const db = require("./config/db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { User } = require("./models");

// Parse correctly the requests/responses
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Sessions
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

//Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "usuario incorrecto" });
          }
          user.genHash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false, { message: "password incorrecto" });
            }
            done(null, user);
          });
        })
        .catch(done);
    }
  )
);

// How we save the user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// How we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => done(null, user));
});

//Routing
app.use("/api", routes);

//DB Sync
db.sync({ force: false }).then(() => {
  console.log("db connected");
  app.listen(3001, () => {
    console.log("listening on http://localhost:3001");
  });
});
