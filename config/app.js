var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
let passport = require("passport");
let cors = require("cors");

var indexRouter = require("../routes/index");

var app = express();

app.use(cors());
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404, "Endpoint not found."));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
