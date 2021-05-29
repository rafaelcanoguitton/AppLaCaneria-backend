const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redis   = require("redis");
const client  = redis.createClient();
const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: process.env.SESSION_SECRET,resave: false,saveUninitialized: true, store: new redisStore()}));
//routes
app.use(require('./routes/index'));
const port = process.env.PORT || config.httpPort;
app.listen(port, () => {
    console.log("App is running on port: " + port);
});
module.exports = app;