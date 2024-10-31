const session = require("express-session");
const config = require("./config");

const setUpSession = function (app) {
  app.use(
    session({
      secret: config.secret,
      resave: false,
      saveUninitialized: false,
    })
  );
};

module.exports = setUpSession;