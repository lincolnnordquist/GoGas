const dotenv = require("dotenv").config();

let port = process.env.PORT || 5050;

module.exports = {
    port: port,
    dbusername: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    secret: process.env.SECRET,
}