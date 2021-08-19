const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const app = express();
const https = require("https");
const fs = require("fs");
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 86400000,
    })
  })
);
//routes
app.use(require("./routes/index"));
const port = process.env.PORT || config.httpsPort;
https.createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
    ciphers: "DEFAULT:!SSLv2:!RC4:!EXPORT:!LOW:!MEDIUM:!SHA1",
},app)
.listen(port, () => {
  console.log("App is running on port: " + port);
});
module.exports = app;
