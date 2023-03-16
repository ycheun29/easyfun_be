const config = require("./config");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

module.exports = function () {
  passport.use(
    "tokencheck",
    new JWTstrategy(
      {
        secretOrKey: config.SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          console.log(token);
          return done(null, token.payload);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        console.log("===> LocalStrategy");
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Unknown user",
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: "Invalid password",
          });
        }
        return done(null, user);
      });
    })
  );
};
